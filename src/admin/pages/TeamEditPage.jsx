import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  RiTeamLine,
  RiUser3Line,
  RiDragMove2Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiInformationLine,
  RiShieldStarLine,
} from 'react-icons/ri';
import '../admin.css';

// ─── Default data that mirrors Team.jsx public page ───────────────────────────
const DEFAULT_TEAM_DATA = {
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
};

// ─── Completeness checker ──────────────────────────────────────────────────────
const getChecks = (formData) => {
  const leaders = formData?.leaders || [];
  const members = formData?.teamMembers || [];

  return [
    {
      id: 'header_complete',
      label: 'Page title and subtitle configured',
      passed: Boolean(formData?.hero?.title && formData?.hero?.subtitle),
    },
    {
      id: 'leaders_exist',
      label: 'At least 2 leader cards defined',
      passed: leaders.length >= 2,
    },
    {
      id: 'leaders_complete',
      label: 'All leaders have name, title, bio & image',
      passed: leaders.length > 0 && leaders.every((l) => l.name && l.title && l.bio && l.image),
    },
    {
      id: 'members_exist',
      label: 'At least 1 team member defined',
      passed: members.length >= 1,
    },
    {
      id: 'members_names',
      label: 'All team members have a name',
      passed: members.length > 0 && members.every((m) => m.name),
    },
    {
      id: 'members_roles',
      label: 'All team members have a role',
      passed: members.length > 0 && members.every((m) => m.role),
    },
    {
      id: 'members_images',
      label: 'All team members have an image',
      passed: members.length > 0 && members.every((m) => m.image),
    },
  ];
};

// ─── Drag-state helper ────────────────────────────────────────────────────────
const useDragReorder = (list, onReorder) => {
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (i) => setDragIndex(i);

  const handleDrop = (i) => {
    if (dragIndex === null || dragIndex === i) {
      setDragIndex(null);
      return;
    }
    const updated = [...list];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(i, 0, moved);
    onReorder(updated);
    setDragIndex(null);
  };

  return { dragIndex, handleDragStart, handleDrop };
};

