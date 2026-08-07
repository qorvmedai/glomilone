import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import {
  RiArrowLeftLine,
  RiSaveLine,
  RiUpload2Line,
  RiAddLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiAlertLine,
  RiImageLine,
  RiLoader4Line,
  RiEditBoxLine,
} from 'react-icons/ri';
import '../admin.css';

// Default content schemas for each page to initialize forms smoothly
const DEFAULT_SCHEMAS = {
  home: {
    hero: {
      title: 'Awaken • Realign • Walk in Purpose',
      subtitle: 'A purpose-centered podcast-meets-community experience designed to awaken, realign, and amplify the God-given purpose in every life it touches.',
      ctaText: 'Listen Now',
      spotifyLink: 'https://open.spotify.com',
    },
    stats: [
      { value: '1,000+', label: 'Community Members' },
      { value: '4,000+', label: 'Expected Listeners' },
      { value: '40+', label: 'Dedicated Team Members' },
      { value: '3–5', label: 'Months of Transformation' },
    ],
    aboutTeaser: {
      heading: "More Than a Podcast. It's a Movement.",
      body1: 'Birthed by The Creative Icon, GLOMILONE exists to awaken a generation that has been silenced by delay, clouded by confusion, or simply never told that their life carries weight.',
      body2: 'Through an immersive blend of community, audio storytelling, and purposeful content, GLOMILONE walks with you — from the moment of awakening all the way into bold, intentional living.',
      ctaText: 'Read Our Mission',
      image: '/assets/The CreativeIcon.png',
      captionName: 'The Creative Icon',
      captionRole: 'Lead Steward',
    },
  },
  about: {
    hero: {
      title: 'The Movement',
      subtitle: 'Understanding the vision, story, and stewards behind GLOMILONE.',
    },
    mission: {
      title: 'Our Core Mission',
      body: 'GLOMILONE exists to awaken, realign, and amplify purpose in individuals across the globe.',
    },
  },
  podcast: {
    hero: {
      title: 'GLOMILONE Podcast',
      subtitle: 'Listen to transformative conversations, teachings, and stories.',
    },
    episodes: [
      {
        id: 'ep1',
        title: 'Episode 1: Awakening Your Purpose',
        desc: 'Discovering your inner calling and taking the first step towards alignment.',
        spotifyUrl: 'https://open.spotify.com',
      },
    ],
  },
  team: {
    hero: {
      title: 'Meet The Stewards',
      subtitle: 'The passionate leaders and team behind the GLOMILONE movement.',
    },
    members: [
      {
        name: 'The Creative Icon',
        role: 'Lead Steward',
        bio: 'Visionary and founder of GLOMILONE.',
        image: '/assets/The CreativeIcon.png',
      },
    ],
  },
  events: {
    hero: {
      title: 'Upcoming Events',
      subtitle: 'Join us live for immersive experiences and community gatherings.',
    },
    list: [
      {
        title: 'GLOMILONE Purpose Summit',
        date: 'To Be Announced',
        location: 'Lagos & Online',
        desc: 'A powerful gathering of purpose-driven individuals.',
        link: '#',
      },
    ],
  },
};

