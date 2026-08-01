import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="page"
      ref={containerRef}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="ambient-light green" style={{ top: '-10%', right: '-10%' }}></div>
        <div className="ambient-light pink" style={{ bottom: '10%', left: '-10%', animationDelay: '2s' }}></div>
        
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            style={{ y: y1, opacity: opacity1 }}
          >
            <motion.h1 
              className="heading-xl hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Awaken <span className="dot">•</span> Realign <span className="dot">•</span> Walk in <span className="text-gradient">Purpose</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A purpose-centered podcast-meets-community experience designed to awaken, realign, and amplify the God-given purpose in every life it touches.
            </motion.p>
            
            <motion.div 
              className="hero-actions"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="btn btn-primary interactive">
                <PlayCircle size={20} style={{ marginRight: '8px' }} />
                <span className="btn-text">Listen Now</span>
                <div className="btn-glow"></div>
              </a>
              <Link to="/about" className="btn-link interactive">
                Discover the Movement <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid glass-panel">
            {[
              { value: '1,000+', label: 'Community Members' },
              { value: '4,000+', label: 'Expected Listeners' },
              { value: '40+', label: 'Dedicated Team Members' },
              { value: '3–5', label: 'Months of Transformation' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3 className="stat-value text-gradient">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="teaser-section">
        <div className="container">
          <div className="teaser-grid">
            <motion.div 
              className="teaser-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-4">More Than a Podcast. <br/>It's a Movement.</h2>
              <p className="text-lg mb-6">
                Birthed by The Creative Icon, GLOMILONE exists to awaken a generation that has been silenced by delay, clouded by confusion, or simply never told that their life carries weight.
              </p>
              <p className="text-lg mb-6">
                Through an immersive blend of community, audio storytelling, and purposeful content, GLOMILONE walks with you — from the moment of awakening all the way into bold, intentional living.
              </p>
              <Link to="/about" className="btn btn-outline interactive">
                <span className="btn-text">Read Our Mission</span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="teaser-image-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="image-card">
                <img src="/assets/The CreativeIcon.png" alt="The Creative Icon" className="teaser-img" />
                <div className="image-overlay"></div>
                <div className="image-caption">
                  <h4>The Creative Icon</h4>
                  <p>Lead Steward</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="audience-section">
        <div className="ambient-light" style={{ top: '20%', left: '20%' }}></div>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle">💎 Who It's For</span>
            <h2 className="heading-lg mt-2">No One Is Left Behind<br/>in the Pursuit of Purpose.</h2>
          </motion.div>

          <div className="audience-cards mt-12">
            {[
              {
                num: '01',
                title: 'Drained in Delay',
                desc: 'People who feel they\'ve wasted their prime and no longer see themselves as worthy of purpose. They carry regret and need healing, hope, and reactivation.'
              },
              {
                num: '02',
                title: 'In the Fog of Self',
                desc: 'People who have never been exposed to the idea of purpose. They aren\'t resistant — they\'re simply unaware. GLOMILONE is their awakening.'
              },
              {
                num: '03',
                title: 'The Purpose Driven',
                desc: 'People already walking in purpose, seeking deeper clarity, alignment, and community. They need to be amplified, sharpened, and aligned for greater impact.'
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                className="audience-card glass-panel interactive"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="card-num">{card.num}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <div className="card-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle">Voices Changed</span>
            <h2 className="heading-lg mt-2">Lives Already Glowing</h2>
          </motion.div>
        </div>

        <div className="testimonials-carousel-wrapper mt-12">
          <div className="testimonials-carousel">
            {[
              {
                name: "Victor Olubodun",
                text: "I was opportuned to listen to some of your podcasts on Spotify, especially the Time Management series, and I must say it really helped me. I just finished listening to the Glomilone podcast by Director Bim, and I learned so much from it. Thank you so much for coming up with these amazing free tips."
              },
              {
                name: "One of One 🤭",
                text: "I've found what my tool is. Yesterday, while I was listening to the podcast, I didn't know. I actually wanted it to be my voice, but it wasn't. It was something I used to find really annoying because nobody around me really had it, and it made me feel alien. Well, I know better now, and I'm going to use it to the maximum."
              },
              {
                name: "Omolola Asalewa",
                text: "Whoosh! 🤩🔥 The podcast is fire. I just finished listening to it. I'm enlightened. My purpose is to fulfill God's will. My assignment is how I fulfill it. I've been wondering about this purpose lately, and now I understand it better."
              },
              {
                name: "Oluwajomiloju",
                text: "I listened to your podcast, and fortunately, I was part of the GLOMILONE sessions. I felt the impact. I do preach about purpose and all, but I didn't understand it fully to this extent. After listening to the episodes, my perspective of things changed. I also held on to Director Bim's words, that while you are on the journey to finding your purpose, do the little things around you first."
              },
              {
                name: "Obumneme Christopher",
                text: "I listened to 'The Means Justifies the End' and 'When You Need Resources,' and I have been blessed beyond measure. When you said, 'One who died for something is greater than one who lived for nothing,' my life flashed before my eyes. I realized I had just been existing. When you said it is not just about praying but about living for God, I felt a surge of hope welling up inside me."
              },
              {
                name: "Gifty",
                text: "When I listened to the podcast, almost all my questions were answered. Was it the illustration about the cook and the master that made it so easy to understand? Was it the stories you told? You really changed my perspective. You inspired me to always start with the little things."
              },
              {
                name: "Listener",
                text: "For you to keep talking like this means you've accepted who you are instead of trying to become someone else. Please keep talking like this. Just as you said, you'll truly get the attention of younger people."
              },
              {
                name: "God's Blessing",
                text: "This message came at the perfect time, and I know for sure God thought of me when He orchestrated it for you to teach about it. Yesterday, I had so many thoughts and questions, wondering why I still haven't received a clear answer about my purpose. I'm not even done listening yet, and you've already touched almost all the thoughts I had yesterday."
              },
              {
                name: "Mercy Nsima",
                text: "For the first time, I truly understood the meaning of calling, purpose, assignment, vision, gifts, and legacy... after many years on earth. 😂 Thank you, ma. Ever since then, I have been intentional about discovering my calling."
              },
              {
                name: "Nkomuwa Nicole",
                text: "Do you know you have a sweet voice? My God! ✨❤️ The sound... I'm resisting the urge to cry. No jokes. I'm trying to be serious. But I feel like crying. We never reach anywhere. Your voice feels like I'm receiving words directly from God. I'm taking action like mad."
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                className="testimonial-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="quote-mark">“</span>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author mt-6">
                  <h4 className="author-name">{testimonial.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
