import { useState } from "react";
import "./Controls.css";

interface ControlsProps {
  timeScale: number;
  onTimeScaleChange: (scale: number) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
  showMoonLabels: boolean;
  onShowMoonLabelsChange: (show: boolean) => void;
  showOrbits: boolean;
  onShowOrbitsChange: (show: boolean) => void;
}

export function Controls({
  timeScale,
  onTimeScaleChange,
  showLabels,
  onShowLabelsChange,
  showMoonLabels,
  onShowMoonLabelsChange,
  showOrbits,
  onShowOrbitsChange,
}: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const timeScaleOptions = [
    { label: "0.1x", value: 0.1 },
    { label: "0.5x", value: 0.5 },
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "5x", value: 5 },
    { label: "10x", value: 10 },
  ];

  return (
    <div className={`controls ${isExpanded ? "expanded" : "collapsed"}`}>
      <button
        className="controls-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "◀" : "▶"} {isExpanded ? "Minimise Controls" : "Maximise Controls"}
      </button>

      {isExpanded && (
        <div className="controls-content">
          {/* Time Speed */}
          <div className="control-group">
            <label className="control-label">Time Speed</label>
            <div className="time-buttons">
              {timeScaleOptions.map((option) => (
                <button
                  key={option.value}
                  className={`time-button ${timeScale === option.value ? "active" : ""}`}
                  onClick={() => onTimeScaleChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="control-group">
            <label className="control-label">Display</label>
            <div className="toggle-options">
              <button
                className={`toggle-button ${showLabels ? "active" : ""}`}
                onClick={() => onShowLabelsChange(!showLabels)}
              >
                Labels {showLabels ? "ON" : "OFF"}
              </button>
              <button
                className={`toggle-button ${showOrbits ? "active" : ""}`}
                onClick={() => onShowOrbitsChange(!showOrbits)}
              >
                Orbits {showOrbits ? "ON" : "OFF"}
              </button>
            </div>
            <button
              className={`toggle-button moon-toggle ${showMoonLabels ? "active" : ""}`}
              onClick={() => onShowMoonLabelsChange(!showMoonLabels)}
            >
              Moon Labels {showMoonLabels ? "ON" : "OFF"}
            </button>
          </div>

          {/* Instructions */}
          <div className="control-group instructions">
            <label className="control-label">Controls</label>
            <ul className="instructions-list">
              <li>Left click + drag to rotate</li>
              <li>Right click + drag to pan</li>
              <li>Scroll to zoom</li>
              <li>Click planet/moon to zoom in</li>
              <li>Click planet/moon for info</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
