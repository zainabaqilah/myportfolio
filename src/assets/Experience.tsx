import React, { useState, useRef } from 'react';

interface ExperienceItem {
  id: number;
  role: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
  type: 'Work' | 'Project' | 'Academic';
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Front-End Web Developer',
    organization: 'Web Development Project',
    period: '2025 - Present',
    description:
      'Mengembangkan antarmuka aplikasi web modern menggunakan React, TypeScript, dan Tailwind CSS. Berfokus pada optimasi komponen reusabel, desain responsif, dan keterbacaan kode.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    type: 'Project',
  },
  {
    id: 2,
    role: 'Full-Stack Developer Intern',
    organization: 'Intern Management Web Project',
    period: '2025',
    description:
      'Membangun platform manajemen magang interaktif. Mengintegrasikan komponen UI responsif dengan arsitektur backend serta sistem kontrol versi berbasis Git & GitHub.',
    technologies: ['Laravel', 'React', 'Tailwind CSS', 'Git & GitHub'],
    type: 'Work',
  },
  {
    id: 3,
    role: 'Data & Computational Researcher',
    organization: 'Undergraduate Thesis Research',
    period: '2025 - 2026',
    description:
      'Melakukan analisis dan pemodelan prediktif berbasis data sekunder. Memproses klasifikasi dataset biner untuk analisis prediktif dengan optimasi akurasi model.',
    technologies: ['Data Analysis', 'Binary Classification', 'Python', 'Excel'],
    type: 'Academic',
  },
];

// Komponen Kartu 3D Individu (Ukuran Seragam)
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
    <div className="perspective-1000 w-full h-full flex">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative w-full h-full bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden group transform-style-3d cursor-pointer flex flex-col justify-between"
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

        {/* Tech Stack Badges (Selalu Menempel di Bawah) */}
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
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-black text-white overflow-hidden font-sans border-t border-zinc-900"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER SECTION DENGAN EFEK JUDUL BARU */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Portfolio & Milestone</span>
          </div>

          {/* Judul Utama dengan Neon Glow & Subtitle Effect */}
          <div className="relative group cursor-default">
            {/* Glow Backlight dibelakang Judul */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Jejak Proyek & <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Pengalaman Profesional
                {/* Underline Gradient Effect */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

        </div>

        {/* GRID KARTU 3D (Setiap kolom dipaksa berukuran h-full) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
      `}</style>
    </section>
  );
};

export default Experience;