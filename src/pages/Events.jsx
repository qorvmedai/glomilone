import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import './Events.css';

const Events = () => {
  // Update this single object to change the featured event
  const currentEvent = {
    title: "Awaken The Icon Within",
    description: "Join The Creative Icon and Director Bim for an immersive 3-day experience designed to pull you out of delay and into your designated purpose. Expect deep teachings, interactive community sessions, and a clear roadmap for your next phase.",
    date: "November 12 - 14, 2026",
    time: "6:00 PM (WAT)",
    location: "Online / GLOMILONE Community Platform",
    image: "/assets/team-1.jpg", // Placeholder image, replace with actual flyer
    registerLink: "https://wa.link/a4pzom",
    isActive: true 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
      style={{ paddingBottom: '8rem' }}
    >
      <section className="events-hero text-center">
        <div className="ambient-light cyan" style={{ top: '20%', left: '40%' }}></div>
        <div className="container">
          <motion.p 
            className="subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Upcoming Events
          </motion.p>
          <motion.h1 
            className="heading-xl mt-2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Gather in <span className="text-gradient">Purpose</span>
          </motion.h1>
          <motion.p 
            className="text-lg mt-4 max-w-2xl mx-auto text-muted"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Step out of isolation and join the movement live.
          </motion.p>
        </div>
      </section>

      <section className="featured-event-section mt-12">
        <div className="container">
          {currentEvent.isActive ? (
            <motion.div 
              className="featured-event-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="event-grid">
                <div className="event-image-wrapper">
                  {/* Using a placeholder gradient if no flyer is available, or an image tag */}
                  <div className="event-flyer-placeholder">
                    <img src={currentEvent.image} alt={currentEvent.title} className="event-flyer" />
                  </div>
                </div>
                
                <div className="event-details">
                  <span className="live-badge">Next Event</span>
                  <h2 className="heading-lg mt-4">{currentEvent.title}</h2>
                  <p className="text-lg text-muted mt-4">
                    {currentEvent.description}
                  </p>
                  
                  <div className="event-meta mt-8">
                    <div className="meta-item">
                      <Calendar size={20} className="meta-icon" />
                      <span>{currentEvent.date}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={20} className="meta-icon" />
                      <span>{currentEvent.time}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={20} className="meta-icon" />
                      <span>{currentEvent.location}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a href={currentEvent.registerLink} target="_blank" rel="noreferrer" className="btn btn-primary interactive w-full md-w-auto">
                      <span className="btn-text">Register Now</span>
                      <div className="btn-glow"></div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="no-events text-center glass-panel p-12">
              <h3 className="heading-md">No Upcoming Events</h3>
              <p className="text-lg text-muted mt-4">We are currently preparing for our next gathering. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Events;
