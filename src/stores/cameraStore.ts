import * as THREE from "three";

// Simple store for camera tracking
// This allows the Planet to update position and CameraController to read it
// without triggering React re-renders every frame

interface CameraStore {
  targetPosition: THREE.Vector3 | null;
  targetRadius: number;
  isTracking: boolean;
}

export const cameraStore: CameraStore = {
  targetPosition: null,
  targetRadius: 1,
  isTracking: false,
};

export function setTrackingTarget(position: THREE.Vector3 | null, radius: number = 1) {
  if (position) {
    if (!cameraStore.targetPosition) {
      cameraStore.targetPosition = position.clone();
    } else {
      cameraStore.targetPosition.copy(position);
    }
    cameraStore.targetRadius = radius;
    cameraStore.isTracking = true;
  } else {
    cameraStore.targetPosition = null;
    cameraStore.isTracking = false;
  }
}

export function updateTargetPosition(position: THREE.Vector3) {
  if (cameraStore.targetPosition) {
    cameraStore.targetPosition.copy(position);
  } else {
    cameraStore.targetPosition = position.clone();
  }
}

export function clearTracking() {
  cameraStore.targetPosition = null;
  cameraStore.isTracking = false;
}

export function resetCamera() {
  clearTracking();
  // Reset to default radius
  cameraStore.targetRadius = 1;
}


