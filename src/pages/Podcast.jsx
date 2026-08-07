import React from 'react';
import { motion } from 'framer-motion';
import usePublicContent from '../hooks/usePublicContent';
import './Podcast.css';

const defaultPodcastContent = {
  hero: {
    subtitle: 'Episodes on Spotify',
    title: 'Tune In to Purpose',
    description: 'Immerse yourself in purposeful content designed to heal, realign, and reactivate you.',
  },
  episodes: [
    { id: '1', url: 'https://open.spotify.com/embed/episode/0ySJTuXuaIItBkJmRwBn0i?utm_source=generator&theme=0' },
    { id: '2', url: 'https://open.spotify.com/embed/episode/4VAFBmn7NSXKUGB7RkfXus?utm_source=generator&theme=0' },
    { id: '3', url: 'https://open.spotify.com/embed/episode/0a4d80RHrQFn5QSiBGCYOD?utm_source=generator&theme=0' },
    { id: '4', url: 'https://open.spotify.com/embed/episode/4XJNg2mumT6cWVOXh5cRr4?utm_source=generator&theme=0' },
    { id: '5', url: 'https://open.spotify.com/embed/episode/2N4iMHrVJ6Gpk76cpMQHDf?utm_source=generator&theme=0' },
    { id: '6', url: 'https://open.spotify.com/embed/episode/4GbWiRZB5sVZOmRGj0ND0D?utm_source=generator&theme=0' },
  ],
};

const Podcast = () => {
  const { content } = usePublicContent('podcast', defaultPodcastContent);

  const hero = content?.hero || defaultPodcastContent.hero;
  const episodes = content?.episodes || defaultPodcastContent.episodes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
      style={{ paddingBottom: '8rem' }}
    >
      <section className="podcast-hero text-center">
        <div className="ambient-light pink" style={{ top: '30%', left: '30%' }}></div>
        <div className="container">
          <motion.p 
            className="subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.h1 
            className="heading-xl mt-2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            className="text-lg mt-4 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      <section className="podcast-episodes">
        <div className="container">
          <div className="episodes-grid mt-12">
            {episodes.map((ep, i) => (
              <motion.div 
                key={ep.id || i}
                className="episode-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <iframe 
                  title={`GLOMILONE Podcast Episode ${ep.id || i + 1}`} 
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
    </motion.div>
  );
};

export default Podcast;
