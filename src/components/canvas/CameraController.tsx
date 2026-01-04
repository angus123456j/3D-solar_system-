import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cameraStore } from "../../stores/cameraStore";

export function CameraController() {
  const { camera } = useThree();
  const smoothedPosition = useRef(new THREE.Vector3(0, 100, 220));
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const defaultPosition = new THREE.Vector3(0, 100, 220);
  const wasTracking = useRef(false);

  useFrame(() => {
    const { targetPosition, targetRadius, isTracking } = cameraStore;

    if (isTracking && targetPosition) {
      wasTracking.current = true;
      
      // Calculate camera distance based on planet size
      // Larger planets (Jupiter, Saturn) get closer camera
      // Smaller planets/moons get more distance relative to size
      let distanceMultiplier: number;
      if (targetRadius > 2.5) {
        // Large gas giants (Jupiter, Saturn) - zoom in closer
        distanceMultiplier = 5;
      } else if (targetRadius > 1.5) {
        // Medium planets (Uranus, Neptune)
        distanceMultiplier = 7;
      } else if (targetRadius > 0.5) {
        // Earth-sized planets
        distanceMultiplier = 10;
      } else if (targetRadius > 0.2) {
        // Larger moons (Ganymede, Titan, etc.)
        distanceMultiplier = 6;
      } else {
        // Small moons - get very close
        distanceMultiplier = 8;
      }
      
      const distance = Math.max(targetRadius * distanceMultiplier, 3);
      
      // Get direction from sun to planet
      const dirFromSun = targetPosition.clone().normalize();
      
      // Position camera on the opposite side of the planet from the sun
      const cameraOffset = new THREE.Vector3(
        dirFromSun.x * distance,
        distance * 0.35,
        dirFromSun.z * distance
      );
      
      const targetCameraPos = targetPosition.clone().add(cameraOffset);
      
      // Smoothly follow the planet - slow cinematic zoom
      smoothedPosition.current.lerp(targetCameraPos, 0.015);
      smoothedLookAt.current.lerp(targetPosition, 0.02);
      
      camera.position.copy(smoothedPosition.current);
      camera.lookAt(smoothedLookAt.current);
      
    } else if (wasTracking.current) {
      // Was tracking, now returning to default view - slow cinematic pullback
      smoothedPosition.current.lerp(defaultPosition, 0.012);
      smoothedLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.015);
      
      camera.position.copy(smoothedPosition.current);
      camera.lookAt(smoothedLookAt.current);
      
      // Check if we've returned to default
      if (camera.position.distanceTo(defaultPosition) < 1) {
        wasTracking.current = false;
      }
    }
  });

  return null;
}
