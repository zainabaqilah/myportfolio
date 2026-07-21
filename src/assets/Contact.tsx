import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const emailAddress = 'zainabb31864@gmail.com'; 
  const whatsappNumber = '6281234567890'; // Ganti dengan nomor WA format internasional (tanpa +)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    'Halo, ini Zainab Aqilah'
  );

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-black text-white overflow-hidden font-sans border-t border-zinc-900"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
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
                Mulai Kolaborasi Proyek
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full shadow-[0_0_10px_#ec4899]" />
              </span>{' '}
              <span className="inline-block text-pink-500 shadow-pink-500/50 hover:rotate-90 transition-transform duration-500">
                ✦
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2">
            Punya ide proyek, tawaran pekerjaan, atau pertanyaan? Silakan hubungi saya secara langsung melalui email atau WhatsApp.
          </p>
        </div>

        {/* GRID KARTU KONTAK (EMAIL & WHATSAPP) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* KARTU 1: EMAIL */}
          <div className="bg-zinc-950/90 border border-zinc-800 hover:border-pink-500/40 rounded-2xl p-8 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Icon Header */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-pink-500/40 flex items-center justify-center text-xl text-pink-400 mb-6 shadow-md transition-colors">
                ✉️
              </div>

              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                Email
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                Kirim Pesan Email
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Cocok untuk diskusi detail mengenai tawaran kerja, rincian proyek, atau dokumen formal.
              </p>

              {/* Box Alamat Email */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3 mb-6 font-mono text-xs text-zinc-300">
                <span className="truncate">{emailAddress}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80">
              <button
                onClick={handleCopyEmail}
                className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-200 text-center"
              >
                {copied ? '✓ Salin OK' : 'Salin Email'}
              </button>

              <a
                href={`mailto:${emailAddress}`}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs text-center shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <span>Buka Mail</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* KARTU 2: WHATSAPP */}
          <div className="bg-zinc-950/90 border border-zinc-800 hover:border-pink-500/40 rounded-2xl p-8 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Icon Header */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-pink-500/40 flex items-center justify-center text-xl text-pink-400 mb-6 shadow-md transition-colors">
                💬
              </div>

              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                Pesan Cepat / WhatsApp
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                Obrolan WhatsApp
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Respon lebih cepat untuk diskusi santai, konsultasi singkat, atau pertanyaan seputar kolaborasi.
              </p>

              {/* Status Box */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3 mb-6 font-mono text-xs text-zinc-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                  Fast Response Status
                </span>
                <span className="text-pink-400 font-semibold">Online</span>
              </div>
            </div>

            {/* Direct Link Button */}
            <div className="pt-4 border-t border-zinc-800/80">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Chat via WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

        {/* FOOTER SIMPLE BRANDING */}
        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Zainab Aqilah. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with React TSX & Tailwind CSS</span>
            <span className="text-pink-500">✦</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;