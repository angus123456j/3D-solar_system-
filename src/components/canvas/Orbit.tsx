import * as THREE from "three";

interface OrbitProps {
  radius: number;
  color?: string;
  opacity?: number;
}

export function Orbit({ radius, color = "#ffffff", opacity = 0.1 }: OrbitProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}


