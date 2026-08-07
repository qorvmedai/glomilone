import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Auth Context Provider
import { AuthProvider } from './admin/hooks/useAuth';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';

// Admin Pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import EditPage from './admin/pages/EditPage';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Podcast from './pages/Podcast';
import Team from './pages/Team';
import Events from './pages/Events';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicAnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </AnimatePresence>
  );
};

const PublicLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {!isMobile && <CustomCursor />}
      <div className="app-container">
        <Header />
        <main>
          <PublicAnimatedRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="edit/:pageId" element={<EditPage />} />
          </Route>

          {/* Public Website Routes */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
