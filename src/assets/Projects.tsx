import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: 'Web App' | 'Data & Research' | 'UI/UX';
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  status: 'Completed' | 'In Progress';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Magnet',
    subtitle: 'Magang dan Monitoring Elektronik Terpadu',
    category: 'Web App',
    period: '2025',
    description:
      'Aplikasi web interaktif untuk mengelola alur kerja, tugas, rekapitulasi data dan pengelolaan sertifikat mahasiswa magang secara efisien.',
    highlights: [
      'Integrasi database & manajemen role pengguna',
      'Proses pembuatan, verifikasi dan pengelolaan sertifikat dengan antarmuka yang responsif',
      'Pembuatan Fitur Sertifikat Digital yang dapat diunduh dalam format PDF',
    ],
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'GitHub'],
    status: 'Completed',
    githubUrl: 'https://magnet-bps-six.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Peramalan Jumlah Penumpang Pesawat di Bandara Radin Inten II Lampung',
    subtitle: 'Forecasting & Time Series Analysis',
    category: 'Data & Research',
    period: '2025 - 2026',
    description:
      'Penelitian tugas akhir yang berfokus pada peramalan jumlah penumpang pesawat di Bandara Radin Inten II Lampung menggunakan metode SARIMA dan Triple Exponential Smoothing (Holt-Winters) untuk membandingkan performa model dan menghasilkan prediksi yang akurat.',
    highlights: [
      'Analisis dan prapemrosesan data historis penumpang bulanan (2015–2024)',
      'Implementasi model SARIMA dan Triple Exponential Smoothing',
      'Evaluasi performa menggunakan MAPE, MAE, dan RMSE',
      'Perbandingan akurasi model untuk menentukan metode terbaik',
    ],
    technologies: ['Python', 'Time Series Forecasting', 'Excel', 'Statsmodels', 'Pandas', 'Data Analysis'],
    status: 'Completed',
    featured: true,
  },
  {
    id: 3,
    title: 'Analisa Kualitas Udara Kota Bandar Lampung menggunakan Machine Learning',
    subtitle: 'Riset Pemodelan Komputasi & Regresi Data',
    category: 'Data & Research',
    period: '2025 - 2026',
    description:
      'Penelitian yang berfokus pada analisis kualitas udara di Kota Bandar Lampung menggunakan teknik regresi untuk mengidentifikasi hubungan antarvariabel serta memprediksi tingkat kualitas udara berdasarkan data historis.',
    highlights: [
      'Pembersihan & pemrosesan dataset kualitas udara',
      'Analisis statistik & evaluasi performa model regresi',
      'Evaluasi performa model menggunakan metrik statistik',
    ],
    technologies: ['Python', 'Excel', 'Regression Analysis', 'Data Analysis', 'Scikit-learn', 'Pandas'],
    status: 'Completed',
    featured: true,
  },
  {
    id: 4,
    title: 'Zovy Watch',
    subtitle: 'Situs Web Penjualan Jam Tangan Online',
    category: 'Web App',
    period: '2024',
    description:
      'Website e-commerce jam tangan yang menyediakan fitur katalog produk, autentikasi pengguna, keranjang belanja, dan pengelolaan pesanan.',
    highlights: [
      'CRUD produk',
      'Autentikasi pengguna',
      'Keranjang & checkout',
      'Desain responsif',
    ],
    technologies: ['Laravel', 'HTML', 'CSS', 'GitHub'],
    status: 'Completed',
    featured: false,
  },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic Mouse Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // 🔒 Lock Scroll Total
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProject]);

  // 🧹 Auto Close jika Pindah Filter
  useEffect(() => {
    setSelectedProject(null);
  }, [filter]);

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

  // Generate Data Bintang Maju
  const starsData = useMemo(() => {
    const COUNT = 80;
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

  const categories = ['All', 'Data & Research', 'Web App'];

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-12 md:py-16 text-white overflow-hidden font-sans border-t border-zinc-900/80"
      style={{ backgroundColor: '#020208' }}
    >
      {/* 🌌 LATAR KOSMIK & NEBULA */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, #1a0826 0%, #080614 50%, #020208 100%)',
        }}
      />

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

      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out z-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236,72,153,0.15), rgba(6,182,212,0.08) 45%, transparent 80%)`,
        }}
      />

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

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow: 'inset 0 0 160px 60px rgba(2, 2, 8, 0.9)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs sm:text-sm font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Karya & Eksplorasi</span>
          </div>

          <div className="relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Proyek & <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Hasil Riset Penelitian
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

          {/* 🟢 Subtitle Header HP dinaikkan ke text-sm */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mt-2">
            Kumpulan proyek pengembangan web dan penelitian berbasis data yang dikerjakan selama perkuliahan, magang, dan pengembangan mandiri.
          </p>
        </div>

        {/* FILTER CATEGORY BUTTONS */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border backdrop-blur-sm cursor-pointer ${
                filter === cat
                  ? 'bg-zinc-800 text-white border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.25)] scale-105'
                  : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white hover:scale-102'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PROYEK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/90 hover:border-pink-500/50 rounded-2xl p-6 sm:p-7 transition-all duration-500 ease-out flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(236,72,153,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-50 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Kartu: Category Badge & Status */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-mono text-pink-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                    <span>{project.category}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm font-mono text-zinc-400 group-hover:border-zinc-700 transition-colors">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                          : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
                      }`}
                    />
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* Judul Proyek & Subtitle */}
                <div className="mb-4">
                  {/* 🟢 Judul Proyek HP dinaikkan ke text-lg sm:text-xl */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-200 leading-snug">
                    {project.title}
                  </h3>
                  {/* 🟢 Subtitle Proyek HP dinaikkan ke text-sm sm:text-base */}
                  <p className="text-sm sm:text-base font-semibold text-pink-400/90 mt-1.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* 🟢 Deskripsi Singkat Kartu HP dinaikkan ke text-sm sm:text-base */}
                <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed line-clamp-3 mb-6 group-hover:text-zinc-200 transition-colors">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-zinc-800/80 group-hover:border-pink-500/20 transition-colors">
                  {project.technologies.map((tech, idx) => (
                    /* 🟢 Badges Tech Stack HP dinaikkan ke text-xs sm:text-sm */
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-xs sm:text-sm font-semibold text-zinc-300 group-hover:border-pink-500/30 group-hover:text-pink-200 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* TOMBOL "LIHAT DETAIL PROYEK" */}
                <button
                  onClick={() => setSelectedProject(project)}
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-800 border border-zinc-800 group-hover:border-pink-500/40 text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md group-hover:shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer active:scale-98"
                >
                  <span>Lihat Detail Proyek</span>
                  <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 text-pink-400">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🚀 MODAL DETAIL PROYEK DENGAN REACT PORTAL & TOUCH SCROLL LOCK */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn touch-none overscroll-contain cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-hidden max-h-[90vh] overflow-y-auto modal-content cursor-default touch-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* TOMBOL CLOSE SILANG (X) */}
              <button
                onClick={() => setSelectedProject(null)}
                type="button"
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer group/closeBtn"
                title="Tutup Modal"
                aria-label="Tutup Detail Proyek"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 group-hover/closeBtn:scale-110 group-hover/closeBtn:text-pink-400 transition-transform duration-200"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header Modal */}
              <div className="mb-6 pr-12 relative z-10">
                <span className="text-xs sm:text-sm font-mono text-pink-400 font-semibold uppercase tracking-wider">
                  {selectedProject.category} — {selectedProject.period}
                </span>
                {/* 🟢 Judul Modal HP dinaikkan ke text-xl sm:text-2xl */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                  {selectedProject.title}
                </h3>
                {/* 🟢 Subtitle Modal HP dinaikkan ke text-sm sm:text-base */}
                <p className="text-sm sm:text-base font-semibold text-pink-400/90 mt-1.5">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* 🟢 Deskripsi Lengkap Modal HP dinaikkan ke text-sm sm:text-base */}
              <div className="mb-6 space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed relative z-10">
                <p>{selectedProject.description}</p>
              </div>

              {/* Poin-Poin Utama / Highlights */}
              <div className="mb-6 relative z-10">
                <h4 className="text-xs sm:text-sm font-mono uppercase text-zinc-400 tracking-wider mb-3 font-semibold">
                  Sorotan Utama & Fitur:
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    /* 🟢 List Highlights HP dinaikkan ke text-sm sm:text-base */
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed"
                    >
                      <span className="text-pink-400 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack List */}
              <div className="mb-8 relative z-10">
                <h4 className="text-xs sm:text-sm font-mono uppercase text-zinc-400 tracking-wider mb-3 font-semibold">
                  Teknologi yang Digunakan:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-medium text-pink-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Modal Action Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80 relative z-10 flex-wrap">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-pink-500/40 text-xs sm:text-sm font-semibold text-white transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Halaman Akses</span>
                    <span>↗</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-xs sm:text-sm font-semibold text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}

                {/* Tombol Tutup Cadangan */}
                <button
                  onClick={() => setSelectedProject(null)}
                  type="button"
                  className="ml-auto py-2.5 px-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/40 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Keyframe Animations & Modal Styling */}
      <style>{`
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

        .modal-content::-webkit-scrollbar {
          width: 5px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #09090b;
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #ec4899;
        }
      `}</style>
    </section>
  );
};

export default Projects;