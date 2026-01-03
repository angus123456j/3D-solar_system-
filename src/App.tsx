import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { SolarSystem } from "./components/canvas/SolarSystem";
import { InfoPanel } from "./components/ui/InfoPanel";
import { MoonInfoPanel } from "./components/ui/MoonInfoPanel";
import { Controls } from "./components/ui/Controls";
import { SUN_DATA } from "./data/planets";
import type { PlanetData, DwarfPlanetData } from "./data/planets";
import { resetCamera } from "./stores/cameraStore";
import "./App.css";

type BodyData = PlanetData | DwarfPlanetData | typeof SUN_DATA;

interface MoonInfo {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color?: string;
}

function Scene({
  timeScale,
  showLabels,
  showMoonLabels,
  showOrbits,
  onSelectBody,
  onSelectMoon,
  hasInfoPanelOpen,
}: {
  timeScale: number;
  showLabels: boolean;
  showMoonLabels: boolean;
  showOrbits: boolean;
  onSelectBody: (body: BodyData | null) => void;
  onSelectMoon: (moon: MoonInfo, parentName: string) => void;
  hasInfoPanelOpen: boolean;
}) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 80, 150]}
        fov={60}
        near={0.1}
        far={2000}
      />

      {/* Ambient light for visibility */}
      <ambientLight intensity={0.08} />

      {/* Solar System */}
      <SolarSystem
        timeScale={timeScale}
        showLabels={showLabels}
        showMoonLabels={showMoonLabels}
        showOrbits={showOrbits}
        onSelectBody={onSelectBody}
        onSelectMoon={onSelectMoon}
        hasInfoPanelOpen={hasInfoPanelOpen}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>

      {/* Orbit Controls for mouse interaction */}
      <OrbitControls
        minDistance={2}
        maxDistance={500}
        autoRotate={false}
        zoomSpeed={1.2}
        panSpeed={1}
        rotateSpeed={0.5}
        screenSpacePanning={true}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
      />
    </>
  );
}

function App() {
  const [timeScale, setTimeScale] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showMoonLabels, setShowMoonLabels] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [selectedBody, setSelectedBody] = useState<BodyData | null>(null);
  const [selectedMoon, setSelectedMoon] = useState<{ moon: MoonInfo; parentName: string } | null>(null);

  const handleBodySelect = useCallback((body: BodyData | null) => {
    setSelectedBody(body);
    setSelectedMoon(null); // Clear moon selection when selecting a planet
  }, []);

  const handleMoonSelect = useCallback((moon: MoonInfo, parentName: string) => {
    setSelectedMoon({ moon, parentName });
  }, []);

  const handleZoomOut = useCallback(() => {
    resetCamera();
    setSelectedBody(null);
    setSelectedMoon(null);
  }, []);

  return (
    <div className="app">
      {/* Three.js Canvas */}
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: "#000005" }}
      >
        <Suspense fallback={null}>
          <Scene
            timeScale={timeScale}
            showLabels={showLabels}
            showMoonLabels={showMoonLabels}
            showOrbits={showOrbits}
            onSelectBody={handleBodySelect}
            onSelectMoon={handleMoonSelect}
            hasInfoPanelOpen={selectedBody !== null || selectedMoon !== null}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <Controls
        timeScale={timeScale}
        onTimeScaleChange={setTimeScale}
        showLabels={showLabels}
        onShowLabelsChange={setShowLabels}
        showMoonLabels={showMoonLabels}
        onShowMoonLabelsChange={setShowMoonLabels}
        showOrbits={showOrbits}
        onShowOrbitsChange={setShowOrbits}
      />

      {/* Planet Info Panel */}
      <InfoPanel body={selectedBody} onClose={() => setSelectedBody(null)} />

      {/* Moon Info Panel */}
      <MoonInfoPanel
        moon={selectedMoon?.moon || null}
        parentName={selectedMoon?.parentName || ""}
        onClose={() => setSelectedMoon(null)}
      />

      {/* Title */}
      <header className="app-header">
        <h1>Interactive Solar System</h1>
        <p>Click any planet to zoom in • Click again to zoom out</p>
      </header>

      {/* Zoom Out Button */}
      <button className="zoom-out-button" onClick={handleZoomOut} title="Zoom out to initial view">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Zoom Out
      </button>
    </div>
  );
}

export default App;
