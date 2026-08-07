import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiHeadphones, FiPlayCircle } from 'react-icons/fi';
import { FaSpotify, FaYoutube, FaApple, FaAmazon } from 'react-icons/fa';
import { SiAudiomack } from 'react-icons/si';
import './Podcast.css';

const Podcast = () => {
  const episodes = [
    { id: '1', title: 'GLOMILONE: The Origin', url: 'https://open.spotify.com/embed/episode/0ySJTuXuaIItBkJmRwBn0i?utm_source=generator&theme=0' },
    { id: '2', title: 'Time Management Series - Ep 2', url: 'https://open.spotify.com/embed/episode/4VAFBmn7NSXKUGB7RkfXus?utm_source=generator&theme=0' },
    { id: '3', title: 'Time Management Series - Ep 3', url: 'https://open.spotify.com/embed/episode/0a4d80RHrQFn5QSiBGCYOD?utm_source=generator&theme=0' },
    { id: '4', title: 'Time Management Series - Ep 4', url: 'https://open.spotify.com/embed/episode/4XJNg2mumT6cWVOXh5cRr4?utm_source=generator&theme=0' },
    { id: '5', title: 'Time Management Series - Ep 5', url: 'https://open.spotify.com/embed/episode/2N4iMHrVJ6Gpk76cpMQHDf?utm_source=generator&theme=0' },
    { id: '6', title: 'Death is a Reward', url: 'https://open.spotify.com/embed/episode/4GbWiRZB5sVZOmRGj0ND0D?utm_source=generator&theme=0' }
  ];

  const platforms = [
    { name: 'Spotify', icon: <FaSpotify size={20} color="#1DB954" />, url: 'https://open.spotify.com/show/2zuePtTPcMfQ78eUol4Vhm' },
    { name: 'YouTube', icon: <FaYoutube size={20} color="#FF0000" />, url: 'https://linktr.ee/creative_icon' },
    { name: 'Apple Podcasts', icon: <FaApple size={20} color="#FA57C1" />, url: 'https://linktr.ee/creative_icon' },
    { name: 'Amazon Music', icon: <FaAmazon size={20} color="#FF9900" />, url: 'https://linktr.ee/creative_icon' },
    { name: 'Audiomack', icon: <SiAudiomack size={20} color="#FFA200" />, url: 'https://linktr.ee/creative_icon' },
    { name: 'Linktree (All Hubs)', icon: <FiExternalLink size={20} color="#39E09B" />, url: 'https://linktr.ee/creative_icon' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
      style={{ paddingBottom: '8rem' }}
    >
      {/* Podcast Hero */}
      <section className="podcast-hero text-center">
        <div className="ambient-light pink" style={{ top: '20%', left: '30%' }}></div>
        <div className="container">
          <motion.p 
            className="subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Audio Storytelling & Purpose
          </motion.p>
          <motion.h1 
            className="heading-xl mt-2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Tune In to <span className="text-gradient">GLOMILONE</span>
          </motion.h1>
          <motion.p 
            className="text-lg mt-4 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From <em style={{ color: 'var(--color-accent-green)' }}>"GLOMILONE: The Origin"</em> to <em style={{ color: 'var(--color-accent-pink)' }}>"Death is a Reward"</em>, stream every episode on Spotify or your favorite platform.
          </motion.p>

          {/* Platform Streaming Hub */}
          <motion.div 
            className="platform-hub mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="platform-hub-title mb-4">Listen on your preferred platform:</p>
            <div className="platform-badges">
              {platforms.map((p, idx) => (
                <a 
                  key={idx} 
                  href={p.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="platform-badge glass-panel interactive"
                >
                  <span className="platform-icon">{p.icon}</span>
                  <span className="platform-name">{p.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Ordered Episode Cards */}
      <section className="podcast-episodes mt-8">
        <div className="container">
          <div className="section-header text-center mb-8">
            <h2 className="heading-md">Official Episode Catalog</h2>
            <p className="text-muted">Listen in chronological order from Episode 1 ("GLOMILONE: The Origin") to Episode 6 ("Death is a Reward").</p>
          </div>
          <div className="episodes-grid">
            {episodes.map((ep, i) => (
              <motion.div 
                key={ep.id}
                className="episode-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="episode-badge mb-2">Episode {ep.id}</div>
                <iframe 
                  title={`GLOMILONE Podcast Episode ${ep.id}: ${ep.title}`} 
                  src={ep.url} 
                  width="100%" 
                  height="152" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy" 
                  style={{ borderRadius: '12px', border: 'none' }}
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotify Show Directory */}
      <section className="spotify-show-section mt-16">
        <div className="container">
          <motion.div 
            className="spotify-show-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="show-header mb-4">
              <span className="show-tag">
                <FiHeadphones className="mr-2" style={{ display: 'inline' }} /> Complete Spotify Directory
              </span>
              <h2 className="heading-md mt-2">Stream Directly on Spotify</h2>
              <p className="text-muted mt-1">Browse the live Spotify channel player below.</p>
            </div>
            <iframe 
              title="GLOMILONE Podcast Full Show" 
              src="https://open.spotify.com/embed/show/2zuePtTPcMfQ78eUol4Vhm?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy" 
              style={{ borderRadius: '16px', border: 'none' }}
            ></iframe>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Podcast;
