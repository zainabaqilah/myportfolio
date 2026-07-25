import React, { useState, useEffect, useRef, useMemo } from 'react';

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

  // ================================================================= */
  // KONFIGURASI BINTANG BERGERAK (DIBUAT SEKALI DENGAN USEMEMO)
  // ================================================================= */
  const starsData = useMemo(() => {
    const COUNT = 80; // Jumlah bintang
    return [...Array(COUNT)].map(() => {
      // Posisi Awal Acak (0% - 100%)
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      // Ukuran Acak (kecil lebih banyak, besar jarang)
      const sizeRandom = Math.random();
      const size = sizeRandom > 0.9 ? 3 : sizeRandom > 0.7 ? 2 : 1;
      
      // Warna acak (Putih, Pink, Biru Muda)
      const colorRandom = Math.random();
      const color = colorRandom > 0.8 ? '#f472b6' : colorRandom > 0.6 ? '#38bdf8' : '#ffffff';
      const hasGlow = size >= 2;

      // Durasi Animasi Acak (Makin lama = makin lambat/jauh)
      // Antara 10 detik hingga 40 detik
      const duration = 10 + Math.random() * 30; 
      
      // Delay acak agar bintang tidak muncul bersamaan
      const delay = Math.random() * -duration; 

      return {
        startX,
        startY,
        size,
        color,
        hasGlow,
        duration,
        delay,
      };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen text-white pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden"
      style={{ backgroundColor: '#020208' }}
    >
      {/* ================================================================= */}
      {/* 🌌 LATAR ANG KASA & NEBULA KOSMIK (STATIS)                      */}
      {/* ================================================================= */}

      {/* 1. Base Deep Space Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, #1a0826 0%, #080614 50%, #020208 100%)',
        }}
      />

      {/* 2. Crimson / Pink Glowing Nebula (Kiri Bawah) */}
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-60"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '45rem',
          height: '45rem',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.35) 0%, rgba(131, 24, 67, 0.1) 60%, transparent 80%)',
        }}
      />

      {/* 3. Deep Cyan / Teal Nebula Dust (Kanan Atas) */}
      <div
        className="absolute pointer-events-none rounded-full blur-[140px] opacity-60"
        style={{
          top: '-15%',
          right: '-5%',
          width: '50rem',
          height: '50rem',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(15, 118, 110, 0.1) 60%, transparent 80%)',
        }}
      />

      {/* 4. Interactive Mouse Pointer Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out z-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236,72,153,0.15), rgba(6,182,212,0.08) 45%, transparent 80%)`,
        }}
      />

      {/* ================================================================= */}
      {/* 🌠 EFEK BINTANG BERJALAN/MENGALIR (DYNAMIC STARFIELD)           */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {starsData.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-0" // Mulai dari transparan
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.hasGlow ? `0 0 10px 1px ${star.color}` : 'none',
              
              // Posisi awal statis (opsional, animasi akan menimpa ini)
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              
              // Menerapkan animasi berjalan dan kelap-kelip
              // Perhatikan '--star-start-x', ini adalah variabel CSS untuk animasi
              animation: `starFlow ${star.duration}s linear infinite, starTwinkle 4s ease-in-out infinite alternate`,
              animationDelay: `${star.delay}s`,
              
              // Menyimpan posisi awal acak ke dalam variabel CSS untuk digunakan di keyframes
              '--star-start-x': `${star.startX}vw`,
              '--star-start-y': `${star.startY}vh`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 6. Subtle Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 7. Vignette Darkening Edge */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow: 'inset 0 0 160px 60px rgba(2, 2, 8, 0.9)',
        }}
      />

      {/* ================================================================= */}

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
              Data Analytics <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                & Front-End Development
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
                <span className="relative">Let's Connect</span>
                <span className="relative text-pink-600 group-hover:translate-x-1 transition-transform duration-300">
                  →
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
        
        /* ----------------------------------------------------------- */
        /* ANIMASI BINTANG BERJALAN (FLOW)                             */
        /* ----------------------------------------------------------- */
        @keyframes starFlow {
          /* 0%: Bintang muncul di posisi acak, transparan */
          0% {
            opacity: 0;
            transform: translate(var(--star-start-x), var(--star-start-y)) scale(0.5);
          }
          /* 10%: Bintang menjadi terang sepenuhnya (fade in) */
          10% {
            opacity: 1;
            transform: translate(calc(var(--star-start-x) * 0.9), calc(var(--star-start-y) * 0.9)) scale(1);
          }
          /* 90%: Bintang tetap terang sambil bergerak */
          90% {
            opacity: 1;
          }
          /* 100%: Bintang bergerak jauh ke sudut, membesar, dan hilang (fade out) */
          /* Menciptakan efek 3D menerobos bintang */
          100% {
            opacity: 0;
            transform: translate(calc(var(--star-start-x) * -0.5), calc(var(--star-start-y) * -0.5)) scale(2);
          }
        }

        /* Animasi kelap-kelip statis (opsional, digabung dengan Flow) */
        @keyframes starTwinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default Hero;