import React, { useState, useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const t = setTimeout(() => setMounted(true), 50);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen bg-black text-white pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden"
    >
      {/* Film Grain / Noise */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay" aria-hidden="true">
        <filter id="heroNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoise)" />
      </svg>

      {/* Ambient Cursor Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-700 ease-out"
        style={{
          background: `radial-gradient(680px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236,72,153,0.10), transparent 75%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_55%_45%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(0,0,0,0.65)]" />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-pink-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-pink-400/[0.07] rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative Line - Left */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-pink-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* KOLOM KIRI: TEKS & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-all duration-700 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500 shadow-[0_0_8px_2px_rgba(236,72,153,0.6)]" />
              </span>
              <span className="text-xs md:text-sm font-medium text-zinc-300 tracking-wide">
                Zainab Aqilah
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] transition-all duration-700 delay-100 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Front-End Developer <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Modern & High-Performance
                <span className="absolute left-0 -bottom-1 h-px w-full bg-gradient-to-r from-pink-500/60 via-pink-500/20 to-transparent" />
              </span>{' '}
              <span className="inline-block text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:rotate-90 transition-transform duration-500 cursor-default">
                ✦
              </span>
            </h1>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto transition-all duration-700 delay-300 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm shadow-[0_0_0_0_rgba(236,72,153,0)] hover:shadow-[0_0_30px_4px_rgba(236,72,153,0.35)] transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative">Mulai Proyek</span>
                <span className="relative text-pink-600 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>

              <a
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white font-medium text-sm border border-white/15 hover:border-pink-500/40 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
              >
                <span>Lihat Portofolio</span>
                <span className="text-pink-400 group-hover:rotate-45 transition-transform duration-300">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* KOLOM KANAN: VISUAL ELEGAN TANPA TEKS */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              className={`relative transition-all duration-1000 delay-200 ease-out ${
                mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              {/* Main Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                
                {/* Outer Ring dengan Gradient */}
                <div className="absolute inset-0 rounded-full border border-pink-500/20 animate-[spin_30s_linear_infinite]" />
                
                {/* Middle Ring */}
                <div className="absolute inset-4 rounded-full border border-white/5" />
                
                {/* Inner Ring dengan Pulse Effect */}
                <div className="absolute inset-8 rounded-full border border-pink-500/10 animate-pulse" />
                
                {/* Core Visual */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-transparent flex items-center justify-center">
                  {/* Geometric Pattern inside */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Rotating Diamond */}
                    <div className="absolute w-24 h-24 border border-pink-500/30 animate-[spin_20s_linear_infinite] rotate-45" />
                    
                    {/* Inner Diamond */}
                    <div className="absolute w-16 h-16 border border-pink-500/20 animate-[spin_15s_linear_infinite_reverse] rotate-45" />
                    
                    {/* Center Dot with Glow */}
                    <div className="absolute w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-pulse" />
                    
                    {/* Decorative Dots on Ring */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i / 8) * Math.PI * 2;
                      const radius = 70;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/40"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                            animation: `pulse 2s ease-in-out infinite`,
                            animationDelay: `${i * 0.25}s`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Floating Orb Decorations */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-pink-500/10 blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-purple-500/10 blur-xl animate-pulse delay-500" />
                
                {/* Corner Accents */}
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-pink-500/40" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-pink-500/40" />
                <div className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-pink-500/30" />
                <div className="absolute top-1/2 -left-3 w-2 h-2 rounded-full bg-pink-500/30" />
              </div>

              {/* Horizontal decorative line di samping visual */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-l from-pink-500/30 to-transparent hidden xl:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        className={`hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-1000 delay-500 ${
          mounted ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-pink-500/50 to-transparent" />
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
};

export default Hero;