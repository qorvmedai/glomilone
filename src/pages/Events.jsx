import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import usePublicContent from '../hooks/usePublicContent';
import './Events.css';

const defaultEventsContent = {
  hero: {
    subtitle: 'Upcoming Events',
    title: 'Gather in Purpose',
    description: 'Step out of isolation and join the movement live.',
  },
  eventsList: [
    {
      title: 'Awaken The Icon Within',
      description: 'Join The Creative Icon and Director Bim for an immersive 3-day experience designed to pull you out of delay and into your designated purpose. Expect deep teachings, interactive community sessions, and a clear roadmap for your next phase.',
      date: 'November 12 - 14, 2026',
      time: '6:00 PM (WAT)',
      location: 'Online / GLOMILONE Community Platform',
      image: '/assets/team-1.jpg',
      registerLink: 'https://wa.link/a4pzom',
      isActive: true,
    },
  ],
};

const Events = () => {
  const { content } = usePublicContent('events', defaultEventsContent);

  const hero = content?.hero || defaultEventsContent.hero;
  
  // Support both new eventsList array and legacy currentEvent single object
  let rawEvents = content?.eventsList;
  if (!rawEvents && content?.currentEvent) {
    rawEvents = [content.currentEvent];
  }
  const eventsList = (rawEvents && rawEvents.length > 0) ? rawEvents : defaultEventsContent.eventsList;
  const activeEvents = eventsList.filter((ev) => ev.isActive !== false);

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
            className="text-lg mt-4 max-w-2xl mx-auto text-muted"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      <section className="featured-event-section mt-12">
        <div className="container">
          {activeEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {activeEvents.map((eventItem, index) => (
                <motion.div 
                  key={index}
                  className="featured-event-card glass-panel"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  <div className="event-grid">
                    <div className="event-image-wrapper">
                      <div className="event-flyer-placeholder">
                        <img src={eventItem.image || '/assets/team-1.jpg'} alt={eventItem.title} className="event-flyer" />
                      </div>
                    </div>
                    
                    <div className="event-details">
                      <span className="live-badge">{index === 0 ? 'Next Event' : 'Upcoming Gathering'}</span>
                      <h2 className="heading-lg mt-4">{eventItem.title}</h2>
                      <p className="text-lg text-muted mt-4">
                        {eventItem.description}
                      </p>
                      
                      <div className="event-meta mt-8">
                        {eventItem.date && (
                          <div className="meta-item">
                            <Calendar size={20} className="meta-icon" />
                            <span>{eventItem.date}</span>
                          </div>
                        )}
                        {eventItem.time && (
                          <div className="meta-item">
                            <Clock size={20} className="meta-icon" />
                            <span>{eventItem.time}</span>
                          </div>
                        )}
                        {eventItem.location && (
                          <div className="meta-item">
                            <MapPin size={20} className="meta-icon" />
                            <span>{eventItem.location}</span>
                          </div>
                        )}
                      </div>

                      {eventItem.registerLink && (
                        <div className="mt-8">
                          <a href={eventItem.registerLink} target="_blank" rel="noreferrer" className="btn btn-primary interactive w-full md-w-auto">
                            <span className="btn-text">Register Now</span>
                            <div className="btn-glow"></div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
