import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  RiDashboardLine,
  RiHomeLine,
  RiInformationLine,
  RiMicLine,
  RiTeamLine,
  RiCalendarEventLine,
  RiExternalLinkLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
  RiShieldUserLine,
} from 'react-icons/ri';
import '../admin.css';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: <RiDashboardLine />, exact: true },
  { to: '/admin/edit/home', label: 'Home', icon: <RiHomeLine /> },
  { to: '/admin/edit/about', label: 'The Movement', icon: <RiInformationLine /> },
  { to: '/admin/edit/podcast', label: 'Podcast', icon: <RiMicLine /> },
  { to: '/admin/edit/team', label: 'The Team', icon: <RiTeamLine /> },
  { to: '/admin/edit/events', label: 'Events', icon: <RiCalendarEventLine /> },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Get user initial or display name
  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Admin';
  };

  const getInitials = () => {
    const nameStr = getUserName();
    return nameStr.substring(0, 2).toUpperCase();
  };

  return (
    <div className="admin-root">
      {/* ── TOPBAR ── */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <button
            className="admin-hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>
          <Link to="/admin" className="admin-logo">
            <img src="/assets/logo.png" alt="GLOMILONE" className="admin-logo-img" />
            <span className="admin-logo-text">GLOMILONE</span>
            <span className="admin-logo-badge">CMS</span>
          </Link>
        </div>

        <div className="admin-topbar-right">
          {/* User Profile Pill Badge */}
          {user && (
            <div className="admin-user-pill">
              <div className="admin-user-avatar">{getInitials()}</div>
              <div className="admin-user-info">
                <span className="admin-user-name">{getUserName()}</span>
                <span className="admin-user-email">{user.email}</span>
              </div>
            </div>
          )}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-site-link"
            title="Open public website in a new tab"
          >
            <RiExternalLinkLine />
            <span>View Site</span>
          </a>
        </div>
      </header>

      <div className="admin-layout-wrapper">
        {/* ── SIDEBAR ── */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <RiShieldUserLine className="admin-sidebar-badge-icon" />
            <span>Admin Control Panel</span>
          </div>

          <span className="admin-sidebar-label">Navigation</span>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeSidebar}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="admin-sidebar-divider" />
          <span className="admin-sidebar-label">Account</span>
          
          <div className="admin-sidebar-user-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem' }}>
            <div className="admin-user-avatar">{getInitials()}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="admin-user-name" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--admin-text)' }}>
                {getUserName()}
              </div>
            </div>
          </div>

          <div style={{ padding: '0.75rem 1.25rem 0' }}>
            <button
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Sign out of CMS"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <RiLogoutBoxRLine />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        <div
          className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={closeSidebar}
        />

        {/* ── MAIN CONTENT ── */}
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
