import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { updateTargetPosition } from "../../stores/cameraStore";
import { getMoonTexture } from "../../utils/textures";

interface MoonData {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  texture?: string;
  color?: string;
}

interface MoonProps {
  data: MoonData;
  timeScale?: number;
  showLabel?: boolean;
  isParentFocused?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
  hasInfoPanelOpen?: boolean;
}

// Textured moon mesh component
function TexturedMoonMesh({
  radius,
  texturePath,
  onClick,
}: {
  radius: number;
  texturePath: string;
  onClick: (e: THREE.Event) => void;
}) {
  const texture = useLoader(TextureLoader, texturePath);

  return (
    <mesh onClick={onClick}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// Fallback moon mesh without texture
function FallbackMoonMesh({
  radius,
  color,
  onClick,
}: {
  radius: number;
  color: string;
  onClick: (e: THREE.Event) => void;
}) {
  return (
    <mesh onClick={onClick}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

export function Moon({ 
  data, 
  timeScale = 1, 
  showLabel = false,
  isParentFocused = false,
  isFocused = false,
  onClick,
  hasInfoPanelOpen = false,
}: MoonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);
  const worldPosition = useRef(new THREE.Vector3());
  const [isLabelHovered, setIsLabelHovered] = useState(false);

  // Get texture path for this moon
  const texturePath = useMemo(() => getMoonTexture(data.name), [data.name]);
  const moonColor = data.color || "#c0c0c0";

  // Reset hover state when focus changes (fixes sticky hover after zoom out)
  useEffect(() => {
    setIsLabelHovered(false);
  }, [isFocused]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Moon orbital movement around parent planet
      orbitAngleRef.current += delta * data.orbitSpeed * 0.5 * timeScale;
      
      groupRef.current.position.x = Math.cos(orbitAngleRef.current) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(orbitAngleRef.current) * data.orbitRadius;

      // If this moon is focused, update camera tracking with world position
      if (isFocused) {
        groupRef.current.getWorldPosition(worldPosition.current);
        updateTargetPosition(worldPosition.current);
      }
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <group ref={groupRef}>
      {/* Fill light when focused - intensity based on moon size */}
      {isFocused && (
        <>
          <pointLight
            position={[0, data.radius * 5, data.radius * 4]}
            intensity={Math.min(1.5, data.radius * 5)}
            distance={data.radius * 25}
            color="#ffffff"
          />
          <pointLight
            position={[data.radius * 3, data.radius * 4, -data.radius * 2]}
            intensity={Math.min(1, data.radius * 3)}
            distance={data.radius * 20}
            color="#aaccff"
          />
        </>
      )}

      {/* Moon sphere with texture */}
      <Suspense
        fallback={
          <FallbackMoonMesh
            radius={data.radius}
            color={moonColor}
            onClick={handleClick}
          />
        }
      >
        {texturePath ? (
          <TexturedMoonMesh
            radius={data.radius}
            texturePath={texturePath}
            onClick={handleClick}
          />
        ) : (
          <FallbackMoonMesh
            radius={data.radius}
            color={moonColor}
            onClick={handleClick}
          />
        )}
      </Suspense>

      {/* Moon label - clickable to zoom in */}
      {(showLabel || isParentFocused) && !hasInfoPanelOpen && (
        <Html
          position={[0, data.radius + 0.3, 0]}
          center
        >
          <div
            style={{
              color: isFocused || isLabelHovered ? "#00ffff" : "#aaddff",
              fontSize: isLabelHovered ? "13px" : (isFocused ? "12px" : "10px"),
              fontWeight: isFocused || isLabelHovered ? "bold" : "normal",
              fontFamily: "system-ui, sans-serif",
              textShadow: isLabelHovered 
                ? "0 0 12px rgba(0,255,255,0.5), 0 0 8px rgba(0,0,0,0.9)"
                : "0 0 8px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
              opacity: 0.9,
              cursor: "pointer",
              transition: "all 0.15s ease",
              userSelect: "none",
              padding: "2px 6px",
            }}
            onMouseEnter={() => setIsLabelHovered(true)}
            onMouseLeave={() => setIsLabelHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Re-export MoonData type
export type { MoonData };
