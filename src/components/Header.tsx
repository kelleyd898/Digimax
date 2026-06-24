import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  const handleServicesClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                <span className="text-white font-mono text-xs font-bold">DM</span>
              </div>
              <span className="font-mono text-sm font-bold tracking-tight text-zinc-900">
                Digi-Maxia
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={link.href === '/#services' ? handleServicesClick : undefined}
                  className="font-mono text-[11px] uppercase tracking-widest text-zinc-600 hover:text-accent transition-colors duration-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/configure"
                className="font-mono text-[11px] uppercase tracking-widest bg-zinc-900 text-white px-4 py-2 hover:bg-accent transition-colors duration-0"
              >
                Book Now
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-2 text-zinc-500">
              <Phone className="w-3 h-3" />
              <span className="font-mono text-[11px]">(555) 123-4567</span>
            </div>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-zinc-900"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="section-padding pt-6">
              <div className="flex items-center justify-between mb-16">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
                  <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                    <span className="text-white font-mono text-xs font-bold">D2</span>
                  </div>
                  <span className="font-mono text-sm font-bold tracking-tight">Digi-Maxia</span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-zinc-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => {
                        setIsMobileOpen(false);
                        if (link.href === '/#services' && isHome) {
                          setTimeout(() => {
                            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className="font-sans text-3xl font-black tracking-tighter text-zinc-900 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/configure"
                    className="inline-block font-mono text-sm uppercase tracking-widest bg-zinc-900 text-white px-6 py-3 mt-4"
                  >
                    Book Configuration Session
                  </Link>
                </motion.div>
              </nav>

              <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between text-zinc-400 font-mono text-[10px] uppercase tracking-widest">
                <span>Licensed & Insured</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  (555) 123-4567
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
