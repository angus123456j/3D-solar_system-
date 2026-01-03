import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface AsteroidBeltProps {
  innerRadius?: number;
  outerRadius?: number;
  count?: number;
  timeScale?: number;
  showLabel?: boolean;
}

export function AsteroidBelt({
  innerRadius = 45,
  outerRadius = 55,
  count = 4000,
  timeScale = 1,
  showLabel = true,
}: AsteroidBeltProps) {
  const middleRadius = (innerRadius + outerRadius) / 2;
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store orbital data for each asteroid
  const asteroidData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Random orbital radius within belt
      const orbitRadius = innerRadius + Math.random() * (outerRadius - innerRadius);
      
      // Random starting angle
      const angle = Math.random() * Math.PI * 2;
      
      // Slight vertical variation - more concentrated in the middle
      const yOffset = (Math.random() - 0.5) * 2 * (Math.random() < 0.8 ? 1 : 3);
      
      // Random size - mix of tiny and some larger rocks
      const sizeRandom = Math.random();
      let scale;
      if (sizeRandom < 0.7) {
        // Most asteroids are small
        scale = 0.05 + Math.random() * 0.1;
      } else if (sizeRandom < 0.95) {
        // Some medium sized
        scale = 0.12 + Math.random() * 0.15;
      } else {
        // Few larger ones
        scale = 0.2 + Math.random() * 0.2;
      }
      
      // Orbital speed (inner asteroids move faster)
      const orbitSpeed = 0.015 + (1 - (orbitRadius - innerRadius) / (outerRadius - innerRadius)) * 0.025;
      
      // Random rotation speeds
      const rotationSpeedX = (Math.random() - 0.5) * 2;
      const rotationSpeedY = (Math.random() - 0.5) * 2;
      const rotationSpeedZ = (Math.random() - 0.5) * 2;
      
      data.push({ 
        orbitRadius, 
        angle, 
        yOffset, 
        scale, 
        orbitSpeed,
        rotationSpeedX,
        rotationSpeedY,
        rotationSpeedZ,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    if (!instancedMeshRef.current) return;

    for (let i = 0; i < count; i++) {
      const asteroid = asteroidData[i];
      
      // Update angle
      asteroid.angle += delta * asteroid.orbitSpeed * timeScale;
      
      // Update rotation
      asteroid.rotationX += delta * asteroid.rotationSpeedX * timeScale;
      asteroid.rotationY += delta * asteroid.rotationSpeedY * timeScale;
      asteroid.rotationZ += delta * asteroid.rotationSpeedZ * timeScale;
      
      // Calculate position
      dummy.position.set(
        Math.cos(asteroid.angle) * asteroid.orbitRadius,
        asteroid.yOffset,
        Math.sin(asteroid.angle) * asteroid.orbitRadius
      );
      
      // Apply rotation
      dummy.rotation.set(
        asteroid.rotationX,
        asteroid.rotationY,
        asteroid.rotationZ
      );
      
      dummy.scale.setScalar(asteroid.scale);
      dummy.updateMatrix();
      
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, count]}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a0a0a0"
          roughness={0.85}
          metalness={0.15}
          emissive="#404040"
          emissiveIntensity={0.1}
        />
      </instancedMesh>

      {/* Label */}
      {showLabel && (
        <Html
          position={[middleRadius, 2, 0]}
          center
          style={{
            color: "#888888",
            fontSize: "11px",
            fontFamily: "system-ui, sans-serif",
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          Asteroid Belt
        </Html>
      )}
    </group>
  );
}
