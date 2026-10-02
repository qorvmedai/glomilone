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
  RiExternalLinkLine,
} from 'react-icons/ri';
import '../admin.css';

// Default content schemas for each page to initialize forms smoothly & comprehensively
const DEFAULT_SCHEMAS = {
  home: {
    hero: {
      title: 'Awaken • Realign • Walk in Purpose',
      subtitle: 'A purpose-centered podcast-meets-community experience designed to awaken, realign, and amplify the God-given purpose in every life it touches.',
      ctaText: 'Listen Now',
      spotifyLink: 'https://open.spotify.com',
      discoverText: 'Discover the Movement',
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
      captionRole: 'Founder',
    },
    audienceSection: {
      sectionLabel: "💎 Who It's For",
      heading: 'No One Is Left Behind in the Pursuit of Purpose.',
    },
    audienceCards: [
      { num: '01', title: 'Drained in Delay', desc: "People who feel they've wasted their prime and no longer see themselves as worthy of purpose. They carry regret and need healing, hope, and reactivation." },
      { num: '02', title: 'In the Fog of Self', desc: "People who have never been exposed to the idea of purpose. They aren't resistant — they're simply unaware. GLOMILONE is their awakening." },
      { num: '03', title: 'The Purpose Driven', desc: "People already walking in purpose, seeking deeper clarity, alignment, and community. They need to be amplified, sharpened, and aligned for greater impact." },
    ],
    testimonialsSection: {
      sectionLabel: 'Voices Changed',
      heading: 'Lives Already Glowing',
    },
    testimonials: [
      { name: 'Victor Olubodun', text: 'I was opportuned to listen to some of your podcasts on Spotify, especially the Time Management series, and I must say it really helped me. Thank you so much for coming up with these amazing free tips.' },
      { name: 'One of One 🤭', text: "I've found what my tool is. Yesterday, while I was listening to the podcast, I didn't know. It was something I used to find really annoying because nobody around me really had it, and it made me feel alien. Well, I know better now." },
      { name: 'Omolola Asalewa', text: "Whoosh! 🤩🔥 The podcast is fire. I just finished listening to it. I'm enlightened. My purpose is to fulfill God's will. My assignment is how I fulfill it." },
      { name: 'Oluwajomiloju', text: "I felt the impact. I do preach about purpose and all, but I didn't understand it fully to this extent. After listening to the episodes, my perspective of things changed." },
      { name: 'Obumneme Christopher', text: "When you said, 'One who died for something is greater than one who lived for nothing,' my life flashed before my eyes. I realized I had just been existing." },
      { name: 'Gifty', text: 'When I listened to the podcast, almost all my questions were answered. You really changed my perspective. You inspired me to always start with the little things.' },
      { name: 'Listener', text: "For you to keep talking like this means you've accepted who you are instead of trying to become someone else. Please keep talking like this." },
      { name: 'God\'s Blessing', text: "This message came at the perfect time. Yesterday, I had so many thoughts and questions, wondering why I still haven't received a clear answer about my purpose." },
      { name: 'Mercy Nsima', text: 'For the first time, I truly understood the meaning of calling, purpose, assignment, vision, gifts, and legacy... after many years on earth. 😂 Thank you, ma.' },
      { name: 'Nkomuwa Nicole', text: "Do you know you have a sweet voice? My God! ✨❤️ Your voice feels like I'm receiving words directly from God. I'm taking action like mad." },
    ],
  },
  about: {
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
  },
  podcast: {
    hero: {
      subtitle: 'Audio Storytelling & Purpose',
      title: 'Tune In to GLOMILONE',
      description: 'From "GLOMILONE: The Origin" to "Death is a Reward", stream every episode on Spotify or your favorite platform.',
    },
    catalog: {
      title: 'Official Episode Catalog',
      description: 'Listen in chronological order from Episode 1 ("GLOMILONE: The Origin") to Episode 6 ("Death is a Reward").',
    },
    spotifyShow: {
      tag: 'Complete Spotify Directory',
      title: 'Stream Directly on Spotify',
      description: 'Browse the live Spotify channel player below.',
      embedUrl: 'https://open.spotify.com/embed/show/2zuePtTPcMfQ78eUol4Vhm?utm_source=generator&theme=0',
    },
    episodes: [
      { id: '1', title: 'GLOMILONE: The Origin', url: 'https://open.spotify.com/embed/episode/0ySJTuXuaIItBkJmRwBn0i?utm_source=generator&theme=0' },
      { id: '2', title: 'Time Management Series - Ep 2', url: 'https://open.spotify.com/embed/episode/4VAFBmn7NSXKUGB7RkfXus?utm_source=generator&theme=0' },
      { id: '3', title: 'Time Management Series - Ep 3', url: 'https://open.spotify.com/embed/episode/0a4d80RHrQFn5QSiBGCYOD?utm_source=generator&theme=0' },
      { id: '4', title: 'Time Management Series - Ep 4', url: 'https://open.spotify.com/embed/episode/4XJNg2mumT6cWVOXh5cRr4?utm_source=generator&theme=0' },
      { id: '5', title: 'Time Management Series - Ep 5', url: 'https://open.spotify.com/embed/episode/2N4iMHrVJ6Gpk76cpMQHDf?utm_source=generator&theme=0' },
      { id: '6', title: 'Death is a Reward', url: 'https://open.spotify.com/embed/episode/4GbWiRZB5sVZOmRGj0ND0D?utm_source=generator&theme=0' },
    ],
  },
  events: {
    hero: {
      subtitle: 'Upcoming Events',
      title: 'Gather in Purpose',
      description: 'Step out of isolation and join the movement live.',
    },
    currentEvent: {
      title: 'Awaken The Icon Within',
      description: 'Join The Creative Icon and Director Bim for an immersive 3-day experience designed to pull you out of delay and into your designated purpose. Expect deep teachings, interactive community sessions, and a clear roadmap for your next phase.',
      date: 'November 12 - 14, 2026',
      time: '6:00 PM (WAT)',
      location: 'Online / GLOMILONE Community Platform',
      image: '/assets/team-1.jpg',
      registerLink: 'https://wa.link/a4pzom',
      isActive: true,
    },
    noEvents: {
      heading: 'No Upcoming Events',
      text: 'We are currently preparing for our next gathering. Stay tuned!',
    },
  },
  team: {
    hero: {
      title: 'The People Behind It',
      subtitle: 'Dedicated stewards and visionaries ensuring that no one is left behind in the pursuit of purpose.',
    },
    membersSectionTitle: 'Dedicated Team Members',
    leaders: [
      {
        name: 'The Creative Icon',
        title: 'Founder',
        bio: 'The visionary behind GLOMILONE, guiding a generation out of the fog of self and into clarity.',
        image: '/assets/The CreativeIcon.png',
      },
      {
        name: 'Director Bim',
        title: 'Co-Founder',
        bio: 'Abimbola Oduwole, amplifying the movement and teaching practical steps to purpose execution.',
        image: '/assets/Director Bim .jpg',
      },
    ],
    teamMembers: [
      { name: 'Abdulfatah Komolafe', role: 'Team Member', image: '/assets/Abdulfatah Komolafe.jpeg' },
      { name: 'Beauty Tiana', role: 'Team Member', image: '/assets/Beauty Tiana.JPG' },
      { name: 'Chisom Ogadi', role: 'Team Member', image: '/assets/Chisom Ogadi.jpg' },
      { name: 'Dárasími Daniel', role: 'Team Member', image: '/assets/Dárasími Daniel .png' },
      { name: 'Gifted Timpaul', role: 'Team Member', image: '/assets/Gifted Timpaul .jpg' },
      { name: 'Happiness Adesuyi', role: 'Team Member', image: '/assets/Happiness Adesuyi .jpg' },
      { name: 'Olanlokun Goodness O.', role: 'Team Member', image: '/assets/Olanlokun Goodness O..jpg' },
      { name: 'The Hermosa Aura', role: 'Team Member', image: '/assets/The Hermosa Aura.jpg' },
    ],
  },
};

