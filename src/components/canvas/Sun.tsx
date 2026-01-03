import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import sunTexture from "../../assets/textures/planets/2k_sun.jpg";

interface SunProps {
  onClick?: () => void;
}

export function Sun({ onClick }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load sun texture
  const texture = useLoader(TextureLoader, sunTexture);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group onClick={onClick}>
      {/* Main sun sphere with texture */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial 
          map={texture} 
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight
        color="#fff5e6"
        intensity={3}
        distance={500}
        decay={0.5}
      />
    </group>
  );
}
