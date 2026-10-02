import React from 'react';
import { motion } from 'framer-motion';
import usePublicContent from '../hooks/usePublicContent';
import './About.css';

const defaultContent = {
  hero: {
    heading: 'Our Foundation',
    subheading: 'We exist to awaken a generation to the knowledge of God as their Creator, reveal their God-given purpose, and empower them to walk boldly in it.',
  },
  missionVision: {
    missionTitle: 'Mission',
    missionText: "To awaken a generation to the knowledge of God as their Creator, reveal their God-given purpose, and empower them to walk boldly in it. Through intentional events and movement-driven expressions, we amplify purposeful living and accelerate the fulfillment of God's intent for this generation.",
    visionTitle: 'Vision',
    visionText: "To see a world where people live in full awareness of their divine purpose, aligned with God's will, and advancing His intentions with clarity and conviction.",
  },
  initiative: {
    subtitle: 'Structure & Format',
    heading: 'A 2-in-1 Initiative',
  },
  phases: [
    {
      number: '01',
      title: 'Phase One: The Event',
      desc: "The event phase takes place within a close-knit community platform where learning and training occur. It's a nurturing season, a space where people are welcomed, guided, and grounded until they transition into the next vital phase.",
    },
    {
      number: '02',
      title: 'Phase Two: The Movement',
      desc: "Designed to guide 4,600+ participants into action, helping them take practical steps based on the knowledge received during the event. Like a father holding a daughter's hand, leading from understanding into execution.",
    },
  ],
};

const About = () => {
  const { content } = usePublicContent('about', defaultContent);

  const hero = content.hero || defaultContent.hero;
  const missionVision = content.missionVision || defaultContent.missionVision;
  const initiative = content.initiative || defaultContent.initiative;
  const phases = (content.phases && content.phases.length > 0)
    ? content.phases
    : defaultContent.phases;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
    >
      <section className="about-hero">
        <div className="ambient-light pink" style={{ top: '10%', right: '10%' }}></div>
        <div className="container">
          <motion.div 
            className="about-hero-content text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl">{hero.heading}</h1>
            <p className="text-lg mt-6 mx-auto" style={{ maxWidth: '800px' }}>
              {hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-grid">
            <motion.div 
              className="mission-card glass-panel"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-md mb-4 text-gradient">{missionVision.missionTitle}</h2>
              <p className="text-lg">
                {missionVision.missionText}
              </p>
            </motion.div>
            
            <motion.div 
              className="mission-card glass-panel"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="heading-md mb-4 text-gradient">{missionVision.visionTitle}</h2>
              <p className="text-lg">
                {missionVision.visionText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="initiative-section">
        <div className="container">
          <motion.div 
            className="section-header text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle">{initiative.subtitle}</span>
            <h2 className="heading-lg mt-2">{initiative.heading}</h2>
          </motion.div>

          <div className="phases-container">
            {phases.map((phase, i) => (
              <motion.div 
                key={phase.number || i}
                className="phase-block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <div className="phase-number">{phase.number || `0${i + 1}`}</div>
                <div className="phase-content">
                  <h3 className="heading-md mb-2">{phase.title}</h3>
                  <p className="text-lg">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
