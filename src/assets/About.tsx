import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Types Definition
type TabType = 'skills' | 'education' | 'certification';
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend / Tools' | 'Data Science';
  level: SkillLevel;
  icon: string;
}

interface Metric {
  label: string;
  value: string;
  description: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  fileUrl: string;
  isPdf?: boolean;
}

const skillsData: Skill[] = [
  { name: 'Python & Data Analysis', category: 'Data Science', level: 'Intermediate', icon: '🐍' },
  { name: 'Forecast & Time Series Analysis', category: 'Data Science', level: 'Advanced', icon: '⏳' },
  { name: 'SQL', category: 'Data Science', level: 'Intermediate', icon: '🛢️' },
  { name: 'Statistics', category: 'Data Science', level: 'Advanced', icon: '📊' },
  { name: 'Machine Learning', category: 'Data Science', level: 'Intermediate', icon: '🤖' },
  { name: 'Microsoft Excel', category: 'Data Science', level: 'Advanced', icon: '📈' },
  { name: 'React.js', category: 'Frontend', level: 'Intermediate', icon: '⚛️' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', icon: '🎨' },
  { name: 'GitHub', category: 'Backend / Tools', level: 'Intermediate', icon: '📦' },
  { name: 'Team work & Communication', category: 'Backend / Tools', level: 'Advanced', icon: '🤝' },
];

const certificationsData: Certification[] = [
  {
    id: 'cert-1',
    title: 'Junior Web Developer',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    year: '2024',
    description:
      'Pelatihan dan sertifikasi kompetensi Junior Programmer BNSP yang membekali kemampuan dalam mengembangkan aplikasi menggunakan pemrograman terstruktur, mengimplementasikan antarmuka pengguna (UI), menyusun fungsi dan file program secara rapi, menulis kode sesuai standar dan best practices, menerapkan perintah eksekusi bahasa pemrograman, serta memanfaatkan library atau komponen yang telah tersedia untuk mendukung pengembangan perangkat lunak.',
    fileUrl: './certificates/sertifikat-jwd.jpeg',
    isPdf: false,
  },
  {
    id: 'cert-2',
    title: 'Introduction to HTML',
    issuer: 'Sololearn',
    year: '2024',
    description:
      'Mempelajari dasar-dasar HTML, struktur halaman web, elemen HTML, formulir, tabel, hyperlink, gambar, serta pembuatan halaman web sederhana.',
    fileUrl: './certificates/sertifikat-html.jpg',
    isPdf: false,
  },
  {
    id: 'cert-3',
    title: 'Java Foundation',
    issuer: 'Oracle Academy',
    year: '2023',
    description:
      'Mempelajari dasar-dasar pemrograman Java, termasuk sintaks dasar, variabel, percabangan, perulangan, metode, dan pemrograman berorientasi objek.',
    fileUrl: './certificates/sertifikat-java.pdf',
    isPdf: true,
  },
];

const metricsData: Metric[] = [];

// Helper untuk menghitung persentase bar berdasarkan level
const getLevelPercentage = (level: SkillLevel): string => {
  switch (level) {
    case 'Beginner':
      return '33%';
    case 'Intermediate':
      return '66%';
    case 'Advanced':
      return '100%';
    default:
      return '0%';
  }
};

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Dynamic Mouse Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // 🔒 Lock Scroll Total (Lock HTML & Body + Mencegah Bounce Scroll HP)
  useEffect(() => {
    if (selectedCert) {
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
  }, [selectedCert]);

  // 🧹 Auto Close jika Pindah Tab / Navigasi
  useEffect(() => {
    setSelectedCert(null);
  }, [activeTab]);

  useEffect(() => {
    const handleMouseChange = () => {
      if (selectedCert) setSelectedCert(null);
    };
    window.addEventListener('popstate', handleMouseChange);
    return () => window.removeEventListener('popstate', handleMouseChange);
  }, [selectedCert]);

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

  const starsData = useMemo(() => {
    const COUNT = 85;
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

  const checkIsPdf = (cert: Certification) => {
    if (cert.isPdf !== undefined) return cert.isPdf;
    return cert.fileUrl.toLowerCase().endsWith('.pdf');
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-12 md:py-16 text-white overflow-hidden font-sans border-t border-zinc-900/80"
      style={{ backgroundColor: '#020208' }}
    >
      {/* BACKGROUND EFFECTS */}
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
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs sm:text-sm font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Tentang Saya</span>
          </div>

          <div className="relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Belajar, Berkembang, <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Dan Terus Berkarya
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PROFILE CARD */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-pink-500/30 flex items-center justify-center text-2xl font-bold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)] shrink-0">
                  ZA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Zainab Aqilah</h3>
                  <p className="text-sm sm:text-base text-zinc-400 font-medium">Data Analysis</p>
                </div>
              </div>

              {/* 🟢 Teks Deskripsi HP Dinaikkan dari text-xs ke text-sm */}
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-normal mb-6">
                Fresh Graduate S1 Ilmu Komputer Universitas Lampung dengan ketertarikan pada bidang Ilmu Data, Analisis Data, Statistika, dan Machine Learning. Memiliki pengalaman PKL di Badan Pusat Statistik (BPS) serta sebagai asisten dosen Statistika, Basis Data, dan Matematika. Terbiasa mengolah data, melakukan analisis, serta mampu bekerja dalam tim, mudah beradaptasi dan belajar dengan cepat.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-4 border-t border-zinc-800/80">
                {metricsData.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                    <div>
                      <p className="text-xs sm:text-sm text-zinc-500">{metric.label}</p>
                      <p className="text-xs sm:text-sm font-medium text-zinc-300">{metric.description}</p>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-pink-400">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS CONTENT */}
          <div className="lg:col-span-7 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center gap-2 p-1.5 bg-zinc-900/90 rounded-xl border border-zinc-800/80 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 min-w-[110px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'skills'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white cursor-pointer'
                }`}
              >
                Keterampilan
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 min-w-[110px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'education'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white cursor-pointer'
                }`}
              >
                Pendidikan
              </button>
              <button
                onClick={() => setActiveTab('certification')}
                className={`flex-1 min-w-[110px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'certification'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white cursor-pointer'
                }`}
              >
                Sertifikasi
              </button>
            </div>

            {activeTab === 'skills' && (
              <div className="space-y-5 animate-fadeIn">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-3">
                  <span className="text-pink-400">✦</span> Kemampuan & Teknologi
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <div className="flex items-center justify-between mb-2">
                        {/* 🟢 Teks Nama Skill di HP dinaikkan ke text-sm */}
                        <span className="text-sm sm:text-base font-semibold text-zinc-200 flex items-center gap-2">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        {/* 🟢 Level Skill di HP dinaikkan ke text-xs */}
                        <span className="text-xs sm:text-sm font-mono text-pink-400 font-medium shrink-0 ml-2">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500"
                          style={{ width: getLevelPercentage(skill.level) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6 animate-fadeIn">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">✦</span> Riwayat Akademis
                </h4>
                <div className="relative border-l border-zinc-800 pl-6 space-y-6">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                    <span className="text-xs sm:text-sm font-mono text-pink-400 font-semibold">Fresh Graduate</span>
                    {/* 🟢 Judul Jurusan dinaikkan di HP */}
                    <h5 className="text-base sm:text-lg font-bold text-white mt-1">S1 Ilmu Komputer</h5>
                    {/* 🟢 Deskripsi IPK dinaikkan di HP */}
                    <p className="text-sm sm:text-base text-zinc-300 mt-1">
                      Universitas Lampung, IPK: 3.85.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certification' && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <span className="text-pink-400">✦</span> Lisensi & Sertifikasi
                </h4>
                <div className="space-y-4">
                  {certificationsData.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between gap-4 group"
                    >
                      <div>
                        {/* Judul + Tahun */}
                        <div className="flex items-start justify-between gap-3">
                          {/* 🟢 Judul Sertifikat di HP dinaikkan ke text-base */}
                          <h5 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-400 transition-colors leading-snug">
                            {cert.title}
                          </h5>
                          <span className="text-xs sm:text-sm font-mono text-pink-400 px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 shrink-0 font-medium">
                            {cert.year}
                          </span>
                        </div>

                        {/* Penerbit / Issuer */}
                        <p className="text-xs sm:text-sm font-bold text-pink-400/90 mt-1.5">
                          {cert.issuer}
                        </p>

                        {/* 🟢 Deskripsi Sertifikat di HP dinaikkan ke text-sm */}
                        <p className="text-sm sm:text-base text-zinc-300 mt-2.5 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      {/* Footer Sertifikat */}
                      <div className="pt-3.5 border-t border-zinc-800/60 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-mono text-zinc-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
                          Terverifikasi
                        </span>
                        
                        <button
                          onClick={() => setSelectedCert(cert)}
                          className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-pink-500/20 border border-zinc-800 hover:border-pink-500/50 text-xs sm:text-sm font-semibold text-pink-400 hover:text-pink-300 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          <span>Lihat Sertifikat</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🚀 MODAL DILINDUNGI PORTAL */}
      {selectedCert &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn touch-none overscroll-contain"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.2)] flex flex-col my-auto touch-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90 shrink-0">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-400 font-medium mt-0.5">
                    {selectedCert.issuer} — ({selectedCert.year})
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/40 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Tutup"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-2 sm:p-4 overflow-y-auto flex items-center justify-center bg-zinc-900/30 flex-1 min-h-[300px] relative">
                {checkIsPdf(selectedCert) ? (
                  <object
                    data={selectedCert.fileUrl}
                    type="application/pdf"
                    className="w-full h-[60vh] min-h-[350px] rounded-lg border border-zinc-800 bg-zinc-900"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <p className="text-xs sm:text-sm text-zinc-300 mb-4">
                        Browser kamu tidak mendukung pratinjau langsung PDF secara tertanam.
                      </p>
                      <a
                        href={selectedCert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 text-xs sm:text-sm font-semibold hover:bg-pink-500/30 transition-all"
                      >
                        Buka PDF di Tab Baru ↗
                      </a>
                    </div>
                  </object>
                ) : (
                  <img
                    src={selectedCert.fileUrl}
                    alt={selectedCert.title}
                    className="max-h-[65vh] w-auto object-contain rounded-lg border border-zinc-800 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallbackElem = document.getElementById('cert-fallback');
                      if (fallbackElem) fallbackElem.style.display = 'flex';
                    }}
                  />
                )}

                <div
                  id="cert-fallback"
                  className="hidden flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/90 max-w-md absolute inset-auto z-10"
                >
                  <span className="text-3xl mb-2">📂</span>
                  <p className="text-sm font-semibold text-zinc-300">
                    Berkas Sertifikat Tidak Ditemukan
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    Pastikan nama file di folder <code className="text-pink-400 font-mono">public/certificates/</code> adalah <code className="text-pink-400 font-mono">{selectedCert.fileUrl.replace('./certificates/', '')}</code>.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/90 text-xs sm:text-sm shrink-0">
                <p className="text-zinc-500 hidden sm:block">
                  Zainab Aqilah — Sertifikat
                </p>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <a
                    href={selectedCert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md shadow-pink-500/20 hover:opacity-95 transition-all text-center flex items-center gap-1.5"
                  >
                    <span>Buka Ukuran Penuh / Unduh</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

            </div>
          </div>,
          document.body
        )}

      {/* Keyframe Animations */}
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
      `}</style>
    </section>
  );
};

export default About;