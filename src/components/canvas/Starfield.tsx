import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import milkyWayTexture from "../../assets/textures/misc/2k_stars_milky_way.jpg";

interface StarfieldProps {
  count?: number;
  radius?: number;
}

export function Starfield({ count = 5000, radius = 500 }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Load milky way texture for the backdrop sphere
  const texture = useLoader(TextureLoader, milkyWayTexture);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute stars on a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.8 + Math.random() * 0.2);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Vary star colors slightly (white to blue to yellow)
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // White stars (most common)
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        // Blue stars
        colors[i * 3] = 0.6 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.95) {
        // Yellow stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      } else {
        // Red giant stars (rare)
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.1;
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geo;
  }, [count, radius]);

  // Very slow rotation for parallax effect
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.002;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.001;
    }
  });

  return (
    <group>
      {/* Milky Way backdrop sphere */}
      <mesh ref={sphereRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[radius * 1.2, 64, 64]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.BackSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Additional point stars for depth */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={1.2}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={0.7}
        />
      </points>
    </group>
  );
}
