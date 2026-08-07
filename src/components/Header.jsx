import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Movement', path: '/about' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'The Team', path: '/team' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo interactive">
          <img src="/assets/logo.png" alt="GLOMILONE Logo" className="logo-img" />
          <span className="logo-text">GLOMILONE</span>
        </Link>

        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-link interactive ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div layoutId="underline" className="active-indicator" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions desktop-only">
          <a href="https://wa.link/a4pzom" target="_blank" rel="noreferrer" className="btn btn-primary interactive">
            <span className="btn-text">Join Community</span>
            <div className="btn-glow"></div>
          </a>
        </div>

        <button 
          className="mobile-menu-btn interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu glass-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="mobile-nav-list">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link to={link.path} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1 }}
              >
                <a href="https://wa.link/a4pzom" target="_blank" rel="noreferrer" className="btn btn-primary w-full text-center mt-4">
                  Join Community
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
