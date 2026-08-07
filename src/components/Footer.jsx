import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram as Instagram, FiMail as Mail, FiPhone as Phone, FiMessageCircle as MessageCircle } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo interactive">
              <img src="/assets/logo.png" alt="GLOMILONE Logo" className="logo-img" />
              <span className="logo-text">GLOMILONE</span>
            </Link>
            <p className="footer-desc mt-4">
              One Glowing Milestone. A purpose-centered podcast and movement by The Creative Icon, reaching Nigeria and beyond.
            </p>
            <div className="footer-tags mt-4">
              <span className="tag">#GLOMILONE</span>
              <span className="tag">#REDEFININGPURPOSE</span>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Connect & Listen</h4>
            <ul className="footer-list">
              <li>
                <a href="https://www.instagram.com/glomilone" target="_blank" rel="noreferrer" className="footer-link interactive">
                  <Instagram size={18} /> Instagram (@glomilone)
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/show/2zuePtTPcMfQ78eUol4Vhm" target="_blank" rel="noreferrer" className="footer-link interactive">
                  Spotify Podcast
                </a>
              </li>
              <li>
                <a href="https://linktr.ee/creative_icon" target="_blank" rel="noreferrer" className="footer-link interactive">
                  All Platforms (Linktree)
                </a>
              </li>
              <li>
                <a href="https://wa.link/a4pzom" target="_blank" rel="noreferrer" className="footer-link interactive">
                  <MessageCircle size={18} /> WhatsApp Community
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-list">
              <li>
                <a href="mailto:glomilonepodcast@gmail.com" className="footer-link interactive">
                  <Mail size={18} /> glomilonepodcast@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:09074552561" className="footer-link interactive">
                  <Phone size={18} /> 09074552561
                </a>
              </li>
              <li>
                <a href="tel:07041997492" className="footer-link interactive">
                  <Phone size={18} /> 07041997492
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GLOMILONE, The Creative Icon. All rights reserved.</p>
          <p className="footer-credit mt-2 text-muted">
            <a href="https://qorv.org" target="_blank" rel="noreferrer" className="footer-credit-link">Designed by QORV</a>
          </p>
        </div>
      </div>
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;
