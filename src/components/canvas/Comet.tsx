import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CometProps {
  name: string;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  orbitSpeed: number;
  initialAngle?: number;
  timeScale?: number;
}

export function Comet({
  orbitRadiusX,
  orbitRadiusZ,
  orbitSpeed,
  initialAngle = 0,
  timeScale = 1,
}: CometProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Points>(null);
  const orbitAngleRef = useRef(initialAngle);
  
  const tailLength = 150;

  // Create tail geometry with positions and opacity attributes
  const { geometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(tailLength * 3);
    const sizes = new Float32Array(tailLength);
    const opacityArray = new Float32Array(tailLength);
    
    for (let i = 0; i < tailLength; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      // Size decreases along tail
      sizes[i] = Math.max(0.1, 0.8 - (i / tailLength) * 0.7);
      // Opacity decreases along tail
      opacityArray[i] = Math.max(0, 1 - (i / tailLength));
    }
    
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacityArray, 1));
    
    return { geometry: geo };
  }, []);

  // Custom shader for gradient tail
  const tailMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#66ccff") },
      },
      vertexShader: `
        attribute float size;
        attribute float opacity;
        varying float vOpacity;
        
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vOpacity;
        
        void main() {
          // Create circular point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Soft edges
          float alpha = smoothstep(0.5, 0.1, dist) * vOpacity * 0.7;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Store position history for smooth tail
  const positionHistory = useRef<THREE.Vector3[]>([]);

  useFrame((_, delta) => {
    if (!groupRef.current || !tailRef.current) return;

    // Update orbital position (elliptical orbit)
    orbitAngleRef.current += delta * orbitSpeed * 0.1 * timeScale;
    
    const x = Math.cos(orbitAngleRef.current) * orbitRadiusX;
    const z = Math.sin(orbitAngleRef.current) * orbitRadiusZ;
    const y = Math.sin(orbitAngleRef.current * 0.5) * 8;
    
    groupRef.current.position.set(x, y, z);

    // Add current position to history
    const currentPos = new THREE.Vector3(x, y, z);
    positionHistory.current.unshift(currentPos.clone());
    
    // Keep history length limited
    while (positionHistory.current.length > tailLength) {
      positionHistory.current.pop();
    }

    // Update tail positions - tail trails behind the comet
    const positions = tailRef.current.geometry.attributes.position.array as Float32Array;
    
    // Calculate direction away from sun (for tail to point away from sun)
    const sunDir = currentPos.clone().normalize();
    
    for (let i = 0; i < tailLength; i++) {
      if (i < positionHistory.current.length) {
        const historyPos = positionHistory.current[i];
        // Tail streams away from the sun
        const tailOffset = sunDir.clone().multiplyScalar(i * 0.15);
        
        positions[i * 3] = historyPos.x + tailOffset.x;
        positions[i * 3 + 1] = historyPos.y + tailOffset.y * 0.3;
        positions[i * 3 + 2] = historyPos.z + tailOffset.z;
      }
    }
    
    tailRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Tail particles (rendered in world space) */}
      <points ref={tailRef} geometry={geometry} material={tailMaterial} />
      
      {/* Comet head group */}
      <group ref={groupRef}>
        {/* Comet nucleus */}
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Inner coma glow */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color="#88ddff"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Outer coma glow */}
        <mesh>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial
            color="#66ccff"
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </>
  );
}