// ─── Image uploader sub-component ────────────────────────────────────────────
const ImageUploader = ({ value, fieldPath, onChange, uploadImage, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setLocalError('');
    try {
      const url = await uploadImage(file, fieldPath);
      if (url) onChange(url);
    } catch (err) {
      setLocalError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-field admin-image-field">
      <label className="admin-field-label">
        <RiImageLine /> {label}
      </label>
      {value && <img src={value} alt="Preview" className="admin-image-preview" />}
      {localError && (
        <p style={{ fontSize: '0.78rem', color: 'var(--admin-danger)', marginTop: '0.3rem' }}>
          {localError}
        </p>
      )}
      <div className="admin-image-controls">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or path"
          className="admin-input admin-image-url-input"
        />
        <label className={`admin-upload-btn ${uploading ? 'uploading' : ''}`}>
          <RiUpload2Line />
          {uploading ? 'Uploading\u2026' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const TeamEditPage = () => {
  const { content, loading, saving, error: hookError, saveContent, uploadImage } = useContent('team');

  const [formData, setFormData] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const [activeTab, setActiveTab] = useState('leaders');

  // Initialize form
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        hero: {
          title: content.hero?.title || DEFAULT_TEAM_DATA.hero.title,
          subtitle: content.hero?.subtitle || DEFAULT_TEAM_DATA.hero.subtitle,
        },
        membersSectionTitle: content.membersSectionTitle || DEFAULT_TEAM_DATA.membersSectionTitle,
        leaders:
          content.leaders && content.leaders.length > 0
            ? content.leaders
            : DEFAULT_TEAM_DATA.leaders,
        teamMembers:
          content.teamMembers && content.teamMembers.length > 0
            ? content.teamMembers
            : DEFAULT_TEAM_DATA.teamMembers,
      });
    } else {
      setFormData(DEFAULT_TEAM_DATA);
    }
  }, [content]);

  // ── Leaders helpers ──
  const updateLeader = useCallback((index, field, value) => {
    setSaveSuccess(false);
    setFormData((prev) => {
      const leaders = [...prev.leaders];
      leaders[index] = { ...leaders[index], [field]: value };
      return { ...prev, leaders };
    });
  }, []);

  const addLeader = () => {
    setFormData((prev) => ({
      ...prev,
      leaders: [...prev.leaders, { name: '', title: '', bio: '', image: '' }],
    }));
  };

  const removeLeader = (index) => {
    setFormData((prev) => ({
      ...prev,
      leaders: prev.leaders.filter((_, i) => i !== index),
    }));
  };

  // ── Team Member helpers ──
  const updateMember = useCallback((index, field, value) => {
    setSaveSuccess(false);
    setFormData((prev) => {
      const teamMembers = [...prev.teamMembers];
      teamMembers[index] = { ...teamMembers[index], [field]: value };
      return { ...prev, teamMembers };
    });
  }, []);

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: 'Team Member', image: '' }],
    }));
  };

  const removeMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  // Drag reorder for members
  const { dragIndex, handleDragStart, handleDrop } = useDragReorder(
    formData?.teamMembers || [],
    (reordered) => setFormData((prev) => ({ ...prev, teamMembers: reordered }))
  );

  // ── Save ──
  const handleSave = async () => {
    setSaveSuccess(false);
    setLocalError('');
    try {
      await saveContent(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setLocalError(err.message || 'Failed to save.');
    }
  };

  if (loading || !formData) {
    return (
      <div className="admin-loading-screen" style={{ minHeight: '60vh' }}>
        <div className="admin-loading-card">
          <RiLoader4Line className="admin-spinner spin" />
          <p className="admin-loading-text">Loading Team content\u2026</p>
        </div>
      </div>
    );
  }

  const checks = getChecks(formData);
  const passedCount = checks.filter((c) => c.passed).length;
  const totalCount = checks.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="admin-edit-container team-edit-container">
      {/* Header */}
      <div className="admin-edit-header">
        <div>
          <Link to="/admin" className="admin-back-link">
            <RiArrowLeftLine /> Back to Dashboard
          </Link>
          <h1 className="admin-edit-title">
            <RiTeamLine style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Edit Team Page
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className={`team-check-badge ${allPassed ? 'complete' : 'incomplete'}`}>
            {allPassed ? <RiCheckboxCircleLine /> : <RiInformationLine />}
            {passedCount}/{totalCount} checks passed
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="admin-btn-primary"
            style={{ width: 'auto', padding: '0.8rem 1.8rem' }}
          >
            {saving ? 'Saving\u2026' : <><RiSaveLine /> Save Changes</>}
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
          <RiCheckLine /> Team content saved successfully! Changes are live on the website.
        </div>
      )}

      {/* Tab Bar */}
      <div className="team-edit-tabs">
        <button
          className={`team-edit-tab ${activeTab === 'header' ? 'active' : ''}`}
          onClick={() => setActiveTab('header')}
        >
          <RiTeamLine /> Page Header
        </button>
        <button
          className={`team-edit-tab ${activeTab === 'leaders' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaders')}
        >
          <RiShieldStarLine /> Leaders ({formData.leaders.length})
        </button>
        <button
          className={`team-edit-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <RiUser3Line /> Team Members ({formData.teamMembers.length})
        </button>
        <button
          className={`team-edit-tab ${activeTab === 'checks' ? 'active' : ''} ${!allPassed ? 'has-warning' : ''}`}
          onClick={() => setActiveTab('checks')}
        >
          <RiCheckboxCircleLine /> Completion Checks
          {!allPassed && <span className="team-tab-warning-dot" />}
        </button>
      </div>

      {/* TAB: HEADER */}
      {activeTab === 'header' && (
        <div className="team-edit-section">
          <p className="team-edit-section-desc">
            Edit the main headline, description, and section headings shown on the Team page.
          </p>

          <div className="team-leader-card-edit" style={{ display: 'block', padding: '1.75rem' }}>
            <div className="admin-field">
              <label className="admin-field-label">Page Headline</label>
              <input
                type="text"
                value={formData.hero?.title || ''}
                onChange={(e) => {
                  setSaveSuccess(false);
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }));
                }}
                placeholder="The People Behind It"
                className="admin-input"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field-label">Page Subtitle</label>
              <textarea
                rows={3}
                value={formData.hero?.subtitle || ''}
                onChange={(e) => {
                  setSaveSuccess(false);
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }));
                }}
                placeholder="Dedicated stewards and visionaries ensuring that no one is left behind in the pursuit of purpose."
                className="admin-input"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field-label">Team Members Section Title</label>
              <input
                type="text"
                value={formData.membersSectionTitle || ''}
                onChange={(e) => {
                  setSaveSuccess(false);
                  setFormData((prev) => ({
                    ...prev,
                    membersSectionTitle: e.target.value,
                  }));
                }}
                placeholder="Dedicated Team Members"
                className="admin-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB: LEADERS */}
      {activeTab === 'leaders' && (
        <div className="team-edit-section">
          <p className="team-edit-section-desc">
            These are the featured leader cards shown prominently at the top of the Team page.
          </p>

          {formData.leaders.map((leader, index) => (
            <div key={index} className="team-leader-card-edit">
              <div className="team-leader-card-edit-header">
                <span className="team-leader-index">
                  <RiShieldStarLine /> Leader #{index + 1}
                </span>
                <button
                  type="button"
                  className="admin-btn-danger"
                  onClick={() => removeLeader(index)}
                >
                  <RiDeleteBinLine /> Remove
                </button>
              </div>

              <div className="team-leader-edit-grid">
                <div className="team-leader-image-col">
                  <ImageUploader
                    value={leader.image}
                    fieldPath={`leaders_${index}_image`}
                    onChange={(url) => updateLeader(index, 'image', url)}
                    uploadImage={uploadImage}
                    label="Leader Photo"
                  />
                </div>

                <div className="team-leader-fields-col">
                  <div className="admin-field">
                    <label className="admin-field-label">Full Name</label>
                    <input
                      type="text"
                      value={leader.name || ''}
                      onChange={(e) => updateLeader(index, 'name', e.target.value)}
                      placeholder="e.g. The Creative Icon"
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Title / Role</label>
                    <input
                      type="text"
                      value={leader.title || ''}
                      onChange={(e) => updateLeader(index, 'title', e.target.value)}
                      placeholder="e.g. Founder"
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Bio / Description</label>
                    <textarea
                      rows={4}
                      value={leader.bio || ''}
                      onChange={(e) => updateLeader(index, 'bio', e.target.value)}
                      placeholder="Short bio shown on the team page\u2026"
                      className="admin-input"
                    />
                  </div>

                  <div className="team-member-checks">
                    {['name', 'title', 'bio', 'image'].map((field) => (
                      <span
                        key={field}
                        className={`team-member-check-pill ${leader[field] ? 'ok' : 'missing'}`}
                      >
                        {leader[field] ? <RiCheckLine /> : <RiCloseCircleLine />}
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button type="button" className="admin-btn-add team-add-btn" onClick={addLeader}>
            <RiAddLine /> Add Leader Card
          </button>
        </div>
      )}

      {/* TAB: TEAM MEMBERS */}
      {activeTab === 'members' && (
        <div className="team-edit-section">
          <p className="team-edit-section-desc">
            These are the team member cards shown in the grid below the leaders.
            Drag <RiDragMove2Line style={{ verticalAlign: 'middle' }} /> to reorder.
          </p>

          <div className="team-members-edit-grid">
            {formData.teamMembers.map((member, index) => {
              const isComplete = member.name && member.role && member.image;
              const isDragging = dragIndex === index;
              return (
                <div
                  key={index}
                  className={`team-member-edit-card ${isDragging ? 'dragging' : ''} ${!isComplete ? 'incomplete-card' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                >
                  <div className="team-member-edit-card-header">
                    <span className="team-member-drag-handle" title="Drag to reorder">
                      <RiDragMove2Line />
                    </span>
                    <span className="team-member-edit-index">#{index + 1} {member.name || 'Unnamed'}</span>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => removeMember(index)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>

                  <div className="team-member-edit-img-wrap">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="team-member-edit-preview" />
                    ) : (
                      <div className="team-member-edit-no-img">
                        <RiImageLine />
                        <span>No image</span>
                      </div>
                    )}
                    <label className="team-member-upload-overlay">
                      <RiUpload2Line />
                      <span>Change</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadImage(file, `teamMembers_${index}_image`);
                            if (url) updateMember(index, 'image', url);
                          } catch (err) {
                            setLocalError(`Upload failed: ${err.message}`);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="admin-field" style={{ marginTop: '0.75rem' }}>
                    <label className="admin-field-label">Name</label>
                    <input
                      type="text"
                      value={member.name || ''}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="Full name"
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Role</label>
                    <input
                      type="text"
                      value={member.role || ''}
                      onChange={(e) => updateMember(index, 'role', e.target.value)}
                      placeholder="e.g. Team Member"
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Image URL (or upload above)</label>
                    <input
                      type="text"
                      value={member.image || ''}
                      onChange={(e) => updateMember(index, 'image', e.target.value)}
                      placeholder="/assets/photo.jpg"
                      className="admin-input"
                    />
                  </div>

                  <div className="team-member-checks">
                    {['name', 'role', 'image'].map((field) => (
                      <span
                        key={field}
                        className={`team-member-check-pill ${member[field] ? 'ok' : 'missing'}`}
                      >
                        {member[field] ? <RiCheckLine /> : <RiCloseCircleLine />} {field}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="team-member-add-card" onClick={addMember}>
              <RiAddLine className="team-member-add-icon" />
              <span>Add Team Member</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB: COMPLETION CHECKS */}
      {activeTab === 'checks' && (
        <div className="team-edit-section">
          <div className="team-checks-header">
            <div className={`team-checks-score ${allPassed ? 'perfect' : 'partial'}`}>
              <span className="team-checks-score-num">{passedCount}/{totalCount}</span>
              <span className="team-checks-score-label">Checks Passed</span>
            </div>
            <p className="team-edit-section-desc" style={{ flex: 1 }}>
              These checks verify that all required content is filled in correctly before publishing to the live website.
            </p>
          </div>

          <div className="team-checks-list">
            {checks.map((check) => (
              <div key={check.id} className={`team-check-item ${check.passed ? 'passed' : 'failed'}`}>
                <div className="team-check-icon">
                  {check.passed ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}
                </div>
                <div className="team-check-text">
                  <span className="team-check-label">{check.label}</span>
                  <span className="team-check-status">{check.passed ? 'Complete' : 'Needs attention'}</span>
                </div>
              </div>
            ))}
          </div>

          {allPassed ? (
            <div className="team-checks-all-good">
              <RiCheckboxCircleLine />
              All checks passed! Your Team page content is complete and ready to publish.
            </div>
          ) : (
            <div className="team-checks-action-tip">
              <RiInformationLine />
              Switch to the <strong>Leaders</strong> or <strong>Team Members</strong> tab to fill in the missing details.
            </div>
          )}
        </div>
      )}

      {/* Sticky Save Bar */}
      <div className="admin-save-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--admin-text-muted)' }}>
          <RiTeamLine />
          Editing <strong style={{ color: 'var(--admin-text)' }}>Team</strong> page &nbsp;
          <span className={`team-check-badge-sm ${allPassed ? 'complete' : 'incomplete'}`}>
            {passedCount}/{totalCount} complete
          </span>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="admin-btn-success"
        >
          {saving ? 'Publishing\u2026' : <><RiSaveLine /> Save &amp; Publish Live</>}
        </button>
      </div>
    </div>
  );
};

export default TeamEditPage;
