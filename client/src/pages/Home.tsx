import { useEffect, useRef, useState } from "react";

/**
 * Three Dee Safety — Professional Motion Graphics Promo (16:9 Landscape)
 * 
 * Design Philosophy: Industrial Cinematic
 * - Dramatic product-focused sequences with smooth transitions
 * - Golden hour lighting and industrial aesthetics
 * - Layered animations with professional timing
 * - Custom background music synchronized with visuals
 * - High-impact landscape format for ads and displays
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
    id: "helmet",
    image: "/manus-storage/three_dee_hero_helmet_e34e8ab9.png",
    duration: 3.5,
    animation: "zoomIn",
    title: "Three Dee",
    subtitle: "Safety",
  },
  {
    id: "jacket",
    image: "/assets/three_dee_hero_jacket.png",
    duration: 3,
    animation: "panLeft",
  },
  {
    id: "gloves",
    image: "/manus-storage/three_dee_hero_gloves_51691272.png",
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
    image: "/manus-storage/three_dee_hero_vest_95bccde2.png",
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
    image: "/manus-storage/three_dee_hero_harness_72317184.png",
    duration: 3,
    animation: "panUp",
  },
  {
    id: "boot",
    image: "/manus-storage/three_dee_hero_boot_0cd46e54.png",
    duration: 3,
    animation: "zoomOut",
  },
  {
    id: "goggles",
    image: "/manus-storage/three_dee_hero_goggles_fcd8dd21.png",
    duration: 3,
    animation: "panLeft",
  },
  {
    id: "site",
    image: "/assets/three_dee_site_wide.png",
    duration: 3.5,
    animation: "zoomIn",
  },
  {
    id: "tagline",
    image: "",
    duration: 4,
    animation: "fade",
    title: "Tough Gear",
    subtitle: "For Tough Jobs.",
  },
  {
    id: "end",
    image: "/manus-storage/three_dee_logo_highres_de075841.png",
    duration: 3,
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
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const getAnimationClass = (animation: string): string => {
    const baseClass = "absolute inset-0 w-full h-full";
    switch (animation) {
      case "zoomIn":
        return `${baseClass} animate-[zoom-in_3.5s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "zoomOut":
        return `${baseClass} animate-[zoom-out_3s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "panLeft":
        return `${baseClass} animate-[pan-left_3s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "panUp":
        return `${baseClass} animate-[pan-up_3s_cubic-bezier(0.33,0,0.2,1)_forwards]`;
      case "scaleIn":
        return `${baseClass} animate-[scale-in_3s_cubic-bezier(0.2,1.25,0.35,1)_forwards]`;
      case "fade":
      default:
        return `${baseClass} animate-[fade-in_1s_ease-out_forwards]`;
    }
  };

  const scene = SCENES[currentScene];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes zoom-in {
          from { transform: scale(1.02); }
          to { transform: scale(1.17); }
        }
        @keyframes zoom-out {
          from { transform: scale(1.19); }
          to { transform: scale(1.05); }
        }
        @keyframes pan-left {
          from { transform: scale(1.16) translateX(2.5%); }
          to { transform: scale(1.16) translateX(-3.5%); }
        }
        @keyframes pan-up {
          from { transform: scale(1.16) translateY(3.5%); }
          to { transform: scale(1.16) translateY(-3.5%); }
        }
        @keyframes scale-in {
          from { transform: scale(0.84); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { left: -50%; opacity: 0; }
          12% { opacity: 0.85; }
          88% { opacity: 0.85; }
          100% { left: 140%; opacity: 0; }
        }
        @keyframes glint {
          0% { left: -45%; opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { left: 135%; opacity: 0; }
        }
        .reel {
          aspect-ratio: 16 / 9;
          max-width: 1280px;
          width: 95vw;
          border-radius: 20px;
          overflow: hidden;
          background: #050506;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
        }
        .scene {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .scene.active {
          opacity: 1;
        }
        .scene-image {
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .scrim-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.78) 0%, transparent 42%);
        }
        .scrim-top {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, transparent 30%);
        }
        .kicker {
          position: absolute;
          top: 5%;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 10;
          font-weight: 800;
          letter-spacing: 0.5em;
          font-size: 3.3vw;
          color: white;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(-1vh);
          transition: opacity 0.7s ease, transform 0.7s ease;
          text-indent: 0.5em;
        }
        .kicker.show {
          opacity: 0.96;
          transform: translateY(0);
        }
        .kicker-accent {
          color: #F26522;
          font-style: normal;
        }
        .tagline-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          background: radial-gradient(120% 90% at 50% 40%, #16171b 0%, #070708 70%);
          text-align: center;
        }
        .tagline-line {
          font-family: "Arial Black", "Helvetica Neue", Impact, sans-serif;
          text-transform: uppercase;
          line-height: 0.9;
          font-weight: 900;
        }
        .tagline-main {
          font-size: 18vw;
          color: white;
          opacity: 0;
          filter: blur(16px);
          transition: opacity 0.35s ease, filter 0.5s ease;
          text-shadow: 0 6px 22px rgba(0, 0, 0, 0.6);
        }
        .tagline-main.show {
          opacity: 1;
          filter: blur(0);
        }
        .tagline-accent {
          font-size: 18vw;
          color: #F26522;
          clip-path: inset(0 100% 0 0);
          opacity: 0;
          transition: clip-path 0.55s cubic-bezier(0.7, 0, 0.2, 1) 0.35s, opacity 0.1s ease 0.35s;
          margin-top: 1vh;
          text-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
        }
        .tagline-accent.show {
          opacity: 1;
          clip-path: inset(0 0 0 0);
        }
        .tagline-rule {
          width: 0;
          height: 0.6vh;
          background: #F26522;
          margin-top: 3vh;
          transition: width 0.6s ease 0.85s;
        }
        .tagline-rule.show {
          width: 40vw;
        }
        .end-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          background: radial-gradient(120% 90% at 50% 46%, #1a1b20 0%, #070708 72%);
        }
        .end-spot {
          position: absolute;
          width: 120vw;
          height: 120vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(242, 101, 34, 0.2), transparent 60%);
          filter: blur(6px);
        }
        .end-logo {
          width: 78%;
          opacity: 0;
          transform: scale(0.84);
          position: relative;
          z-index: 20;
          filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.55));
          transition: opacity 0.5s ease, transform 0.9s cubic-bezier(0.2, 1.25, 0.35, 1);
        }
        .end-logo.show {
          opacity: 1;
          transform: scale(1);
        }
        .end-rule {
          width: 0;
          height: 0.5vh;
          background: #F26522;
          margin-top: 4vh;
          position: relative;
          z-index: 20;
          transition: width 0.7s ease 0.5s;
        }
        .end-rule.show {
          width: 32vw;
        }
        .end-tag {
          margin-top: 3vh;
          font-weight: 800;
          letter-spacing: 0.16em;
          font-size: 3.8vw;
          color: #B6B6BE;
          text-transform: uppercase;
          opacity: 0;
          position: relative;
          z-index: 20;
          transition: opacity 0.6s ease 0.6s;
        }
        .end-tag.show {
          opacity: 1;
        }
        .end-tag-bold {
          color: white;
        }
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: radial-gradient(125% 95% at 50% 44%, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
        }
        .grain {
          position: absolute;
          inset: -50%;
          z-index: 6;
          pointer-events: none;
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          animation: grain 1.1s steps(3) infinite;
        }
        @keyframes grain {
          0% { transform: translate(0, 0); }
          33% { transform: translate(-3%, 2%); }
          66% { transform: translate(2%, -2%); }
          100% { transform: translate(0, 0); }
        }
        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 20px;
        }
        .btn {
          font: 600 13px system-ui;
          color: #0c0c0d;
          background: #F26522;
          border: 0;
          padding: 9px 18px;
          border-radius: 999px;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 6px 18px rgba(242, 101, 34, 0.35);
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .hint {
          color: #55555c;
          font-size: 12px;
        }
      `}</style>

      <div className="reel" ref={reelRef}>
        {/* Product scenes */}
        {SCENES.map((s, idx) => (
          <div
            key={s.id}
            className={`scene ${currentScene === idx ? "active" : ""}`}
          >
            {s.image && (
              <>
                <div
                  className={`scene-image ${getAnimationClass(s.animation)}`}
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                {s.id !== "helmet" && <div className="scrim-bottom" />}
                {s.id === "helmet" && <div className="scrim-top" />}
              </>
            )}

            {/* Kicker text for helmet scene */}
            {s.id === "helmet" && (
              <div className={`kicker ${currentScene === idx ? "show" : ""}`}>
                Three&nbsp;Dee&nbsp;
                <span className="kicker-accent">Safety</span>
              </div>
            )}

            {/* Tagline scene */}
            {s.id === "tagline" && (
              <div className="tagline-text">
                <div
                  className={`tagline-line tagline-main ${
                    currentScene === idx ? "show" : ""
                  }`}
                >
                  Tough Gear
                </div>
                <div
                  className={`tagline-line tagline-accent ${
                    currentScene === idx ? "show" : ""
                  }`}
                >
                  For Tough Jobs.
                </div>
                <div
                  className={`tagline-rule ${currentScene === idx ? "show" : ""}`}
                />
              </div>
            )}

            {/* End card */}
            {s.id === "end" && (
              <div className="end-card">
                <div className="end-spot" />
                <img
                  src={s.image}
                  alt="Three Dee Safety"
                  className={`end-logo ${currentScene === idx ? "show" : ""}`}
                />
                <div
                  className={`end-rule ${currentScene === idx ? "show" : ""}`}
                />
                <div
                  className={`end-tag ${currentScene === idx ? "show" : ""}`}
                >
                  <span className="end-tag-bold">Tough gear</span> for tough
                  jobs.
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Atmosphere */}
        <div className="vignette" />
        <div className="grain" />
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="btn" onClick={handleReplay}>
          Replay
        </button>
        <span className="hint">16:9 · ~38s loop</span>
      </div>

      {/* Background music */}
      <audio
        ref={audioRef}
        src="/manus-storage/safety_promo_music_0e240895.wav"
        loop
        autoPlay
        className="hidden"
      />
    </div>
  );
}
