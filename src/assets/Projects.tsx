import React, { useState } from 'react';

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
    title: 'Intern Management Web',
    subtitle: 'Platform Manajemen Magang Terintegrasi',
    category: 'Web App',
    period: '2025',
    description:
      'Aplikasi web interaktif untuk mengelola alur kerja, tugas, dan rekapitulasi data mahasiswa magang secara efisien dengan manajemen state responsif dan arsitektur modular.',
    highlights: [
      'Integrasi autentikasi & manajemen role pengguna',
      'Antarmuka kustom berbasis React & Tailwind CSS',
      'Optimasi query & responsivitas penuh di semua perangkat',
    ],
    technologies: ['Laravel', 'React.js', 'Tailwind CSS', 'Git & GitHub'],
    status: 'Completed',
    githubUrl: 'https://github.com/zainabaqilah',
    featured: true,
  },
  {
    id: 2,
    title: 'Model Prediksi Banjir Bandar Lampung',
    subtitle: 'Riset Pemodelan Komputasi & Klasifikasi Data',
    category: 'Data & Research',
    period: '2025 - 2026',
    description:
      'Penelitian tugas akhir skripsi yang berfokus pada analisis data sekunder spasial/bencana untuk klasifikasi prediktif tingkat kerawanan banjir di wilayah Bandar Lampung.',
    highlights: [
      'Pembersihan & pemrosesan dataset biner seimbang (57 sampel data)',
      'Analisis statistik & evaluasi performa model klasifikasi',
      'Ekstraksi informasi dari data bencana sekunder (DIBI)',
    ],
    technologies: ['Python', 'Excel', 'Binary Classification', 'Data Science'],
    status: 'In Progress',
    featured: true,
  },
  {
    id: 3,
    title: 'Dark Luxury Interactive Portfolio',
    subtitle: 'Situs Portofolio Personal Berperforma Tinggi',
    category: 'Web App',
    period: '2026',
    description:
      'Portofolio pribadi bergaya Dark Luxury dengan efek 3D tilt, aksen pendaran neon pink, serta komponen glassmorphism yang dioptimalkan untuk pengalaman pengguna modern.',
    highlights: [
      'Komponen kustom TypeScript & React reusabel',
      'Desain responsif 100% dengan Tailwind CSS',
      'Animasi interaktif halus & performa memuat sangat cepat',
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'Completed',
    githubUrl: 'https://github.com/zainabaqilah',
    liveUrl: '#',
    featured: false,
  },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web App', 'Data & Research'];

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-black text-white overflow-hidden font-sans border-t border-zinc-900"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Karya & Eksplorasi</span>
          </div>

          {/* Judul Utama dengan Neon Glow */}
          <div className="relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Galeri Proyek & <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Hasil Riset Pilihan
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mt-2">
            Kumpulan aplikasi web dan penelitian komputasi berbasis data yang telah dikembangkan dengan komitmen penuh pada kualitas dan presisi.
          </p>
        </div>

        {/* FILTER CATEGORY BUTTONS */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                filter === cat
                  ? 'bg-zinc-800 text-white border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.2)]'
                  : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PROYEK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-pink-500/40 rounded-2xl p-7 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Background Glow Effect saat Hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header Card Status & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-pink-400 font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                          : 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
                      }`}
                    />
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* Judul & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-200 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-zinc-400 mt-1 mb-4">
                  {project.subtitle}
                </p>

                {/* Ringkasan Deskripsi */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-zinc-800/80">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-[11px] font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button Modal Detail */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-pink-500/30 text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Lihat Detail Proyek</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL DETAIL PROYEK */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Tombol Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>

            {/* Header Modal */}
            <div className="mb-6 pr-8">
              <span className="text-xs font-mono text-pink-400 font-semibold uppercase tracking-wider">
                {selectedProject.category} — {selectedProject.period}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-medium text-zinc-400 mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Deskripsi Lengkap */}
            <div className="mb-6 space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>{selectedProject.description}</p>
            </div>

            {/* Poin-Poin Utama / Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
                Sorotan Utama & Fitur:
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-zinc-300"
                  >
                    <span className="text-pink-400 mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack List */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
                Teknologi yang Digunakan:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-pink-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Modal Action Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-all duration-200 flex items-center gap-2"
                >
                  <span>GitHub Repo</span>
                  <span>↗</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-xs font-semibold text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-200 flex items-center gap-2"
                >
                  <span>Live Demo</span>
                  <span>↗</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="ml-auto py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;