import { useEffect, useRef, useState } from "react";

/**
 * Three Dee Safety — Professional Motion Graphics Promo (16:9 Landscape)
 * 
 * Design Philosophy: Industrial Cinematic
 * - Full-screen product sequences with smooth transitions
 * - Optimized for 16:9 landscape format
 * - Integrated all user-provided assets and music
 */

interface Scene {
  id: string;
  image: string;
  duration: number;
  animation: string;
  title?: string;
  subtitle?: string;
}

const SCENES: Scene[] = [
  {
    id: "hero_ad",
    image: "/assets/three_dee_ad_1_hero.png",
    duration: 4,
    animation: "zoomIn",
    title: "Three Dee",
    subtitle: "Safety",
  },
  {
    id: "helmet",
    image: "/assets/three_dee_hero_helmet.png",
    duration: 3,
    animation: "zoomIn",
  },
  {
    id: "jacket",
    image: "/assets/three_dee_hero_jacket.png",
    duration: 3,
    animation: "panLeft",
  },
  {
    id: "gloves",
    image: "/assets/three_dee_hero_gloves.png",
    duration: 3,
    animation: "panLeft",
  },
  {
    id: "earmuffs",
    image: "/assets/three_dee_hero_earmuffs.png",
    duration: 3,
    animation: "zoomIn",
  },
  {
    id: "vest",
    image: "/assets/three_dee_hero_vest.png",
    duration: 3,
    animation: "zoomIn",
  },
  {
    id: "suit",
    image: "/assets/three_dee_hero_suit.png",
    duration: 3,
    animation: "panUp",
  },
  {
    id: "harness",
    image: "/assets/three_dee_hero_harness.png",
    duration: 3,
    animation: "panUp",
  },
  {
    id: "boot",
    image: "/assets/three_dee_hero_boot.png",
    duration: 3,
    animation: "zoomOut",
  },
  {
    id: "goggles",
    image: "/assets/three_dee_hero_goggles.png",
    duration: 3,
    animation: "panLeft",
  },
  {
    id: "woman_creative",
    image: "/assets/woman_ad_creative.png",
    duration: 4,
    animation: "zoomIn",
  },
  {
    id: "professional_portrait",
    image: "/assets/professional_portrait.png",
    duration: 4,
    animation: "panLeft",
  },
  {
    id: "site_wide",
    image: "/assets/three_dee_site_wide.png",
    duration: 4,
    animation: "zoomIn",
  },
  {
    id: "tagline",
    image: "/assets/tagline_background.png",
    duration: 4,
    animation: "fade",
    title: "Tough Gear",
    subtitle: "For Tough Jobs.",
  },
  {
    id: "end",
    image: "/assets/three_dee_logo_highres.png",
    duration: 4,
    animation: "scaleIn",
  },
];

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isPlaying) return;

    const scene = SCENES[currentScene];
    const nextSceneTime = scene.duration * 1000;

    timeoutRef.current = setTimeout(() => {
      setCurrentScene((prev) => (prev + 1) % SCENES.length);
    }, nextSceneTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentScene, isPlaying]);

  const handleReplay = () => {
    setCurrentScene(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(true);
  };

  const getAnimationClass = (animation: string): string => {
    const baseClass = "absolute inset-0 w-full h-full";
    switch (animation) {
      case "zoomIn":
        return `${baseClass} animate-[zoom-in_4s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "zoomOut":
        return `${baseClass} animate-[zoom-out_4s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "panLeft":
        return `${baseClass} animate-[pan-left_4s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "panUp":
        return `${baseClass} animate-[pan-up_4s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "scaleIn":
        return `${baseClass} animate-[scale-in_4s_cubic-bezier(0.2,1.25,0.35,1)_forwards]`;
      case "fade":
      default:
        return `${baseClass} animate-[fade-in_1.5s_ease-out_forwards]`;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes zoom-in {
          from { transform: scale(1.0); }
          to { transform: scale(1.15); }
        }
        @keyframes zoom-out {
          from { transform: scale(1.15); }
          to { transform: scale(1.0); }
        }
        @keyframes pan-left {
          from { transform: scale(1.1) translateX(2%); }
          to { transform: scale(1.1) translateX(-2%); }
        }
        @keyframes pan-up {
          from { transform: scale(1.1) translateY(2%); }
          to { transform: scale(1.1) translateY(-2%); }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reel {
          aspect-ratio: 16 / 9;
          max-width: 1280px;
          width: 95vw;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          position: relative;
        }
        .scene {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .scene.active {
          opacity: 1;
        }
        .scene-image {
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%),
                      linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%);
          z-index: 5;
        }
        .text-content {
          position: absolute;
          bottom: 10%;
          left: 5%;
          z-index: 10;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .title {
          font-size: 5vw;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          line-height: 1;
        }
        .subtitle {
          font-size: 2.5vw;
          color: #F26522;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-top: 0.5vh;
        }
        .tagline-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
          background: rgba(0,0,0,0.4);
          text-align: center;
        }
        .tagline-main {
          font-size: 8vw;
          font-weight: 900;
          color: white;
          text-transform: uppercase;
        }
        .tagline-accent {
          font-size: 6vw;
          font-weight: 900;
          color: #F26522;
          text-transform: uppercase;
        }
        .end-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, #1a1a1a 0%, #000 100%);
          z-index: 30;
        }
        .end-logo {
          width: 50%;
          max-width: 600px;
          filter: drop-shadow(0 0 20px rgba(242, 101, 34, 0.3));
        }
        .controls {
          margin-top: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .btn {
          background: #F26522;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .btn:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="reel" ref={reelRef}>
        {SCENES.map((s, idx) => (
          <div
            key={s.id}
            className={`scene ${currentScene === idx ? "active" : ""}`}
          >
            {s.image && (
              <div
                className={`scene-image ${getAnimationClass(s.animation)}`}
                style={{ backgroundImage: `url(${s.image})` }}
              />
            )}
            <div className="overlay" />

            {/* Content for scenes with titles */}
            {s.title && s.id !== "tagline" && (
              <div className="text-content">
                <h1 className="title">{s.title}</h1>
                <p className="subtitle">{s.subtitle}</p>
              </div>
            )}

            {/* Special Tagline Scene */}
            {s.id === "tagline" && (
              <div className="tagline-overlay">
                <div className="tagline-main">Tough Gear</div>
                <div className="tagline-accent">For Tough Jobs.</div>
              </div>
            )}

            {/* End Card */}
            {s.id === "end" && (
              <div className="end-card">
                <img src={s.image} alt="Logo" className="end-logo" />
                <p className="subtitle" style={{ marginTop: '2rem' }}>Safety. Quality. Commitment.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="btn" onClick={handleReplay}>
          Replay Animation
        </button>
        <p className="text-gray-500 text-sm">16:9 Landscape • Full Asset Sequence</p>
      </div>

      <audio
        ref={audioRef}
        src="/assets/safety_promo_music.wav"
        loop
        autoPlay
      />
    </div>
  );
}
