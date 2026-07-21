import React, { useState } from 'react';

// Types Definition
type TabType = 'story' | 'skills' | 'education';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend / Tools';
  level: number; // Percentage
  icon: string;
}

interface Metric {
  label: string;
  value: string;
  description: string;
}

const skillsData: Skill[] = [
  { name: 'React.js', category: 'Frontend', level: 90, icon: '⚛️' },
  { name: 'TypeScript', category: 'Frontend', level: 85, icon: '📘' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 92, icon: '🎨' },
  { name: 'Next.js', category: 'Frontend', level: 80, icon: '▲' },
  { name: 'Git & GitHub', category: 'Backend / Tools', level: 88, icon: '📦' },
  { name: 'REST APIs', category: 'Backend / Tools', level: 85, icon: '⚡' },
];

const metricsData: Metric[] = [
  { label: 'Fokus Utama', value: 'Front-End', description: 'React, TSX & Tailwind CSS' },
  { label: 'Komitmen Kode', value: 'Clean Code', description: 'Standardisasi & Performa Tinggi' },
  { label: 'Responsif', value: '100%', description: 'Optimasi Semua Ukuran Layar' },
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('story');

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-black text-white overflow-hidden font-sans border-t border-zinc-900"
    >
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* SECTION HEADER (DISAMAKAN DENGAN EXPERIENCE.TSX) */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/30 text-xs font-semibold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span>Tentang Saya</span>
          </div>

          {/* Judul Utama dengan Neon Glow & Underline Effect */}
          <div className="relative group cursor-default">
            {/* Glow Backlight dibelakang Judul */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Dedikasi Dalam Setiap <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Baris Kode & Antarmuka
                {/* Underline Gradient Effect */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Profile Card (Bento Item 1) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-500 pointer-events-none" />

              {/* Header Profile Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-pink-500/30 flex items-center justify-center text-2xl font-bold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                  ZA
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Zainab Aqilah</h3>
                  <p className="text-xs text-zinc-400 font-medium">Front-End Developer</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Seorang Web Developer yang berdedikasi membangun aplikasi web modern, efisien, dan estetis. Mengombinasikan kemampuan teknis logika pemrograman dengan perhatian tinggi pada aspek visual UI/UX.
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 gap-3 pt-4 border-t border-zinc-800/80">
                {metricsData.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                    <div>
                      <p className="text-xs text-zinc-500">{metric.label}</p>
                      <p className="text-xs font-medium text-zinc-300">{metric.description}</p>
                    </div>
                    <span className="text-sm font-bold text-pink-400">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Tabs Content (Bento Item 2) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* TAB NAVIGATION SWITCHER */}
            <div className="flex items-center gap-2 p-1.5 bg-zinc-900 rounded-xl border border-zinc-800/80 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('story')}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'story'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Cerita Singkat
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'skills'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tech Stack
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'education'
                    ? 'bg-zinc-800 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pendidikan
              </button>
            </div>

            {/* TAB CONTENT 1: STORY */}
            {activeTab === 'story' && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">✦</span> Perjalanan & Passion Saya
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Perjalanan saya di dunia pengembangan web didasari oleh ketertarikan mendalam terhadap bagaimana teknologi dan desain dapat berpadu. Saya berfokus menggunakan ekosistem **React** dan **TypeScript** untuk menciptakan komponen yang efisien, mudah dikembangkan, dan memiliki tipe data yang aman.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Selain menulis kode antarmuka, saya aktif melakukan riset dan pengerjaan proyek berbasis data, memastikan aplikasi tidak hanya terlihat menawan namun juga memiliki dasar performa dan arsitektur yang kokoh.
                </p>
              </div>
            )}

            {/* TAB CONTENT 2: SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-5 animate-fadeIn">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <span className="text-pink-400">✦</span> Kemampuan & Teknologi
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-pink-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-6 animate-fadeIn">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">✦</span> Riwayat Akademis
                </h4>
                <div className="relative border-l border-zinc-800 pl-6 space-y-6">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                    <span className="text-[11px] font-mono text-pink-400">Mahasiswa / Undergraduate Student</span>
                    <h5 className="text-sm font-bold text-white mt-1">S1 Ilmu Komputer / Teknik Informatika</h5>
                    <p className="text-xs text-zinc-400 mt-1">
                      Berfokus pada pengembangan aplikasi web, analisis data, dan penyelesaian tugas akhir skripsi terkait pemodelan komputasi.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;