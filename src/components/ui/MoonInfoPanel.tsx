import "./MoonInfoPanel.css";

interface MoonInfo {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color?: string;
}

interface MoonInfoPanelProps {
  moon: MoonInfo | null;
  parentName: string;
  onClose: () => void;
}

// Moon facts database
const MOON_FACTS: Record<string, { nickname: string; funFact: string }> = {
  // Earth's Moon
  Moon: {
    nickname: "Luna",
    funFact: "The Moon is slowly drifting away from Earth at about 3.8 cm per year!",
  },
  // Mars moons
  Phobos: {
    nickname: "The Doomed Moon",
    funFact: "Phobos orbits so close to Mars it will crash into the planet in 50 million years!",
  },
  Deimos: {
    nickname: "The Tiny Terror",
    funFact: "Deimos is so small you could walk around it in a few hours!",
  },
  // Jupiter moons
  Io: {
    nickname: "The Volcanic World",
    funFact: "Io has over 400 active volcanoes, making it the most volcanic body in the solar system!",
  },
  Europa: {
    nickname: "The Ocean Moon",
    funFact: "Europa may have more liquid water under its ice than all of Earth's oceans combined!",
  },
  Ganymede: {
    nickname: "The Giant Moon",
    funFact: "Ganymede is larger than Mercury and is the biggest moon in our solar system!",
  },
  Callisto: {
    nickname: "The Cratered One",
    funFact: "Callisto has the oldest and most cratered surface of any object in the solar system!",
  },
  // Saturn moons
  Titan: {
    nickname: "The Hazy Moon",
    funFact: "Titan has lakes and rivers of liquid methane, and a thick atmosphere like Earth!",
  },
  Enceladus: {
    nickname: "The Ice Geyser",
    funFact: "Enceladus shoots geysers of water ice into space from its south pole!",
  },
  Mimas: {
    nickname: "The Death Star Moon",
    funFact: "Mimas looks like the Death Star due to its massive Herschel crater!",
  },
  Rhea: {
    nickname: "The Icy Giant",
    funFact: "Rhea may have its own faint ring system - extremely rare for a moon!",
  },
  // Uranus moons
  Miranda: {
    nickname: "The Frankenstein Moon",
    funFact: "Miranda has the tallest cliff in the solar system - 20km high!",
  },
  Ariel: {
    nickname: "The Brightest",
    funFact: "Ariel is the brightest of Uranus's moons with a young, resurfaced terrain!",
  },
  Umbriel: {
    nickname: "The Dark One",
    funFact: "Umbriel is the darkest of Uranus's major moons, covered in ancient craters!",
  },
  Titania: {
    nickname: "The Queen",
    funFact: "Titania has huge canyons that stretch across its surface!",
  },
  Oberon: {
    nickname: "The Outermost",
    funFact: "Oberon has a mysterious dark material on the floors of its craters!",
  },
  // Neptune moons
  Triton: {
    nickname: "The Captured World",
    funFact: "Triton orbits backwards - it was likely captured from the Kuiper Belt!",
  },
  // Pluto moons
  Charon: {
    nickname: "The Dance Partner",
    funFact: "Charon is so large relative to Pluto they orbit around a point between them!",
  },
  // Eris moon
  Dysnomia: {
    nickname: "The Lawless One",
    funFact: "Named after the demon of lawlessness, daughter of Eris in Greek mythology!",
  },
};

export function MoonInfoPanel({ moon, parentName, onClose }: MoonInfoPanelProps) {
  if (!moon) return null;

  const facts = MOON_FACTS[moon.name] || {
    nickname: "Mysterious Moon",
    funFact: "This moon is still being studied by scientists!",
  };

  return (
    <div className="moon-info-panel">
      <button className="moon-info-close" onClick={onClose}>
        ×
      </button>

      <div className="moon-info-header">
        <span className="moon-parent">Moon of {parentName}</span>
        <h2 className="moon-info-title">{moon.name}</h2>
        <p className="moon-info-nickname">"{facts.nickname}"</p>
      </div>

      <div className="moon-info-content">
        <div className="moon-info-item">
          <span className="moon-info-label">Size (vs Earth)</span>
          <span className="moon-info-value">{(moon.radius * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="moon-info-funfact">
        <p className="funfact-text">{facts.funFact}</p>
      </div>
    </div>
  );
}


