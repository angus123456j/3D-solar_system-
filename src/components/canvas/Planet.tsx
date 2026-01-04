import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import type { PlanetData, DwarfPlanetData } from "../../data/planets";
import { Moon } from "./Moon";
import { Ring } from "./Ring";
import { updateTargetPosition } from "../../stores/cameraStore";
import { getPlanetTexture, getCloudTexture } from "../../utils/textures";

// Moon data interface for info panel
interface MoonInfo {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color?: string;
}

interface PlanetProps {
  data: PlanetData | DwarfPlanetData;
  timeScale?: number;
  showLabels?: boolean;
  showMoonLabels?: boolean;
  showOrbits?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  focusedMoon?: string | null;
  focusedMoonParent?: string | null;
  onClick?: (position: THREE.Vector3) => void;
  onMoonClick?: (moon: MoonInfo, parentName: string) => void;
  hasInfoPanelOpen?: boolean;
  focusedBodyName?: string | null;
}

// Separate component for textured planet mesh
function TexturedPlanetMesh({
  radius,
  texturePath,
  tilt,
  onClick,
  planetRef,
}: {
  radius: number;
  texturePath: string;
  tilt: number;
  onClick: (e: THREE.Event) => void;
  planetRef: React.RefObject<THREE.Mesh>;
}) {
  const texture = useLoader(TextureLoader, texturePath);

  return (
    <mesh
      ref={planetRef}
      onClick={onClick}
      rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

// Fallback mesh without texture
function FallbackPlanetMesh({
  radius,
  color,
  tilt,
  onClick,
  planetRef,
}: {
  radius: number;
  color: string;
  tilt: number;
  onClick: (e: THREE.Event) => void;
  planetRef: React.RefObject<THREE.Mesh>;
}) {
  return (
    <mesh
      ref={planetRef}
      onClick={onClick}
      rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Cloud layer component for planets with clouds (like Earth)
function CloudLayer({
  radius,
  cloudTexturePath,
  tilt,
  rotationSpeed,
  timeScale,
}: {
  radius: number;
  cloudTexturePath: string;
  tilt: number;
  rotationSpeed: number;
  timeScale: number;
}) {
  const cloudRef = useRef<THREE.Mesh>(null);
  const cloudTexture = useLoader(TextureLoader, cloudTexturePath);

  useFrame((_, delta) => {
    if (cloudRef.current) {
      // Clouds rotate slightly faster than the planet for realistic effect
      cloudRef.current.rotation.y += delta * rotationSpeed * 5.2 * timeScale;
    }
  });

  return (
    <mesh
      ref={cloudRef}
      rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}
    >
      <sphereGeometry args={[radius * 1.01, 64, 64]} />
      <meshStandardMaterial
        map={cloudTexture}
        transparent
        opacity={0.6}
        roughness={0.9}
        metalness={0.0}
        alphaTest={0.01}
      />
    </mesh>
  );
}

export function Planet({
  data,
  timeScale = 1,
  showLabels = true,
  showMoonLabels = true,
  showOrbits = true,
  isSelected = false,
  isFocused = false,
  focusedMoon = null,
  focusedMoonParent = null,
  onClick,
  onMoonClick,
  hasInfoPanelOpen = false,
  focusedBodyName = null,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);
  const [isLabelHovered, setIsLabelHovered] = useState(false);

  // Get texture path for this planet
  const texturePath = useMemo(() => getPlanetTexture(data.name), [data.name]);
  
  // Get cloud texture path (for Earth)
  const cloudTexturePath = useMemo(() => getCloudTexture(data.name), [data.name]);

  // Reset hover state when focus changes (fixes sticky hover after zoom out)
  useEffect(() => {
    setIsLabelHovered(false);
  }, [isFocused]);

  // Calculate planet color based on name (fallback when no texture)
  const planetColor = useMemo(() => {
    const colors: Record<string, string> = {
      Mercury: "#b5b5b5",
      Venus: "#e6c88a",
      Earth: "#6b93d6",
      Mars: "#c1440e",
      Jupiter: "#d8ca9d",
      Saturn: "#f4d59e",
      Uranus: "#d1e7e7",
      Neptune: "#5b5ddf",
      Ceres: "#8b8680",
      Pluto: "#e8dcd0",
      Eris: "#f5f5f5",
      Makemake: "#c9a080",
      Haumea: "#a8a8a8",
    };
    return colors[data.name] || "#888888";
  }, [data.name]);

  useFrame((_, delta) => {
    if (groupRef.current && planetRef.current) {
      // Orbital movement (revolution around the sun)
      orbitAngleRef.current += delta * data.orbitSpeed * timeScale;
      
      groupRef.current.position.x = Math.cos(orbitAngleRef.current) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(orbitAngleRef.current) * data.orbitRadius;

      // Planet rotation (spinning on axis)
      planetRef.current.rotation.y += delta * data.rotationSpeed * 5 * timeScale;

      // If focused, continuously update camera tracking position
      if (isFocused) {
        updateTargetPosition(groupRef.current.position);
      }
    }
  });

  const handleClick = (e: THREE.Event) => {
    (e as any).stopPropagation?.();
    if (groupRef.current) {
      onClick?.(groupRef.current.position.clone());
    }
  };

  return (
    <>
      {/* Orbit path */}
      {showOrbits && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.orbitRadius - 0.05, data.orbitRadius + 0.05, 128]} />
          <meshBasicMaterial
            color={isSelected || isFocused ? "#ffffff" : "#ffffff"}
            transparent
            opacity={isSelected || isFocused ? 0.4 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <group ref={groupRef}>
        {/* Planet mesh with texture (or fallback) */}
        <Suspense
          fallback={
            <FallbackPlanetMesh
              radius={data.radius}
              color={planetColor}
              tilt={data.tilt}
              onClick={handleClick}
              planetRef={planetRef as React.RefObject<THREE.Mesh>}
            />
          }
        >
          {texturePath ? (
            <TexturedPlanetMesh
              radius={data.radius}
              texturePath={texturePath}
              tilt={data.tilt}
              onClick={handleClick}
              planetRef={planetRef as React.RefObject<THREE.Mesh>}
            />
          ) : (
            <FallbackPlanetMesh
              radius={data.radius}
              color={planetColor}
              tilt={data.tilt}
              onClick={handleClick}
              planetRef={planetRef as React.RefObject<THREE.Mesh>}
            />
          )}
        </Suspense>

        {/* Cloud layer for Earth */}
        {cloudTexturePath && (
          <Suspense fallback={null}>
            <CloudLayer
              radius={data.radius}
              cloudTexturePath={cloudTexturePath}
              tilt={data.tilt}
              rotationSpeed={data.rotationSpeed}
              timeScale={timeScale}
            />
          </Suspense>
        )}

        {/* Cinematic lighting when focused - soft, atmospheric illumination */}
        {isFocused && (() => {
          // Much dimmer, size-proportional lighting for small dwarf planets
          const isSmallDwarf = data.name === "Pluto" || data.name === "Eris" || data.name === "Haumea" || data.name === "Makemake";
          
          // Calculate intensity based on radius for small dwarf planets
          // For example, Pluto (0.35 radius) would get: 0.35 * 15 = 5.25 intensity
          // This makes it proportional to size and much dimmer
          const topIntensity = isSmallDwarf ? data.radius * 15 : 20;
          const keyIntensity = isSmallDwarf ? data.radius * 3.75 : 5;
          const fillIntensity = isSmallDwarf ? data.radius * 2.25 : 3;
          const rimIntensity = isSmallDwarf ? data.radius * 2.6 : 3.5;
          
          return (
            <>
              {/* Dim spotlight from directly above the planet only */}
              <pointLight
                position={[0, data.radius * 3.5, 0]}
                intensity={topIntensity}
                distance={data.radius * 15}
                color="#ffffff"
              />
              {/* Main key light - angled from front/left for cinematic look */}
              <pointLight
                position={[data.radius * 5, data.radius * 4, data.radius * 6]}
                intensity={keyIntensity}
                distance={data.radius * 30}
                color="#ffffff"
              />
              {/* Fill light - softer, from opposite side */}
              <pointLight
                position={[-data.radius * 4, data.radius * 2, -data.radius * 5]}
                intensity={fillIntensity}
                distance={data.radius * 25}
                color="#b8d4ff"
              />
              {/* Rim light - backlight for depth and separation */}
              <pointLight
                position={[-data.radius * 3, data.radius * 3, -data.radius * 8]}
                intensity={rimIntensity}
                distance={data.radius * 28}
                color="#d4e8ff"
              />
            </>
          );
        })()}

        {/* Planet rings */}
        {data.hasRings && data.ringInnerRadius && data.ringOuterRadius && (
          <Ring
            innerRadius={data.ringInnerRadius}
            outerRadius={data.ringOuterRadius}
            planetName={data.name}
          />
        )}

        {/* Moon orbit paths - show when focused on this planet and orbits enabled */}
        {isFocused && showOrbits && data.moons.map((moon) => (
          <mesh 
            key={`orbit-${moon.name}`}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[moon.orbitRadius - 0.02, moon.orbitRadius + 0.02, 64]} />
            <meshBasicMaterial
              color="#aaddff"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Moons */}
        {data.moons.map((moon) => (
          <Moon
            key={moon.name}
            data={moon}
            timeScale={timeScale}
            showLabel={showMoonLabels}
            isParentFocused={isFocused || (focusedMoon !== null && focusedMoonParent === data.name)}
            isFocused={focusedMoon === moon.name}
            onClick={() => onMoonClick?.(moon, data.name)}
            hasInfoPanelOpen={hasInfoPanelOpen}
            focusedBodyName={focusedBodyName}
            focusedMoonParent={focusedMoonParent}
          />
        ))}

        {/* Label - clickable to zoom in */}
        {/* Show label if: labels enabled AND this planet is NOT focused AND no planet/moon is focused */}
        {/* When a moon is focused, hide regular labels (focused label will show parent planet) */}
        {showLabels && !isFocused && !focusedBodyName && focusedMoonParent === null && (
          <Html
            position={[0, data.radius + 1, 0]}
            center
          >
            <div
              style={{
                color: isLabelHovered ? "#00ffff" : "white",
                fontSize: isLabelHovered ? "15px" : "12px",
                fontWeight: isLabelHovered ? "bold" : "normal",
                fontFamily: "system-ui, sans-serif",
                textShadow: isLabelHovered 
                  ? "0 0 15px rgba(0,255,255,0.5), 0 0 10px rgba(0,0,0,0.8)" 
                  : "0 0 10px rgba(0,0,0,0.8)",
                whiteSpace: "nowrap",
                opacity: 0.9,
                cursor: "pointer",
                transition: "all 0.15s ease",
                userSelect: "none",
                padding: "4px 8px",
              }}
              onMouseEnter={() => setIsLabelHovered(true)}
              onMouseLeave={() => setIsLabelHovered(false)}
              onClick={(e) => {
                (e as any).stopPropagation?.();
                if (groupRef.current) {
                  onClick?.(groupRef.current.position.clone());
                }
              }}
            >
              {data.name}
            </div>
          </Html>
        )}

        {/* Focused label - larger when zoomed in */}
        {/* Also show when a moon of this planet is focused (so parent planet label shows) */}
        {(isFocused || (focusedMoon !== null && focusedMoonParent === data.name)) && (
          <Html
            position={[0, data.radius + 2, 0]}
            center
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
              textShadow: "0 0 15px rgba(0,0,0,0.9)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 1,
            }}
          >
            {data.name}
          </Html>
        )}

        {/* Selection indicator */}
        {isSelected && !isFocused && (
          <mesh>
            <ringGeometry args={[data.radius + 0.5, data.radius + 0.7, 32]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </>
  );
}
