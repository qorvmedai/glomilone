import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  RiMailLine,
  RiLockLine,
  RiLoginBoxLine,
  RiAlertLine,
  RiShieldCheckLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowLeftLine,
  RiCheckLine,
} from 'react-icons/ri';
import '../admin.css';

const Login = () => {
  // Mode: 'login' | 'reset'
  const [mode, setMode] = useState('login');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setErrorMessage('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email address.');
      } else {
        setErrorMessage(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      await resetPassword(email);
      setSuccessMessage('Password reset email sent! Check your inbox for instructions.');
    } catch (err) {
      console.error('Reset password failed:', err);
      if (err.code === 'auth/user-not-found') {
        setErrorMessage('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email address.');
      } else {
        setErrorMessage(err.message || 'Failed to send reset link. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-root admin-login-page">
      {/* Ambient glow background effect */}
      <div className="admin-login-glow-1" />
      <div className="admin-login-glow-2" />

      <div className="admin-login-card">
        {/* Header Branding */}
        <div className="admin-login-header">
          <Link to="/" className="admin-login-logo">
            <img src="/assets/logo.png" alt="GLOMILONE" className="admin-login-logo-img" />
            <span className="admin-login-logo-text">GLOMILONE</span>
            <span className="admin-logo-badge">CMS</span>
          </Link>
          <h1 className="admin-login-title">
            {mode === 'login' ? 'Admin Portal' : 'Reset Password'}
          </h1>
          <p className="admin-login-subtitle">
            {mode === 'login'
              ? 'Sign in to access your content management system'
              : 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div className="admin-error-alert">
            <RiAlertLine className="admin-alert-icon" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="admin-success-alert">
            <RiCheckLine className="admin-alert-icon" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ── MODE 1: LOGIN FORM ── */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="admin-form-group">
              <label htmlFor="login-email" className="admin-form-label">
                <RiMailLine /> Email Address
              </label>
              <div className="admin-input-icon-wrap">
                <RiMailLine className="admin-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@glomilone.com"
                  className="admin-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <div className="admin-label-row">
                <label htmlFor="login-password" className="admin-form-label">
                  <RiLockLine /> Password
                </label>
                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => switchMode('reset')}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="admin-input-icon-wrap">
                <RiLockLine className="admin-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="admin-input admin-input-has-toggle"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="admin-btn-primary"
              style={{ marginTop: '0.75rem' }}
            >
              {submitting ? (
                'Signing in…'
              ) : (
                <>
                  <RiLoginBoxLine />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        )}

        {/* ── MODE 2: RESET PASSWORD FORM ── */}
        {mode === 'reset' && (
          <form onSubmit={handleResetSubmit}>
            <div className="admin-form-group">
              <label htmlFor="reset-email" className="admin-form-label">
                <RiMailLine /> Registered Email Address
              </label>
              <div className="admin-input-icon-wrap">
                <RiMailLine className="admin-input-icon" />
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@glomilone.com"
                  className="admin-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="admin-btn-primary"
              style={{ marginTop: '0.75rem' }}
            >
              {submitting ? (
                'Sending Link…'
              ) : (
                <>
                  <RiMailLine />
                  Send Password Reset Link
                </>
              )}
            </button>

            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => switchMode('login')}
              style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
            >
              <RiArrowLeftLine /> Back to Sign In
            </button>
          </form>
        )}

        {/* Footer Security Badge */}
        <div className="admin-login-footer">
          <p className="admin-security-note">
            <RiShieldCheckLine /> Protected by Firebase Authentication & SSL
          </p>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-login-site-link">
            Visit Public Website →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
