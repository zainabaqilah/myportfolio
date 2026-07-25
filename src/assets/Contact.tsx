import React, { useState, useEffect, useRef, useMemo } from 'react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const emailAddress = 'zainabb31864@gmail.com';
  const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp aktif kamu

  // Dynamic Mouse Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate Data Bintang Maju (Cruising Space)
  const starsData = useMemo(() => {
    const COUNT = 70;
    return [...Array(COUNT)].map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      const offsetX = startX - 50;
      const offsetY = startY - 50;

      const endX = startX + offsetX * 0.8;
      const endY = startY + offsetY * 0.8;

      const sizeRandom = Math.random();
      const size = sizeRandom > 0.85 ? 3 : sizeRandom > 0.6 ? 2 : 1;

      const colorRandom = Math.random();
      const color = colorRandom > 0.8 ? '#f472b6' : colorRandom > 0.6 ? '#38bdf8' : '#ffffff';
      const hasGlow = size >= 2;

      const duration = 15 + Math.random() * 20;
      const delay = -(Math.random() * duration);

      return {
        startX,
        startY,
        endX,
        endY,
        size,
        color,
        hasGlow,
        duration,
        delay,
      };
    });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent('Halo, ini Zainab Aqilah');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 pb-12 text-white overflow-hidden font-sans border-t border-zinc-900/80"
      style={{ backgroundColor: '#020208' }}
    >
      {/* ================================================================= */}
      {/* 🌌 LATAR KOSMIK, NEBULA & INTERACTIVE GLOW (SAMA DENGAN HERO)     */}
      {/* ================================================================= */}

      {/* 1. Base Deep Space Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, #1a0826 0%, #080614 50%, #020208 100%)',
        }}
      />

      {/* 2. Crimson / Pink Glowing Nebula */}
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

      {/* 3. Deep Cyan / Teal Nebula Dust */}
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

      {/* 5. Dynamic Starfield (Cruising Space Effect) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {starsData.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.hasGlow ? `0 0 10px 1px ${star.color}` : 'none',

              '--start-x': `${star.startX}vw`,
              '--start-y': `${star.startY}vh`,
              '--end-x': `${star.endX}vw`,
              '--end-y': `${star.endY}vh`,

              animation: `cruiseForward ${star.duration}s linear infinite, starTwinkle 4s ease-in-out infinite alternate`,
              animationDelay: `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 6. Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 7. Vignette Darkening Edge */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow: 'inset 0 0 160px 60px rgba(2, 2, 8, 0.9)',
        }}
      />

      {/* ================================================================= */}

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Kontak & Diskusi</span>
          </div>

          {/* Judul Utama dengan Neon Glow */}
          <div className="relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Mari Terhubung & <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Berdiskusi  
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2">
            Terbuka untuk peluang kerja, kolaborasi, maupun diskusi seputar teknologi. Silakan hubungi saya melalui kontak di bawah ini.
          </p>
        </div>

        {/* MINIMALIST CONTACT LINKS WITH HIGH-RES SVG ICONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-28">
          
          {/* ITEM 1: EMAIL */}
          <div className="flex items-center gap-4 group">
            {/* High-Res Email SVG Icon */}
            <a
              href={`mailto:${emailAddress}`}
              className="w-14 h-14 rounded-2xl bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] flex items-center justify-center text-pink-400 transition-all duration-300"
              title="Kirim Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </a>

            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                Email
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm font-semibold text-zinc-200 hover:text-pink-400 transition-colors"
              >
                {emailAddress}
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-[11px] font-mono text-left text-pink-400/80 hover:text-pink-400 mt-0.5 transition-colors"
              >
                {copied ? '✓ Email tersalin!' : 'Klik untuk salin alamat'}
              </button>
            </div>
          </div>

          {/* SEPARATOR (DESKTOP ONLY) */}
          <div className="hidden sm:block w-[1px] h-12 bg-zinc-800/80" />

          {/* ITEM 2: WHATSAPP */}
          <div className="flex items-center gap-4 group">
            {/* High-Res WhatsApp Official SVG Icon */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] flex items-center justify-center text-pink-400 transition-all duration-300"
              title="Chat WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.688-.833-1.949-.928-.261-.095-.451-.143-.641.143-.19.285-.736.928-.903 1.118-.166.19-.332.214-.618.071-.285-.143-1.206-.444-2.298-1.417-.85-.758-1.424-1.693-1.591-1.978-.166-.285-.018-.439.125-.581.129-.128.285-.333.428-.499.143-.167.19-.285.285-.476.095-.19.048-.357-.024-.5-.071-.143-.641-1.545-.879-2.116-.231-.557-.466-.482-.641-.491l-.547-.01c-.19 0-.499.071-.76.357-.261.285-.998.975-.998 2.38 0 1.404 1.022 2.76 1.165 2.951.143.19 2.012 3.072 4.875 4.308.681.294 1.213.469 1.627.601.684.218 1.307.187 1.799.114.548-.082 1.688-.69 1.926-1.356.237-.666.237-1.237.166-1.356-.07-.119-.26-.19-.546-.333z" />
              </svg>
            </a>

            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                WhatsApp
              </span>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-200 hover:text-pink-400 transition-colors flex items-center gap-1.5"
              >
                <span>Chat Langsung</span>
                <span>↗</span>
              </a>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Respon Cepat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        /* ----------------------------------------------------------- */
        /* ANIMASI BINTANG MAJU TENANG (CRUISING FORWARD)              */
        /* ----------------------------------------------------------- */
        @keyframes cruiseForward {
          0% {
            opacity: 0;
            left: var(--start-x);
            top: var(--start-y);
            transform: scale(0.2);
          }
          15% {
            opacity: 0.7;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            left: var(--end-x);
            top: var(--end-y);
            transform: scale(2.2);
          }
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default Contact;