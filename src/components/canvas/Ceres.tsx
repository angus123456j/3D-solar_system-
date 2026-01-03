import { useRef, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { updateTargetPosition } from "../../stores/cameraStore";
import type { DwarfPlanetData } from "../../data/planets";

interface CeresProps {
  data: DwarfPlanetData;
  timeScale?: number;
  showLabels?: boolean;
  showOrbits?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  onClick?: (position: THREE.Vector3) => void;
  hasInfoPanelOpen?: boolean;
}

// Component that loads and renders the Ceres 3D model
function CeresModel({ 
  modelScale,
  onClick,
}: { 
  modelScale: number;
  onClick: (e: THREE.Event) => void;
}) {
  const { scene } = useGLTF("/Ceres_1_1000.glb");
  
  return (
    <primitive 
      object={scene.clone()} 
      scale={modelScale}
      onClick={onClick}
    />
  );
}

// Fallback sphere while model loads
function FallbackSphere({ 
  radius, 
  onClick 
}: { 
  radius: number;
  onClick: (e: THREE.Event) => void;
}) {
  return (
    <mesh onClick={onClick}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color="#8b8680" roughness={0.9} />
    </mesh>
  );
}

export function Ceres({
  data,
  timeScale = 1,
  showLabels = true,
  showOrbits = true,
  isSelected = false,
  isFocused = false,
  onClick,
  hasInfoPanelOpen = false,
}: CeresProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);
  const [isLabelHovered, setIsLabelHovered] = useState(false);

  // Scale for the 3D model (adjust as needed to match other planet sizes)
  const modelScale = data.radius * 0.003; // Adjust multiplier based on model size

  // Reset hover state when focus changes (fixes sticky hover after zoom out)
  useEffect(() => {
    setIsLabelHovered(false);
  }, [isFocused]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Orbital movement
      orbitAngleRef.current += delta * data.orbitSpeed * 0.1 * timeScale;
      
      groupRef.current.position.x = Math.cos(orbitAngleRef.current) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(orbitAngleRef.current) * data.orbitRadius;

      // If focused, continuously update camera tracking position
      if (isFocused) {
        updateTargetPosition(groupRef.current.position);
      }
    }

    // Rotate the model
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * data.rotationSpeed * timeScale;
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
            color="#ffffff"
            transparent
            opacity={isSelected || isFocused ? 0.4 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <group ref={groupRef}>
        {/* Fill light when focused - illuminates the dark side for better texture visibility */}
        {isFocused && (
          <pointLight
            position={[data.radius * 4, data.radius * 3, data.radius * 4]}
            intensity={2}
            distance={data.radius * 20}
            color="#aaccff"
          />
        )}

        {/* Invisible click sphere - always present for reliable clicking */}
        <mesh onClick={handleClick} visible={false}>
          <sphereGeometry args={[data.radius * 1.5, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <group ref={modelRef}>
          <Suspense fallback={<FallbackSphere radius={data.radius} onClick={handleClick} />}>
            <CeresModel modelScale={modelScale} onClick={handleClick} />
          </Suspense>
        </group>

        {/* Label - clickable to zoom in */}
        {showLabels && !isFocused && !hasInfoPanelOpen && (
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

        {/* Focused label - clickable to zoom out */}
        {isFocused && !hasInfoPanelOpen && (
          <Html
            position={[0, data.radius + 2, 0]}
            center
          >
            <div
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "system-ui, sans-serif",
                textShadow: "0 0 15px rgba(0,0,0,0.9)",
                whiteSpace: "nowrap",
                cursor: "pointer",
                padding: "4px 8px",
              }}
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

// Preload the model
useGLTF.preload("/Ceres_1_1000.glb");

