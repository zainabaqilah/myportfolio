import React, { useState, useEffect, useRef } from 'react';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('Home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 1. Ref untuk mengunci handleScroll saat user mengeklik menu secara manual
  const isManualScroll = useRef<boolean>(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hitung progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (currentScrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      }

      // 2. JIKA SEDANG MANUAL SCROLL (KLIK MENU), BAIAPAKAN DETEKSI SCROLL OTOMATIS
      if (isManualScroll.current) return;

      // Cek apakah scroll sudah berada di paling bawah halaman (Deteksi Contact)
      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('Contact');
        return;
      }

      // Hitung posisi section
      const scrollPosition = currentScrollY + 180;
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Helper klik navigasi yang langsung mengunci activeSection tanpa interupsi
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    e.preventDefault();
    
    // Kunci langsung activeSection saat diklik
    setActiveSection(name);
    setIsOpen(false);
    isManualScroll.current = true;

    // Bersihkan timeout sebelumnya jika ada
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // Scroll mulus ke elemen target
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Lepas kunci manual scroll setelah animasi smooth scroll selesai (~800ms)
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-4 px-4 md:px-8">
      {/* MAIN CONTAINER NAVBAR */}
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3 border ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border-pink-500/20 shadow-2xl shadow-pink-500/5'
            : 'bg-zinc-950/80 backdrop-blur-md border-zinc-800/80'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* 1. BRAND LOGO */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'Home', '#home')}
            className="flex items-center gap-2 text-base font-bold tracking-wide text-white group cursor-pointer"
          >
            <span className="font-mono uppercase tracking-widest text-sm text-zinc-100 group-hover:text-pink-400 transition-colors">
              Portfolio
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
          </a>

          {/* 2. DESKTOP NAVIGATION MENU */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
            <ul className="flex items-center gap-1">
              {navLinks
                .filter((link) => link.name !== 'Contact')
                .map((link) => {
                  const isActive = activeSection === link.name;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.name, link.href)}
                        className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                          isActive
                            ? 'text-white bg-zinc-800 border-pink-500/40 shadow-sm'
                            : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/60 hover:border-zinc-700/80'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                        )}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>

          {/* 3. CTA BUTTON DESKTOP (CONTACT) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 hover:opacity-95 transition-all duration-200 cursor-pointer ${
                activeSection === 'Contact' ? 'ring-2 ring-pink-400 ring-offset-2 ring-offset-black' : ''
              }`}
            >
              <span>Contact</span>
              {activeSection === 'Contact' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              )}
            </a>
          </div>

          {/* 4. MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none transition-colors cursor-pointer"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5 text-pink-400' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5 text-pink-400' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* 5. MOBILE MENU DROPDOWN */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-72 opacity-100 pt-4 mt-3 border-t border-zinc-800' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-2 pb-1">
            {navLinks
              .filter((link) => link.name !== 'Contact')
              .map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.name, link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-white bg-zinc-800 border-pink-500/40'
                          : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/40 hover:border-zinc-800'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                      )}
                    </a>
                  </li>
                );
              })}

            <li className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 cursor-pointer"
              >
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* SCROLL PROGRESS INDICATOR */}
      {scrolled && (
        <div className="max-w-6xl mx-auto px-2 mt-1">
          <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;