// Item templates for when adding new entries to an array
const ITEM_TEMPLATES = {
  stats: { value: '', label: '' },
  audienceCards: { num: '01', title: '', desc: '' },
  testimonials: { name: '', text: '' },
  episodes: { id: '', title: '', url: '' },
  phases: { number: '01', title: '', desc: '' },
  leaders: { name: '', title: '', bio: '', image: '' },
  teamMembers: { name: '', role: 'Team Member', image: '' },
};

// Deep merge helper
const deepMerge = (target, source) => {
  if (!source) return target;
  if (!target) return source;

  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (Array.isArray(sourceVal)) {
      result[key] = sourceVal.length > 0 ? sourceVal : (Array.isArray(targetVal) ? targetVal : sourceVal);
    } else if (sourceVal !== null && typeof sourceVal === 'object') {
      result[key] = deepMerge(targetVal || {}, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
};

const formatLabel = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
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
    const schema = DEFAULT_SCHEMAS[pageId] || {};
    if (content && Object.keys(content).length > 0) {
      setFormData(deepMerge(schema, content));
    } else {
      setFormData(schema);
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

  const getPublicPath = () => {
    if (pageId === 'home') return '/';
    return `/${pageId}`;
  };

  // Helper to render recursively editable form controls
  const renderFormFields = (data, prefix = '') => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, value]) => {
      const fieldPath = prefix ? `${prefix}.${key}` : key;
      const labelText = formatLabel(key);

      // Handle boolean flags (e.g. isActive)
      if (typeof value === 'boolean') {
        return (
          <div key={fieldPath} className="admin-field" style={{ padding: '0.5rem 0' }}>
            <label className="admin-field-label" style={{ marginBottom: '0.4rem' }}>
              {labelText}
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.92rem' }}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleFieldChange(fieldPath, e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--admin-primary)' }}
              />
              <span style={{ fontWeight: 600, color: value ? 'var(--admin-success, #10b981)' : 'var(--admin-text-muted)' }}>
                {value ? 'Active / Visible on Website' : 'Inactive / Hidden from Website'}
              </span>
            </label>
          </div>
        );
      }

      // Handle arrays (e.g. stats, audienceCards, testimonials, episodes, phases)
      if (Array.isArray(value)) {
        return (
          <fieldset key={fieldPath} className="admin-list-fieldset">
            <legend className="admin-list-legend">{labelText.toUpperCase()} LIST ({value.length})</legend>
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
                  Object.entries(item).map(([subKey, subVal]) => {
                    const subFieldPath = `${fieldPath}.${index}.${subKey}`;
                    const subLabel = formatLabel(subKey);

                    // Boolean inside array
                    if (typeof subVal === 'boolean') {
                      return (
                        <div key={subFieldPath} className="admin-field">
                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={subVal}
                              onChange={(e) => {
                                const updatedList = [...value];
                                updatedList[index] = { ...updatedList[index], [subKey]: e.target.checked };
                                handleFieldChange(fieldPath, updatedList);
                              }}
                              style={{ width: '16px', height: '16px' }}
                            />
                            <span>{subLabel}: {subVal ? 'Enabled' : 'Disabled'}</span>
                          </label>
                        </div>
                      );
                    }

                    // Image inside array
                    if (subKey.toLowerCase().includes('image') || subKey.toLowerCase().includes('photo') || subKey.toLowerCase().includes('flyer')) {
                      return (
                        <div key={subFieldPath} className="admin-field admin-image-field">
                          <label className="admin-field-label">
                            <RiImageLine /> {subLabel}
                          </label>
                          {subVal && typeof subVal === 'string' && (
                            <img src={subVal} alt="Preview" className="admin-image-preview" />
                          )}
                          <div className="admin-image-controls">
                            <input
                              type="text"
                              value={subVal || ''}
                              onChange={(e) => {
                                const updatedList = [...value];
                                updatedList[index] = { ...updatedList[index], [subKey]: e.target.value };
                                handleFieldChange(fieldPath, updatedList);
                              }}
                              placeholder="Image URL or path"
                              className="admin-input admin-image-url-input"
                            />
                            <label className={`admin-upload-btn ${uploadingField === subFieldPath ? 'uploading' : ''}`}>
                              <RiUpload2Line />
                              {uploadingField === subFieldPath ? 'Uploading…' : 'Upload'}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  setUploadingField(subFieldPath);
                                  try {
                                    const url = await uploadImage(file, `${key}_${index}_${subKey}`);
                                    if (url) {
                                      const updatedList = [...value];
                                      updatedList[index] = { ...updatedList[index], [subKey]: url };
                                      handleFieldChange(fieldPath, updatedList);
                                    }
                                  } catch (err) {
                                    setLocalError(`Upload failed: ${err.message}`);
                                  } finally {
                                    setUploadingField(null);
                                  }
                                }}
                                style={{ display: 'none' }}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    }

                    // Long text inside array
                    if (
                      subKey.toLowerCase().includes('desc') ||
                      subKey.toLowerCase().includes('body') ||
                      subKey.toLowerCase().includes('text') ||
                      subKey.toLowerCase().includes('bio')
                    ) {
                      return (
                        <div key={subFieldPath} className="admin-field">
                          <label className="admin-field-label">{subLabel}</label>
                          <textarea
                            rows={3}
                            value={subVal || ''}
                            onChange={(e) => {
                              const updatedList = [...value];
                              updatedList[index] = { ...updatedList[index], [subKey]: e.target.value };
                              handleFieldChange(fieldPath, updatedList);
                            }}
                            className="admin-input"
                          />
                        </div>
                      );
                    }

                    // Standard text inside array
                    return (
                      <div key={subFieldPath} className="admin-field">
                        <label className="admin-field-label">{subLabel}</label>
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
                    );
                  })
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
                let sample;
                if (ITEM_TEMPLATES[key]) {
                  sample = { ...ITEM_TEMPLATES[key] };
                } else if (value[0] && typeof value[0] === 'object') {
                  sample = { ...value[0] };
                  Object.keys(sample).forEach((k) => (sample[k] = typeof sample[k] === 'boolean' ? true : ''));
                } else if (value[0] !== undefined) {
                  sample = '';
                } else {
                  sample = { title: '', desc: '' };
                }
                handleFieldChange(fieldPath, [...value, sample]);
              }}
            >
              <RiAddLine /> Add New Item to {labelText}
            </button>
          </fieldset>
        );
      }

      // Handle nested object section
      if (typeof value === 'object' && value !== null) {
        return (
          <fieldset key={fieldPath} className="admin-section-fieldset">
            <legend className="admin-section-legend">{labelText.toUpperCase()} SECTION</legend>
            {renderFormFields(value, fieldPath)}
          </fieldset>
        );
      }

      // Handle image string fields
      if (key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') || key.toLowerCase().includes('flyer')) {
        return (
          <div key={fieldPath} className="admin-field admin-image-field">
            <label className="admin-field-label">
              <RiImageLine /> {labelText}
            </label>
            {value && typeof value === 'string' && (
              <img src={value} alt="Preview" className="admin-image-preview" />
            )}
            <div className="admin-image-controls">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
                placeholder="Image URL or path (e.g. /assets/team.jpg)"
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
      if (
        key.toLowerCase().includes('body') ||
        key.toLowerCase().includes('desc') ||
        key.toLowerCase().includes('text') ||
        key.toLowerCase().includes('subheading') ||
        key.toLowerCase().includes('subtitle') ||
        key.toLowerCase().includes('bio')
      ) {
        return (
          <div key={fieldPath} className="admin-field">
            <label className="admin-field-label">{labelText}</label>
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
          <label className="admin-field-label">{labelText}</label>
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
          <h1 className="admin-edit-title">Edit {formatLabel(pageId)} Page Content</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={getPublicPath()}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <RiExternalLinkLine /> View Live Page
          </a>
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
            <RiEditBoxLine /> Editing <strong>{formatLabel(pageId)}</strong> content
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