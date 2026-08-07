import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  RiHomeLine,
  RiInformationLine,
  RiMicLine,
  RiTeamLine,
  RiCalendarEventLine,
  RiArrowRightLine,
  RiEditLine,
  RiFileListLine,
  RiCloudLine,
  RiShieldCheckLine,
  RiTimeLine,
} from 'react-icons/ri';
import '../admin.css';

const PAGES = [
  {
    id: 'home',
    title: 'Home Page',
    description: 'Hero headline, subtitle, CTA button text, Spotify link, stats counter, about teaser, audience cards, and testimonials.',
    icon: <RiHomeLine />,
    badge: 'Main',
  },
  {
    id: 'about',
    title: 'The Movement',
    description: 'Mission statement, story body copy, pillar cards, vision text, and profile images.',
    icon: <RiInformationLine />,
    badge: 'About',
  },
  {
    id: 'podcast',
    title: 'Podcast',
    description: 'Page headline, episode descriptions, featured banner image, and Spotify embed links.',
    icon: <RiMicLine />,
    badge: 'Media',
  },
  {
    id: 'team',
    title: 'The Team',
    description: 'Leadership bios, team member names, roles, photos, and section introduction text.',
    icon: <RiTeamLine />,
    badge: 'People',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Event titles, dates, locations, ticket links, descriptions, and header images.',
    icon: <RiCalendarEventLine />,
    badge: 'Schedule',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  const getUserGreeting = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Administrator';
  };

  return (
    <div className="admin-dashboard-container">
      {/* Page header banner */}
      <div className="admin-page-header">
        <div className="admin-header-title-wrap">
          <RiEditLine className="admin-header-icon" />
          <div>
            <h1 className="admin-page-title">Welcome back, {getUserGreeting()}! 👋</h1>
            <p className="admin-page-subtitle">
              Manage your site content, images, and information in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-box blue">
            <RiFileListLine />
          </div>
          <div>
            <div className="admin-stat-value">5 Pages</div>
            <div className="admin-stat-label">Editable Sections</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-box cyan">
            <RiCloudLine />
          </div>
          <div>
            <div className="admin-stat-value">Live Sync</div>
            <div className="admin-stat-label">Firestore Connected</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-box purple">
            <RiShieldCheckLine />
          </div>
          <div>
            <div className="admin-stat-value">Encrypted</div>
            <div className="admin-stat-label">Role Protection</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-box pink">
            <RiTimeLine />
          </div>
          <div>
            <div className="admin-stat-value">Instant</div>
            <div className="admin-stat-label">Global Updates</div>
          </div>
        </div>
      </div>

      {/* Section divider label */}
      <div className="admin-section-label">
        <h2>Website Pages</h2>
        <span className="admin-section-sub">Select a section to edit its content</span>
      </div>

      {/* Cards grid */}
      <div className="admin-dashboard-grid">
        {PAGES.map((page) => (
          <div key={page.id} className="admin-page-card">
            <div className="admin-card-top">
              <div className="admin-card-icon">{page.icon}</div>
              <span className="admin-card-badge">{page.badge}</span>
            </div>
            <div className="admin-card-body">
              <h3 className="admin-card-title">{page.title}</h3>
              <p className="admin-card-desc">{page.description}</p>
            </div>
            <Link to={`/admin/edit/${page.id}`} className="admin-card-link">
              Edit Content <RiArrowRightLine />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
