import React, { useState, useEffect, useRef, useMemo } from 'react';

interface ExperienceItem {
  id: number;
  role: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
  type: 'PKL' | 'Project' | 'Academic';
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Staff Teknologi Informasi',
    organization: 'Badan Pusat Statistik (BPS)',
    period: 'Jun 2025 - Ags 2025',
    description:
      'Mengembangkan fitur sertifikat digital dengan mengintegrasikan frontend, backend, dan database yang telah tersedia.',
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'User Interface Design', 'GitHub', 'Kerja Tim'],
    type: 'PKL',
  },
  {
    id: 2,
    role: 'Asisten Dosen Statistika',
    organization: 'Universitas Lampung',
    period: 'Sep 2025 - Des 2025',
    description:
      'Membimbing praktikum Statistika, membantu analisis data dan penerapan metode statistika, mengevaluasi tugas, serta mendampingi mahasiswa dalam memahami konsep statistika selama 1 semester.',
    technologies: ['Statistika', 'Probabilitas', 'Minitab', 'Komunikasi', 'Teaching', 'Problem Solving'],
    type: 'Academic',
  },
  {
    id: 3,
    role: 'Asisten Dosen Basis Data',
    organization: 'Universitas Lampung',
    period: 'Sep 2024 - Des 2024',
    description:
      'Membimbing praktikum Basis Data, membantu mahasiswa memahami konsep basis data, SQL, dan perancangan database, mengevaluasi tugas, serta mendukung proses pembelajaran selama 1 semester',
    technologies: ['Database', 'SQL', 'MySQL', 'Komunikasi', 'Teaching', 'Problem Solving'],
    type: 'Academic',
  },
];

// Komponen Kartu 3D Individu
const Card3D: React.FC<{ item: ExperienceItem }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setGlowPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });

    const rotateX = ((mouseY - height / 2) / (height / 2)) * -8;
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full h-full flex relative z-10">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative w-full h-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden group transform-style-3d  flex flex-col justify-between"
      >
        {/* Dynamic Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${glowPos.x}% ${glowPos.y}%, rgba(236,72,153,0.15), transparent 80%)`,
          }}
        />

        {/* Hover Border Highlight */}
        <div className="absolute inset-0 rounded-2xl border border-pink-500/0 group-hover:border-pink-500/30 transition-colors duration-300 pointer-events-none" />

        {/* Bagian Atas Kartu */}
        <div>
          {/* Header Kartu */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-pink-400">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
              <span>{item.type}</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">{item.period}</span>
          </div>

          {/* Judul Role & Organisasi */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors duration-200 leading-snug">
              {item.role}
            </h3>
            <p className="text-xs font-semibold text-zinc-400 mt-1">
              {item.organization}
            </p>
          </div>

          {/* Deskripsi */}
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            {item.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80 mt-auto">
          {item.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 group-hover:border-zinc-700/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  // dynamic Mouse Tracking
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
    return [...Array(COUNT)].map(() => {
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 text-white overflow-hidden font-sans border-t border-zinc-900/80"
      style={{ backgroundColor: '#020208' }}
    >
      {/* ================================================================= */}
      {/* 🌌 LATAR KOSMIK, NEBULA & INTERACTIVE GLOW (SAMA DENGAN HERO)     */ }
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

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER SECTION DENGAN EFEK JUDUL BARU */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Pengalaman</span>
          </div>

          {/* Judul Utama dengan Neon Glow & Subtitle Effect */}
          <div className="relative group cursor-default">
            {/* Glow Backlight dibelakang Judul */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Pengalaman Magang & <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Academic
                {/* Underline Gradient Effect */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

        </div>

        {/* GRID KARTU 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-10">
          {experiences.map((item) => (
            <div key={item.id} className="h-full flex">
              <Card3D item={item} />
            </div>
          ))}
        </div>

      </div>

      {/* 3D Perspective CSS */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }

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

export default Experience;