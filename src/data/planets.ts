// Moon data interface
export interface MoonData {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  texture?: string;
  color?: string;
}

// Planet data interface
export interface PlanetData {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tilt: number;
  texture?: string;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringTexture?: string;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  moons: MoonData[];
  facts: {
    nickname: string;
    dayLength: string;
    yearLength: string;
    temperature: string;
    moonCount: string;
    funFact: string;
  };
}

// Dwarf planet data interface
export interface DwarfPlanetData {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tilt: number;
  texture?: string;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringTexture?: string;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  moons: MoonData[];
  facts: {
    nickname: string;
    dayLength: string;
    yearLength: string;
    temperature: string;
    moonCount: string;
    funFact: string;
  };
}

// Sun data
export const SUN_DATA = {
  name: "Sun",
  radius: 8,
  color: "#FDB813",
  facts: {
    nickname: "Our Star",
    temperature: "5,500C (surface)",
    composition: "Hydrogen & Helium",
    age: "4.6 billion years",
    funFact: "The Sun contains 99.86% of all mass in our solar system!",
  },
};

// All planets
export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.5,
    orbitRadius: 15,
    orbitSpeed: 4.15,
    rotationSpeed: 0.005,
    tilt: 0.03,
    moons: [],
    facts: {
      nickname: "The Swift Planet",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      temperature: "-180C to 430C",
      moonCount: "0",
      funFact: "Mercury has the most extreme temperature swings in our solar system!",
    },
  },
  {
    name: "Venus",
    radius: 0.9,
    orbitRadius: 20,
    orbitSpeed: 1.62,
    rotationSpeed: -0.002,
    tilt: 177.4,
    hasAtmosphere: true,
    atmosphereColor: "#e6c88a",
    moons: [],
    facts: {
      nickname: "Earth's Twin",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      temperature: "465C",
      moonCount: "0",
      funFact: "Venus spins backwards compared to most planets!",
    },
  },
  {
    name: "Earth",
    radius: 1,
    orbitRadius: 28,
    orbitSpeed: 1,
    rotationSpeed: 0.02,
    tilt: 23.4,
    hasAtmosphere: true,
    atmosphereColor: "#6b93d6",
    moons: [
      {
        name: "Moon",
        radius: 0.27,
        orbitRadius: 2.5,
        orbitSpeed: 1.5,
      },
    ],
    facts: {
      nickname: "The Blue Planet",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      temperature: "15C (average)",
      moonCount: "1",
      funFact: "Earth is the only planet not named after a Greek or Roman deity!",
    },
  },
  {
    name: "Mars",
    radius: 0.7,
    orbitRadius: 38,
    orbitSpeed: 0.53,
    rotationSpeed: 0.018,
    tilt: 25.2,
    moons: [
      { name: "Phobos", radius: 0.08, orbitRadius: 1.5, orbitSpeed: 3, color: "#8b7355" },
      { name: "Deimos", radius: 0.05, orbitRadius: 2.2, orbitSpeed: 1.5, color: "#8b7355" },
    ],
    facts: {
      nickname: "The Red Planet",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      temperature: "-65C",
      moonCount: "2",
      funFact: "Mars has the largest volcano in the solar system - Olympus Mons!",
    },
  },
  {
    name: "Jupiter",
    radius: 3.5,
    orbitRadius: 58,
    orbitSpeed: 0.084,
    rotationSpeed: 0.04,
    tilt: 3.1,
    hasRings: false,
    ringInnerRadius: 4,
    ringOuterRadius: 5,
    moons: [
      { name: "Io", radius: 0.25, orbitRadius: 5, orbitSpeed: 2.5, color: "#c9a227" },
      { name: "Europa", radius: 0.22, orbitRadius: 6.2, orbitSpeed: 1.8, color: "#c9b896" },
      { name: "Ganymede", radius: 0.35, orbitRadius: 7.8, orbitSpeed: 1.2, color: "#8b8378" },
      { name: "Callisto", radius: 0.32, orbitRadius: 9.5, orbitSpeed: 0.8, color: "#4a4a4a" },
    ],
    facts: {
      nickname: "The King of Planets",
      dayLength: "9.9 hours",
      yearLength: "12 Earth years",
      temperature: "-110C",
      moonCount: "95",
      funFact: "Jupiter's Great Red Spot is a storm that has raged for over 400 years!",
    },
  },
  {
    name: "Saturn",
    radius: 3,
    orbitRadius: 80,
    orbitSpeed: 0.034,
    rotationSpeed: 0.038,
    tilt: 26.7,
    hasRings: true,
    ringInnerRadius: 4,
    ringOuterRadius: 7,
    moons: [
      { name: "Titan", radius: 0.35, orbitRadius: 8, orbitSpeed: 1, color: "#c9a227" },
      { name: "Enceladus", radius: 0.1, orbitRadius: 5.5, orbitSpeed: 2, color: "#ffffff" },
      { name: "Mimas", radius: 0.08, orbitRadius: 4.5, orbitSpeed: 2.5, color: "#c0c0c0" },
      { name: "Rhea", radius: 0.15, orbitRadius: 6.8, orbitSpeed: 1.3, color: "#d0d0d0" },
    ],
    facts: {
      nickname: "The Ringed Giant",
      dayLength: "10.7 hours",
      yearLength: "29 Earth years",
      temperature: "-178C",
      moonCount: "146",
      funFact: "Saturn is less dense than water - it would float in a giant bathtub!",
    },
  },
  {
    name: "Uranus",
    radius: 1.8,
    orbitRadius: 105,
    orbitSpeed: 0.012,
    rotationSpeed: -0.03,
    tilt: 97.8,
    hasRings: true,
    ringInnerRadius: 2.5,
    ringOuterRadius: 3.2,
    moons: [
      { name: "Miranda", radius: 0.08, orbitRadius: 3.5, orbitSpeed: 2, color: "#c0c0c0" },
      { name: "Ariel", radius: 0.12, orbitRadius: 4.2, orbitSpeed: 1.5, color: "#d0d0d0" },
      { name: "Umbriel", radius: 0.12, orbitRadius: 5, orbitSpeed: 1.2, color: "#606060" },
      { name: "Titania", radius: 0.15, orbitRadius: 6, orbitSpeed: 0.9, color: "#c0c0c0" },
      { name: "Oberon", radius: 0.14, orbitRadius: 7, orbitSpeed: 0.7, color: "#808080" },
    ],
    facts: {
      nickname: "The Ice Giant",
      dayLength: "17.2 hours",
      yearLength: "84 Earth years",
      temperature: "-224C",
      moonCount: "28",
      funFact: "Uranus rotates on its side - possibly from an ancient collision!",
    },
  },
  {
    name: "Neptune",
    radius: 1.7,
    orbitRadius: 130,
    orbitSpeed: 0.006,
    rotationSpeed: 0.032,
    tilt: 28.3,
    hasRings: true,
    ringInnerRadius: 2.3,
    ringOuterRadius: 2.8,
    moons: [
      { name: "Triton", radius: 0.2, orbitRadius: 4.5, orbitSpeed: -1, color: "#d4c4b0" },
    ],
    facts: {
      nickname: "The Windiest Planet",
      dayLength: "16.1 hours",
      yearLength: "165 Earth years",
      temperature: "-214C",
      moonCount: "16",
      funFact: "Neptune has the strongest winds in the solar system - up to 2,100 km/h!",
    },
  },
];

