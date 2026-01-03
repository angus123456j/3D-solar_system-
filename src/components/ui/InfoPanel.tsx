import { SUN_DATA } from "../../data/planets";
import type { PlanetData, DwarfPlanetData } from "../../data/planets";
import "./InfoPanel.css";

type BodyData = PlanetData | DwarfPlanetData | typeof SUN_DATA;

interface InfoPanelProps {
  body: BodyData | null;
  onClose: () => void;
}

function isSun(body: BodyData): body is typeof SUN_DATA {
  return body.name === "Sun";
}

export function InfoPanel({ body, onClose }: InfoPanelProps) {
  if (!body) return null;

  const facts = body.facts;

  return (
    <div className="info-panel">
      <button className="info-panel-close" onClick={onClose}>
        ×
      </button>

      <div className="info-panel-header">
        <h2 className="info-panel-title">{body.name}</h2>
        <p className="info-panel-nickname">
          {isSun(body) ? facts.nickname : (facts as PlanetData["facts"]).nickname}
        </p>
      </div>

      <div className="info-panel-content">
        {isSun(body) ? (
          // Sun facts
          <>
            <div className="info-item">
              <span className="info-label">Temperature</span>
              <span className="info-value">{facts.temperature}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Composition</span>
              <span className="info-value">{(facts as typeof SUN_DATA.facts).composition}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{(facts as typeof SUN_DATA.facts).age}</span>
            </div>
          </>
        ) : (
          // Planet/Dwarf Planet facts
          <>
            <div className="info-item">
              <span className="info-label">Day Length</span>
              <span className="info-value">
                {(facts as PlanetData["facts"]).dayLength}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Year Length</span>
              <span className="info-value">
                {(facts as PlanetData["facts"]).yearLength}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Temperature</span>
              <span className="info-value">
                {(facts as PlanetData["facts"]).temperature}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Moons</span>
              <span className="info-value">
                {(facts as PlanetData["facts"]).moonCount}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="info-panel-funfact">
        <p className="funfact-text">{facts.funFact}</p>
      </div>
    </div>
  );
}

