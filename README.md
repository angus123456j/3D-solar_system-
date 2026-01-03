# Interactive 3D Solar System

An immersive, interactive 3D visualization of our solar system built with React, Three.js, and React Three Fiber. Explore planets, moons, and celestial bodies with realistic textures, orbital mechanics, and detailed information panels.

![Interactive Solar System](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)

## Features

- **Complete Solar System**: All 8 planets, dwarf planets (Pluto, Ceres, Eris, Makemake, Haumea), and the Sun
- **Moons**: Interactive moons for planets including Earth's Moon, Jupiter's Galilean moons, Saturn's Titan, and more
- **Realistic Textures**: High-resolution 2K textures for planets and moons
- **Orbital Mechanics**: Accurate orbital speeds and rotations
- **Interactive Camera**: Click planets/moons to zoom in, smooth camera transitions
- **Information Panels**: Detailed facts, statistics, and fun facts for each celestial body
- **Performance Optimized**: Efficient rendering with instanced meshes for asteroid belt
- **Customizable Controls**: Adjust time scale, toggle labels, orbits, and moon visibility
- **Visual Effects**: Starfield background, bloom post-processing effects, and atmospheric lighting

##  Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/angus123456j/3D-solar_system-.git
cd 3D_Solar_System
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Controls

- **Left Click + Drag**: Rotate the camera around the solar system
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in/out
- **Click Planet/Moon**: Zoom in and show information panel
- **Click Again**: Zoom out
- **Zoom Out Button**: Return to initial view

### Control Panel

- **Time Scale**: Adjust the speed of orbital motion (0.1x to 10x)
- **Show Labels**: Toggle planet/moon name labels
- **Show Moon Labels**: Toggle moon labels separately
- **Show Orbits**: Toggle orbit path visualization

## 🛠️ Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers and utilities for R3F
- **@react-three/postprocessing** - Visual effects (Bloom)

## 📁 Project Structure

```
3D_Solar_System/
├── public/                 # Static assets
│   ├── Ceres_1_1000.glb    # 3D model for Ceres
│   └── favicon.png         # Browser favicon
├── src/
│   ├── assets/             # Texture images
│   │   └── textures/
│   │       ├── planets/    # Planet textures
│   │       ├── moons/      # Moon textures
│   │       ├── rings/      # Ring textures
│   │       └── misc/       # Dwarf planet textures
│   ├── components/
│   │   ├── canvas/         # 3D scene components
│   │   │   ├── SolarSystem.tsx
│   │   │   ├── Sun.tsx
│   │   │   ├── Planet.tsx
│   │   │   ├── Moon.tsx
│   │   │   ├── Ceres.tsx
│   │   │   ├── Starfield.tsx
│   │   │   ├── AsteroidBelt.tsx
│   │   │   └── CameraController.tsx
│   │   └── ui/             # UI components
│   │       ├── Controls.tsx
│   │       ├── InfoPanel.tsx
│   │       └── MoonInfoPanel.tsx
│   ├── data/
│   │   └── planets.ts       # Celestial body data
│   ├── stores/
│   │   └── cameraStore.ts   # Camera state management
│   ├── utils/
│   │   └── textures.ts     # Texture path helpers
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── package.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel. The build process:

1. Compiles TypeScript
2. Bundles assets with Vite
3. Optimizes textures and 3D models
4. Generates production-ready static files

## Features in Detail

### Celestial Bodies

- **Sun**: Central star with point light source
- **Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **Dwarf Planets**: Ceres (3D model), Pluto, Eris, Makemake, Haumea
- **Major Moons**: 20+ moons including Earth's Moon, Jupiter's Galilean moons, Saturn's major moons, and more

### Visual Features

- Realistic planet textures with proper scaling
- Rotating planets with accurate axial tilts
- Orbital paths with configurable visibility
- Starfield background with 8000+ stars
- Asteroid belt between Mars and Jupiter
- Saturn's rings with transparency
- Dynamic lighting when focusing on planets

## Development

### Adding New Planets/Moons

1. Add texture to `src/assets/textures/planets/` or `src/assets/textures/moons/`
2. Add data to `src/data/planets.ts`
3. Update `src/utils/textures.ts` if needed

### Customizing Camera

Camera behavior is controlled in:
- `src/stores/cameraStore.ts` - Camera state management
- `src/components/canvas/CameraController.tsx` - Camera tracking logic

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Planet textures from various NASA sources
- Three.js community for excellent documentation
- React Three Fiber for making 3D in React accessible

---

Built using React, Three.js, and React Three Fiber
