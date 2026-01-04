import { useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { Ceres } from "./Ceres";
import { Haumea } from "./Haumea";
import { Starfield } from "./Starfield";
import { AsteroidBelt } from "./AsteroidBelt";
import { CameraController } from "./CameraController";
import { PLANETS, DWARF_PLANETS, SUN_DATA } from "../../data/planets";
import type { PlanetData, DwarfPlanetData } from "../../data/planets";
import { setTrackingTarget, clearTracking } from "../../stores/cameraStore";

interface MoonInfo {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color?: string;
}

interface SolarSystemProps {
  timeScale?: number;
  showLabels?: boolean;
  showMoonLabels?: boolean;
  showOrbits?: boolean;
  onSelectBody?: (body: PlanetData | DwarfPlanetData | typeof SUN_DATA | null) => void;
  onSelectMoon?: (moon: MoonInfo, parentName: string) => void;
  hasInfoPanelOpen?: boolean;
}

export function SolarSystem({
  timeScale = 1,
  showLabels = true,
  showMoonLabels = true,
  showOrbits = true,
  onSelectBody,
  onSelectMoon,
  hasInfoPanelOpen = false,
}: SolarSystemProps) {
  const [focusedBody, setFocusedBody] = useState<string | null>(null);
  const [focusedMoon, setFocusedMoon] = useState<string | null>(null);
  const [focusedMoonParent, setFocusedMoonParent] = useState<string | null>(null);

  // Reset focus state when parent clears selection via zoom out button
  // When hasInfoPanelOpen becomes false but we still have a focused body, reset it
  useEffect(() => {
    if (!hasInfoPanelOpen && (focusedBody !== null || focusedMoon !== null)) {
      setFocusedBody(null);
      setFocusedMoon(null);
      setFocusedMoonParent(null);
      clearTracking();
    }
  }, [hasInfoPanelOpen]);

  const handlePlanetClick = useCallback(
    (body: PlanetData | DwarfPlanetData, position: THREE.Vector3) => {
      // If clicking on a planet while a moon is focused, unfocus the moon
      if (focusedMoon) {
        setFocusedMoon(null);
        setFocusedMoonParent(null);
      }

      if (focusedBody === body.name) {
        // Click again to unfocus and zoom out
        setFocusedBody(null);
        clearTracking();
        onSelectBody?.(null);
      } else {
        // First click - zoom in and start tracking
        setFocusedBody(body.name);
        setTrackingTarget(position, body.radius);
        onSelectBody?.(body);
      }
    },
    [focusedBody, focusedMoon, onSelectBody]
  );

  const handleSunClick = useCallback(() => {
    // Clear any moon focus
    if (focusedMoon) {
      setFocusedMoon(null);
      setFocusedMoonParent(null);
    }

    if (focusedBody === "Sun") {
      setFocusedBody(null);
      clearTracking();
      onSelectBody?.(null);
    } else {
      setFocusedBody("Sun");
      setTrackingTarget(new THREE.Vector3(0, 0, 0), 8);
      onSelectBody?.(SUN_DATA);
    }
  }, [focusedBody, focusedMoon, onSelectBody]);

  const handleMoonClick = useCallback((moon: MoonInfo, parentName: string) => {
    if (focusedMoon === moon.name) {
      // Click again to unfocus moon, go back to planet view
      setFocusedMoon(null);
      setFocusedMoonParent(null);
      // Find the parent planet and re-focus on it
      const parentPlanet = [...PLANETS, ...DWARF_PLANETS].find(p => p.name === parentName);
      if (parentPlanet) {
        setTrackingTarget(new THREE.Vector3(0, 0, parentPlanet.orbitRadius), parentPlanet.radius);
      }
    } else {
      // Focus on the moon
      setFocusedMoon(moon.name);
      setFocusedMoonParent(parentName);
      setFocusedBody(null); // Unfocus planet
      // Set a small radius for closer zoom on moon
      setTrackingTarget(new THREE.Vector3(0, 0, 0), moon.radius);
      onSelectMoon?.(moon, parentName);
    }
  }, [focusedMoon, onSelectMoon]);

  return (
    <group>
      {/* Camera Controller for tracking */}
      <CameraController />

      {/* Starfield background */}
      <Starfield count={8000} radius={600} />

      {/* The Sun */}
      <Sun onClick={handleSunClick} />

      {/* Main planets */}
      {PLANETS.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          timeScale={timeScale}
          showLabels={showLabels}
          showMoonLabels={showMoonLabels}
          showOrbits={showOrbits}
          isSelected={focusedBody === planet.name}
          isFocused={focusedBody === planet.name}
          focusedMoon={focusedMoonParent === planet.name ? focusedMoon : null}
          focusedMoonParent={focusedMoonParent}
          onClick={(pos) => handlePlanetClick(planet, pos)}
          onMoonClick={handleMoonClick}
          hasInfoPanelOpen={hasInfoPanelOpen}
          focusedBodyName={focusedBody}
        />
      ))}

      {/* Asteroid belt (between Mars and Jupiter) */}
      <AsteroidBelt
        innerRadius={44}
        outerRadius={56}
        count={5000}
        timeScale={timeScale}
        showLabel={showLabels}
      />

      {/* Ceres - rendered with 3D model */}
      {DWARF_PLANETS.filter(p => p.name === "Ceres").map((ceres) => (
        <Ceres
          key={ceres.name}
          data={ceres}
          timeScale={timeScale}
          showLabels={showLabels}
          showOrbits={showOrbits}
          isSelected={focusedBody === ceres.name}
          isFocused={focusedBody === ceres.name}
          onClick={(pos) => handlePlanetClick(ceres, pos)}
          hasInfoPanelOpen={hasInfoPanelOpen}
        />
      ))}

      {/* Haumea - rendered with 3D model */}
      {DWARF_PLANETS.filter(p => p.name === "Haumea").map((haumea) => (
        <Haumea
          key={haumea.name}
          data={haumea}
          timeScale={timeScale}
          showLabels={showLabels}
          showOrbits={showOrbits}
          isSelected={focusedBody === haumea.name}
          isFocused={focusedBody === haumea.name}
          onClick={(pos) => handlePlanetClick(haumea, pos)}
          hasInfoPanelOpen={hasInfoPanelOpen}
        />
      ))}

      {/* Other dwarf planets (not Ceres or Haumea) */}
      {DWARF_PLANETS.filter(p => p.name !== "Ceres" && p.name !== "Haumea").map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          timeScale={timeScale}
          showLabels={showLabels}
          showMoonLabels={showMoonLabels}
          showOrbits={showOrbits}
          isSelected={focusedBody === planet.name}
          isFocused={focusedBody === planet.name}
          focusedMoon={focusedMoonParent === planet.name ? focusedMoon : null}
          focusedMoonParent={focusedMoonParent}
          onClick={(pos) => handlePlanetClick(planet, pos)}
          onMoonClick={handleMoonClick}
          hasInfoPanelOpen={hasInfoPanelOpen}
          focusedBodyName={focusedBody}
        />
      ))}
    </group>
  );
}
