import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PROJECTS } from '../data/projects';
import { validateDPR } from '../utils/validation';
import { useToast } from '../context/ToastContext';

const WEATHER_OPTIONS = ['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Foggy'];

const WEATHER_ICONS = { Sunny: '☀️', Cloudy: '☁️', Rainy: '🌧️', Stormy: '⛈️', Foggy: '🌫️' };

const labelStyle = {
  display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px'
};

const inputStyle = (hasError) => ({
  background: '#0f1117', border: `1.5px solid ${hasError ? '#f87171' : '#2a2d3a'}`,
  color: '#e8e8e8', borderRadius: '10px', padding: '11px 14px', fontSize: '0.875rem',
  width: '100%', outline: 'none', fontFamily: 'DM Sans, sans-serif',
  boxShadow: hasError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

const sectionStyle = {
  background: '#13151f', border: '1px solid #1e2130',
  borderRadius: '16px', padding: '22px', marginBottom: '16px',
};

export default function DPRForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const fileRef = useRef();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({ projectId: projectId || '', date: today, weather: '', workDescription: '', workerCount: '' });
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhotos = (e) => {
    setPhotoError('');
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 3) { setPhotoError('Maximum 3 photos allowed.'); return; }
    const newPhotos = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 3));
    e.target.value = '';
  };

  const removePhoto = (idx) => {
    setPhotos(prev => { URL.revokeObjectURL(prev[idx].preview); return prev.filter((_, i) => i !== idx); });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateDPR(form);
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showToast('DPR submitted successfully! 🎉', 'success'); navigate('/projects'); }, 900);
  };

  const selectedProject = PROJECTS.find(p => p.id === form.projectId);

  const focusStyle = (e) => { e.target.style.borderColor = '#fb923c'; e.target.style.boxShadow = '0 0 0 3px rgba(251,146,60,0.15)'; };
  const blurStyle = (hasError) => (e) => { if (!hasError) { e.target.style.borderColor = '#2a2d3a'; e.target.style.boxShadow = 'none'; }};

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <Navbar title="Daily Progress Report" showBack />

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '28px 16px 48px' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.7rem', color: '#fb923c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '5px' }}>Field Report</p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Submit DPR</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Fill in today's on-site progress details</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Project Section */}
          <div style={sectionStyle}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              01 — Project
            </p>
            <label style={labelStyle}>Select Project *</label>
            <select name="projectId" value={form.projectId} onChange={handleChange}
              style={{ ...inputStyle(errors.projectId), appearance: 'none', cursor: 'pointer' }}
              onFocus={focusStyle} onBlur={blurStyle(errors.projectId)}>
              <option value="" style={{ background: '#1a1d27' }}>— Choose a project —</option>
              {PROJECTS.map(p => <option key={p.id} value={p.id} style={{ background: '#1a1d27' }}>{p.name}</option>)}
            </select>
            {errors.projectId && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.projectId}</p>}

            {selectedProject && (
              <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.18)' }}>
                <p style={{ fontWeight: 700, color: '#fb923c', fontSize: '0.85rem', margin: '0 0 2px' }}>{selectedProject.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0 }}>{selectedProject.location} · {selectedProject.manager}</p>
              </div>
            )}
          </div>

          {/* Site Conditions */}
          <div style={sectionStyle}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              02 — Site Conditions
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} max={today}
                  style={{ ...inputStyle(errors.date), colorScheme: 'dark' }}
                  onFocus={focusStyle} onBlur={blurStyle(errors.date)} />
                {errors.date && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.date}</p>}
              </div>
              <div>
                <label style={labelStyle}>Weather *</label>
                <select name="weather" value={form.weather} onChange={handleChange}
                  style={{ ...inputStyle(errors.weather), appearance: 'none', cursor: 'pointer' }}
                  onFocus={focusStyle} onBlur={blurStyle(errors.weather)}>
                  <option value="" style={{ background: '#1a1d27' }}>— Select —</option>
                  {WEATHER_OPTIONS.map(w => <option key={w} value={w} style={{ background: '#1a1d27' }}>{WEATHER_ICONS[w]} {w}</option>)}
                </select>
                {errors.weather && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.weather}</p>}
              </div>
            </div>

            {/* Weather display */}
            {form.weather && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {WEATHER_OPTIONS.map(w => (
                  <button type="button" key={w} onClick={() => setForm(p => ({ ...p, weather: w }))}
                    style={{
                      padding: '6px 12px', borderRadius: '999px', fontSize: '0.78rem', cursor: 'pointer', border: '1.5px solid',
                      background: form.weather === w ? 'rgba(251,146,60,0.15)' : 'transparent',
                      borderColor: form.weather === w ? '#fb923c' : '#2a2d3a',
                      color: form.weather === w ? '#fb923c' : '#6b7280',
                      transition: 'all 0.15s',
                    }}>
                    {WEATHER_ICONS[w]} {w}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Work Details */}
          <div style={sectionStyle}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              03 — Work Details
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Work Description *</label>
              <textarea name="workDescription" value={form.workDescription} onChange={handleChange} rows={4}
                placeholder="Describe all work completed on site today…"
                style={{ ...inputStyle(errors.workDescription), resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle(errors.workDescription)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                {errors.workDescription
                  ? <p style={{ color: '#f87171', fontSize: '0.73rem' }}>{errors.workDescription}</p>
                  : <span />}
                <p style={{ color: form.workDescription.length >= 20 ? '#34d399' : '#4b5563', fontSize: '0.7rem' }}>
                  {form.workDescription.length} / 20 min
                </p>
              </div>
            </div>

            <div style={{ maxWidth: '180px' }}>
              <label style={labelStyle}>Worker Count *</label>
              <input type="number" name="workerCount" value={form.workerCount} onChange={handleChange}
                min="1" max="9999" placeholder="e.g. 24"
                style={inputStyle(errors.workerCount)}
                onFocus={focusStyle} onBlur={blurStyle(errors.workerCount)} />
              {errors.workerCount && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.workerCount}</p>}
            </div>
          </div>

          {/* Photos */}
          <div style={sectionStyle}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              04 — Site Photos
            </p>
            <p style={{ color: '#4b5563', fontSize: '0.78rem', marginBottom: '16px' }}>Upload up to 3 photos from the site (optional)</p>
            {photoError && <p style={{ color: '#f87171', fontSize: '0.78rem', marginBottom: '10px' }}>{photoError}</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {photos.map((photo, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2d3a' }}>
                  <img src={photo.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => removePhoto(idx)}
                    style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(248,113,113,0.9)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✕
                  </button>
                </div>
              ))}
              {photos.length < 3 && (
                <button type="button" onClick={() => fileRef.current.click()}
                  style={{
                    width: '100px', height: '100px', borderRadius: '12px', cursor: 'pointer',
                    border: '2px dashed #2a2d3a', background: 'transparent',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '4px', color: '#4b5563', fontSize: '0.7rem', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fb923c'; e.currentTarget.style.color = '#fb923c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2d3a'; e.currentTarget.style.color = '#4b5563'; }}>
                  <span style={{ fontSize: '1.5rem' }}>+</span>
                  <span>Add photo</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="btn-primary"
            style={{ marginTop: '8px', fontSize: '1rem', letterSpacing: '0.06em' }}>
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(15,17,23,0.25)', borderTopColor: '#0f1117', borderRadius: '50%', display: 'inline-block' }} className="animate-spin" />
                Submitting Report…
              </>
            ) : 'Submit Daily Progress Report →'}
          </button>
        </form>
      </main>
    </div>
  );
}