// Dwarf planets
export const DWARF_PLANETS: DwarfPlanetData[] = [
  {
    name: "Ceres",
    radius: 0.3,
    orbitRadius: 48,
    orbitSpeed: 0.21,
    rotationSpeed: 0.025,
    tilt: 4,
    moons: [],
    facts: {
      nickname: "The Asteroid Queen",
      dayLength: "9 hours",
      yearLength: "4.6 Earth years",
      temperature: "-105C",
      moonCount: "0",
      funFact: "Ceres contains about a third of all mass in the asteroid belt!",
    },
  },
  {
    name: "Pluto",
    radius: 0.35,
    orbitRadius: 150,
    orbitSpeed: 0.004,
    rotationSpeed: 0.008,
    tilt: 122.5,
    moons: [
      { name: "Charon", radius: 0.18, orbitRadius: 1.5, orbitSpeed: 0.5, color: "#808080" },
    ],
    facts: {
      nickname: "The Heart of the Kuiper Belt",
      dayLength: "6.4 Earth days",
      yearLength: "248 Earth years",
      temperature: "-230C",
      moonCount: "5",
      funFact: "Pluto and Charon are tidally locked - they always show the same face to each other!",
    },
  },
  {
    name: "Eris",
    radius: 0.36,
    orbitRadius: 180,
    orbitSpeed: 0.002,
    rotationSpeed: 0.01,
    tilt: 44,
    moons: [
      { name: "Dysnomia", radius: 0.08, orbitRadius: 1.2, orbitSpeed: 0.3, color: "#606060" },
    ],
    facts: {
      nickname: "The Troublemaker",
      dayLength: "25.9 hours",
      yearLength: "558 Earth years",
      temperature: "-243C",
      moonCount: "1",
      funFact: "Eris caused Pluto's demotion - its discovery led to redefining planet!",
    },
  },
  {
    name: "Makemake",
    radius: 0.25,
    orbitRadius: 165,
    orbitSpeed: 0.003,
    rotationSpeed: 0.028,
    tilt: 29,
    moons: [],
    facts: {
      nickname: "The Easter Bunny",
      dayLength: "22.5 hours",
      yearLength: "305 Earth years",
      temperature: "-243C",
      moonCount: "1 (tiny)",
      funFact: "Makemake was discovered just after Easter 2005, earning its nickname!",
    },
  },
  {
    name: "Haumea",
    radius: 0.22,
    orbitRadius: 155,
    orbitSpeed: 0.0035,
    rotationSpeed: 0.1,
    tilt: 126,
    hasRings: true,
    ringInnerRadius: 0.8,
    ringOuterRadius: 1.2,
    moons: [],
    facts: {
      nickname: "The Cosmic Egg",
      dayLength: "3.9 hours",
      yearLength: "284 Earth years",
      temperature: "-241C",
      moonCount: "2",
      funFact: "Haumea spins so fast it's stretched into an egg shape!",
    },
  },
];


