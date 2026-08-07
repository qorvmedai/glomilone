import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
  const teamMembers = [
    { name: 'Abdulfatah Komolafe', role: 'Team Member', image: '/assets/Abdulfatah Komolafe.jpeg' },
    { name: 'Beauty Tiana', role: 'Team Member', image: '/assets/Beauty Tiana.JPG' },
    { name: 'Chisom Ogadi', role: 'Team Member', image: '/assets/Chisom Ogadi.jpg' },
    { name: 'Dárasími Daniel', role: 'Team Member', image: '/assets/Dárasími Daniel .png' },
    { name: 'Gifted Timpaul', role: 'Team Member', image: '/assets/Gifted Timpaul .jpg' },
    { name: 'Happiness Adesuyi', role: 'Team Member', image: '/assets/Happiness Adesuyi .jpg' },
    { name: 'Olanlokun Goodness O.', role: 'Team Member', image: '/assets/Olanlokun Goodness O..jpg' },
    { name: 'The Hermosa Aura', role: 'Team Member', image: '/assets/The Hermosa Aura.jpg' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
    >
      <section className="team-hero">
        <div className="ambient-light green" style={{ top: '20%', left: '10%' }}></div>
        <div className="container">
          <motion.div 
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-gradient">The People Behind It</h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Dedicated stewards and visionaries ensuring that no one is left behind in the pursuit of purpose.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="leaders-section">
        <div className="container">
          <div className="leaders-grid">
            <motion.div 
              className="leader-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="leader-image-wrapper">
                <img src="/assets/The CreativeIcon.png" alt="The Creative Icon" className="leader-img" />
                <div className="leader-overlay"></div>
              </div>
              <div className="leader-info glass-panel">
                <h3 className="heading-md">The Creative Icon</h3>
                <p className="text-gradient font-bold mt-2">Founder</p>
                <p className="text-muted mt-4">
                  The visionary behind GLOMILONE, guiding a generation out of the fog of self and into clarity.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="leader-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="leader-image-wrapper">
                <img src="/assets/Director Bim .jpg" alt="Director Bim" className="leader-img" />
                <div className="leader-overlay"></div>
              </div>
              <div className="leader-info glass-panel">
                <h3 className="heading-md">Director Bim</h3>
                <p className="text-gradient font-bold mt-2">Co-Founder</p>
                <p className="text-muted mt-4">
                  Abimbola Oduwole, amplifying the movement and teaching practical steps to purpose execution.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="team-grid-section">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg">Dedicated Team Members</h2>
          </motion.div>
          
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i}
                className="team-member-card interactive"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="member-image-container">
                  <img src={member.image} alt={member.name} className="member-img" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Team;