const EditPage = () => {
  const { pageId } = useParams();
  const { content, loading, saving, error: hookError, saveContent, uploadImage } = useContent(pageId);

  const [formData, setFormData] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const [uploadingField, setUploadingField] = useState(null);

  // Initialize form state once content or schema is loaded
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData(content);
    } else if (DEFAULT_SCHEMAS[pageId]) {
      setFormData(DEFAULT_SCHEMAS[pageId]);
    } else {
      setFormData({});
    }
  }, [content, pageId]);

  if (loading || !formData) {
    return (
      <div className="admin-loading-screen" style={{ minHeight: '60vh' }}>
        <div className="admin-loading-card">
          <RiLoader4Line className="admin-spinner spin" />
          <p className="admin-loading-text">Loading page content for {pageId}…</p>
        </div>
      </div>
    );
  }

  // Handle nested object property update
  const handleFieldChange = (path, value) => {
    setSaveSuccess(false);
    setLocalError('');
    setFormData((prev) => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!current[k] || typeof current[k] !== 'object') {
          current[k] = {};
        } else {
          current[k] = { ...current[k] };
        }
        current = current[k];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Handle image upload button click
  const handleImageFileChange = async (e, fieldPath) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldPath);
    setLocalError('');
    try {
      const url = await uploadImage(file, fieldPath);
      if (url) {
        handleFieldChange(fieldPath, url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setLocalError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  // Save form data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveSuccess(false);
    setLocalError('');

    try {
      await saveContent(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Save error:', err);
      setLocalError(err.message || 'Failed to save content');
    }
  };

  // Helper to render recursively editable form controls
  const renderFormFields = (data, prefix = '') => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, value]) => {
      const fieldPath = prefix ? `${prefix}.${key}` : key;

      // Handle arrays (e.g. stats, members, episodes, events)
      if (Array.isArray(value)) {
        return (
          <fieldset key={fieldPath} className="admin-list-fieldset">
            <legend className="admin-list-legend">{key.toUpperCase()} LIST</legend>
            {value.map((item, index) => (
              <div key={index} className="admin-list-item">
                <div className="admin-list-item-header">
                  <span className="admin-list-item-label">Item #{index + 1}</span>
                  <button
                    type="button"
                    className="admin-btn-danger"
                    onClick={() => {
                      const updatedList = value.filter((_, i) => i !== index);
                      handleFieldChange(fieldPath, updatedList);
                    }}
                  >
                    <RiDeleteBinLine /> Remove
                  </button>
                </div>

                {typeof item === 'object' && item !== null ? (
                  Object.entries(item).map(([subKey, subVal]) => (
                    <div key={`${fieldPath}[${index}].${subKey}`} className="admin-field">
                      <label className="admin-field-label">{subKey}</label>
                      <input
                        type="text"
                        value={subVal || ''}
                        onChange={(e) => {
                          const updatedList = [...value];
                          updatedList[index] = { ...updatedList[index], [subKey]: e.target.value };
                          handleFieldChange(fieldPath, updatedList);
                        }}
                        className="admin-input"
                      />
                    </div>
                  ))
                ) : (
                  <input
                    type="text"
                    value={item || ''}
                    onChange={(e) => {
                      const updatedList = [...value];
                      updatedList[index] = e.target.value;
                      handleFieldChange(fieldPath, updatedList);
                    }}
                    className="admin-input"
                  />
                )}
              </div>
            ))}

            <button
              type="button"
              className="admin-btn-add"
              onClick={() => {
                const sample = value[0] ? (typeof value[0] === 'object' ? { ...value[0] } : '') : {};
                if (typeof sample === 'object') {
                  Object.keys(sample).forEach((k) => (sample[k] = ''));
                }
                handleFieldChange(fieldPath, [...value, sample]);
              }}
            >
              <RiAddLine /> Add New Item to {key}
            </button>
          </fieldset>
        );
      }

      // Handle nested object section
      if (typeof value === 'object' && value !== null) {
        return (
          <fieldset key={fieldPath} className="admin-section-fieldset">
            <legend className="admin-section-legend">{key.toUpperCase()} SECTION</legend>
            {renderFormFields(value, fieldPath)}
          </fieldset>
        );
      }

      // Handle image string fields
      if (key.toLowerCase().includes('image') || key.toLowerCase().includes('photo')) {
        return (
          <div key={fieldPath} className="admin-field admin-image-field">
            <label className="admin-field-label">
              <RiImageLine /> {key}
            </label>
            {value && typeof value === 'string' && (
              <img src={value} alt="Preview" className="admin-image-preview" />
            )}
            <div className="admin-image-controls">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
                placeholder="Image URL or path"
                className="admin-input admin-image-url-input"
              />
              <label className={`admin-upload-btn ${uploadingField === fieldPath ? 'uploading' : ''}`}>
                <RiUpload2Line />
                {uploadingField === fieldPath ? 'Uploading…' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, fieldPath)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        );
      }

      // Handle multi-line body text / description fields
      if (key.toLowerCase().includes('body') || key.toLowerCase().includes('desc') || key.toLowerCase().includes('text')) {
        return (
          <div key={fieldPath} className="admin-field">
            <label className="admin-field-label">{key}</label>
            <textarea
              rows={4}
              value={value || ''}
              onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
              className="admin-input"
            />
          </div>
        );
      }

      // Standard text input field
      return (
        <div key={fieldPath} className="admin-field">
          <label className="admin-field-label">{key}</label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
            className="admin-input"
          />
        </div>
      );
    });
  };

  return (
    <div className="admin-edit-container">
      {/* Header Bar */}
      <div className="admin-edit-header">
        <div>
          <Link to="/admin" className="admin-back-link">
            <RiArrowLeftLine /> Back to Dashboard
          </Link>
          <h1 className="admin-edit-title">Edit {pageId} Page Content</h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="admin-btn-primary"
          style={{ width: 'auto', padding: '0.8rem 1.8rem' }}
        >
          {saving ? (
            'Saving…'
          ) : (
            <>
              <RiSaveLine /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* Alerts */}
      {(hookError || localError) && (
        <div className="admin-error-alert">
          <RiAlertLine /> {hookError || localError}
        </div>
      )}
      {saveSuccess && (
        <div className="admin-success-alert">
          <RiCheckLine /> Content saved successfully! Changes are live on your website.
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="admin-edit-form">
        {renderFormFields(formData)}

        {/* Sticky Save Bar */}
        <div className="admin-save-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--admin-text-muted)' }}>
            <RiEditBoxLine /> Editing <strong>{pageId}</strong> content
          </div>
          <button
            type="submit"
            disabled={saving}
            className="admin-btn-success"
          >
            {saving ? (
              'Publishing…'
            ) : (
              <>
                <RiSaveLine /> Save & Publish Live
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;