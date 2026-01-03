import { useMemo, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { getRingTexture } from "../../utils/textures";

interface RingProps {
  innerRadius: number;
  outerRadius: number;
  planetName: string;
}

// Textured ring component for Saturn
function TexturedRing({
  innerRadius,
  outerRadius,
  texturePath,
}: {
  innerRadius: number;
  outerRadius: number;
  texturePath: string;
}) {
  const texture = useLoader(TextureLoader, texturePath);
  
  // Create ring geometry with UV mapping
  const geometry = useMemo(() => {
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, 128);
    
    // Remap UVs for the ring texture to display radially
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distance = Math.sqrt(x * x + y * y);
      
      // Map distance from inner to outer radius to 0-1 UV range
      const u = (distance - innerRadius) / (outerRadius - innerRadius);
      const angle = Math.atan2(y, x);
      const v = (angle + Math.PI) / (2 * Math.PI);
      
      uv.setXY(i, u, v);
    }
    
    return geo;
  }, [innerRadius, outerRadius]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
        roughness={0.8}
        alphaTest={0.01}
      />
    </mesh>
  );
}

// Fallback non-textured ring
function FallbackRing({
  innerRadius,
  outerRadius,
  color,
  opacity,
}: {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.8}
      />
    </mesh>
  );
}

export function Ring({ innerRadius, outerRadius, planetName }: RingProps) {
  // Get texture path for this planet's rings
  const texturePath = useMemo(() => getRingTexture(planetName), [planetName]);

  // Ring colors based on planet (fallback)
  const ringColor = useMemo(() => {
    const colors: Record<string, string> = {
      Saturn: "#c9b896",
      Jupiter: "#a08060",
      Uranus: "#a0c0c0",
      Neptune: "#6080a0",
      Haumea: "#808080",
    };
    return colors[planetName] || "#888888";
  }, [planetName]);

  const ringOpacity = useMemo(() => {
    // Saturn has the most visible rings
    if (planetName === "Saturn") return 0.8;
    if (planetName === "Jupiter") return 0.15;
    if (planetName === "Uranus") return 0.3;
    if (planetName === "Neptune") return 0.2;
    return 0.3;
  }, [planetName]);

  // Use textured ring for Saturn, fallback for others
  if (texturePath) {
    return (
      <Suspense
        fallback={
          <FallbackRing
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            color={ringColor}
            opacity={ringOpacity}
          />
        }
      >
        <TexturedRing
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          texturePath={texturePath}
        />
      </Suspense>
    );
  }

  return (
    <FallbackRing
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      color={ringColor}
      opacity={ringOpacity}
    />
  );
}
