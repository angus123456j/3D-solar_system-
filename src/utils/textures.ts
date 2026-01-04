// Planet textures
import mercuryTexture from "../assets/textures/planets/2k_mercury.jpg";
import venusTexture from "../assets/textures/planets/2k_venus.jpg";
import earthTexture from "../assets/textures/planets/2k_earth.jpg";
import earthCloudsTexture from "../assets/textures/planets/2k_earth_clouds.jpg";
import marsTexture from "../assets/textures/planets/2k_mars.jpg";
import jupiterTexture from "../assets/textures/planets/2k_jupiter.jpg";
import saturnTexture from "../assets/textures/planets/2k_saturn.jpg";
import uranusTexture from "../assets/textures/planets/2k_uranus.jpg";
import neptuneTexture from "../assets/textures/planets/2k_neptune.jpg";
import plutoTexture from "../assets/textures/planets/Pluto.jpg";

// Dwarf planet textures
import erisTexture from "../assets/textures/misc/2k_eris.jpg";
import haumeaTexture from "../assets/textures/misc/2k_haumea.jpg";
import makemakeTexture from "../assets/textures/misc/2k_makemake.jpg";

// Moon textures
import moonTexture from "../assets/textures/moons/2k_moon.jpg";
import ioTexture from "../assets/textures/moons/Jupiter - Io (A).jpg";
import europaTexture from "../assets/textures/moons/Jupiter - Europa.jpg";
import ganymedeTexture from "../assets/textures/moons/Jupiter - Ganymede.jpg";
import callistoTexture from "../assets/textures/moons/Jupiter-callisto.webp";
import phobosTexture from "../assets/textures/moons/Mars - Phobos.jpg";
import deimosTexture from "../assets/textures/moons/Mars - Deimos.jpg";
import titanTexture from "../assets/textures/moons/Saturn - Titan.jpg";
import enceladusTexture from "../assets/textures/moons/Saturn - Enceladus.jpg";
import mimasTexture from "../assets/textures/moons/Saturn - Mimas.jpg";
import rheaTexture from "../assets/textures/moons/Saturn - Rhea.jpg";
import tritonTexture from "../assets/textures/moons/Neptune - Triton.jpg";
import charonTexture from "../assets/textures/moons/Pluto - Charon.jpg";
import mirandaTexture from "../assets/textures/moons/Uranus - Miranda.jpg";
import arielTexture from "../assets/textures/moons/Uranus - Ariel.jpg";
import titaniaTexture from "../assets/textures/moons/Uranus - Titania.jpg";
import umbrielTexture from "../assets/textures/moons/Uranus - Umbriel.jpg";
import oberonTexture from "../assets/textures/moons/Uranus - oberon.jpg";
import dysnomiaTexture from "../assets/textures/misc/Dysnomia.webp";

// Ring textures
import saturnRingTexture from "../assets/textures/rings/2k_saturn_ring_alpha.png";

// Planet texture mapping
export const PLANET_TEXTURES: Record<string, string> = {
  Mercury: mercuryTexture,
  Venus: venusTexture,
  Earth: earthTexture,
  Mars: marsTexture,
  Jupiter: jupiterTexture,
  Saturn: saturnTexture,
  Uranus: uranusTexture,
  Neptune: neptuneTexture,
  Pluto: plutoTexture,
  Eris: erisTexture,
  Haumea: haumeaTexture,
  Makemake: makemakeTexture,
  // Ceres uses a 3D model, not a texture
};

// Moon texture mapping
export const MOON_TEXTURES: Record<string, string> = {
  Moon: moonTexture,
  Io: ioTexture,
  Europa: europaTexture,
  Ganymede: ganymedeTexture,
  Callisto: callistoTexture,
  Phobos: phobosTexture,
  Deimos: deimosTexture,
  Titan: titanTexture,
  Enceladus: enceladusTexture,
  Mimas: mimasTexture,
  Rhea: rheaTexture,
  Triton: tritonTexture,
  Charon: charonTexture,
  Miranda: mirandaTexture,
  Ariel: arielTexture,
  Titania: titaniaTexture,
  Umbriel: umbrielTexture,
  Oberon: oberonTexture,
  Dysnomia: dysnomiaTexture,
};

// Ring texture
export const RING_TEXTURES: Record<string, string> = {
  Saturn: saturnRingTexture,
  Haumea: saturnRingTexture, // Haumea uses Saturn's ring texture
};

export function getPlanetTexture(name: string): string | undefined {
  return PLANET_TEXTURES[name];
}

export function getMoonTexture(name: string): string | undefined {
  return MOON_TEXTURES[name];
}

export function getRingTexture(name: string): string | undefined {
  // Haumea uses Saturn's ring texture
  if (name === "Haumea") {
    return RING_TEXTURES["Saturn"];
  }
  return RING_TEXTURES[name];
}

// Cloud texture mapping
export const CLOUD_TEXTURES: Record<string, string> = {
  Earth: earthCloudsTexture,
};

export function getCloudTexture(name: string): string | undefined {
  return CLOUD_TEXTURES[name];
}

