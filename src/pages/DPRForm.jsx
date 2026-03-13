import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PROJECTS } from '../data/projects';
import { validateDPR } from '../utils/validation';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const WEATHER_OPTIONS = ['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Foggy'];
const WEATHER_ICONS = { Sunny: '☀️', Cloudy: '☁️', Rainy: '🌧️', Stormy: '⛈️', Foggy: '🌫️' };

// ── Inline custom dropdown (no separate file needed) ──────────────────────────
function CustomSelect({ options, value, onChange, placeholder, name, hasError, dark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const bg          = dark ? '#1e293b' : '#fff';
  const borderColor = hasError ? '#f87171' : (open ? '#0ea5e9' : (dark ? '#334155' : '#bae6fd'));
  const textColor   = dark ? '#e2e8f0' : '#1e293b';
  const dropBg      = dark ? '#1e293b' : '#fff';
  const dropBorder  = dark ? '#334155' : '#e0f2fe';
  const hoverBg     = dark ? 'rgba(56,189,248,0.08)' : '#f0f7ff';
  const activeBg    = dark ? 'rgba(14,165,233,0.15)' : '#e0f2fe';
  const activeColor = dark ? '#38bdf8' : '#0284c7';

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div onClick={() => setOpen(o => !o)} style={{
        background: bg, border: `1.5px solid ${borderColor}`,
        borderRadius: open ? '10px 10px 0 0' : '10px',
        padding: '11px 14px', fontSize: '0.875rem',
        color: selected ? textColor : (dark ? '#475569' : '#94a3b8'),
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'border-color 0.2s, box-shadow 0.2s', userSelect: 'none',
        boxShadow: open ? '0 0 0 3px rgba(14,165,233,0.15)' : (hasError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none'),
      }}>
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', color: dark ? '#475569' : '#94a3b8', fontSize: '0.7rem' }}>▼</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: dropBg, border: `1.5px solid #0ea5e9`, borderTop: 'none',
          borderRadius: '0 0 10px 10px',
          boxShadow: dark ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 32px rgba(14,165,233,0.15)',
          overflow: 'hidden',
        }}>
          {options.map((opt, i) => (
            <div key={opt.value}
              onClick={() => { onChange({ target: { name, value: opt.value } }); setOpen(false); }}
              style={{
                padding: '10px 14px', fontSize: '0.875rem', cursor: 'pointer',
                color: value === opt.value ? activeColor : textColor,
                background: value === opt.value ? activeBg : 'transparent',
                borderTop: i > 0 ? `1px solid ${dropBorder}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.15s',
                fontWeight: value === opt.value ? 600 : 400,
              }}
              onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = hoverBg; }}
              onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = 'transparent'; }}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span style={{ color: activeColor, fontSize: '0.8rem' }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const projectOptions = PROJECTS.map(p => ({ value: p.id, label: p.name }));
const weatherOptions = WEATHER_OPTIONS.map(w => ({ value: w, label: `${WEATHER_ICONS[w]} ${w}` }));

export default function DPRForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { dark } = useTheme();
  const fileRef = useRef();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({ projectId: projectId || '', date: today, weather: '', workDescription: '', workerCount: '' });
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState('');
  const [loading, setLoading] = useState(false);

  const bg         = dark ? '#0d1117' : '#f0f7ff';
  const cardBg     = dark ? '#0f172a' : '#fff';
  const border     = dark ? '#1e293b' : '#e0f2fe';
  const textMain   = dark ? '#e2e8f0' : '#0c4a6e';
  const textSub    = dark ? '#64748b' : '#64748b';
  const accent     = dark ? '#38bdf8' : '#0284c7';
  const inputBg    = dark ? '#1e293b' : '#fff';
  const inputText  = dark ? '#e2e8f0' : '#1e293b';
  const inputBorder= dark ? '#334155' : '#bae6fd';
  const labelColor = dark ? '#64748b' : '#475569';

  const inputStyle = (hasError) => ({
    background: inputBg, border: `1.5px solid ${hasError ? '#f87171' : inputBorder}`,
    color: inputText, borderRadius: '10px', padding: '11px 14px', fontSize: '0.875rem',
    width: '100%', outline: 'none', fontFamily: 'DM Sans, sans-serif',
    boxShadow: hasError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s',
  });

  const sectionStyle = {
    background: cardBg, border: `1.5px solid ${border}`, borderRadius: '16px', padding: '22px', marginBottom: '16px',
    boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(14,165,233,0.06)',
    transition: 'background 0.3s, border-color 0.3s',
  };

  const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 700, color: labelColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhotos = (e) => {
    setPhotoError('');
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 3) { setPhotoError('Maximum 3 photos allowed.'); return; }
    setPhotos(prev => [...prev, ...files.map(f => ({ file: f, preview: URL.createObjectURL(f) }))].slice(0, 3));
    e.target.value = '';
  };

  const removePhoto = (idx) => setPhotos(prev => { URL.revokeObjectURL(prev[idx].preview); return prev.filter((_, i) => i !== idx); });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateDPR(form);
    if (Object.keys(errs).length) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showToast('DPR submitted successfully! 🎉', 'success'); navigate('/projects'); }, 900);
  };

  const focusInput = (e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)'; };
  const blurInput  = (hasError) => (e) => { if (!hasError) { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = 'none'; }};

  const selectedProject = PROJECTS.find(p => p.id === form.projectId);

  const SectionTag = ({ num, label }) => (
    <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ background: dark ? 'rgba(56,189,248,0.12)' : '#e0f2fe', color: accent, borderRadius: '6px', padding: '2px 8px', fontSize: '0.75rem' }}>{num}</span>
      {label}
    </p>
  );

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', flexDirection: 'column', transition: 'background 0.3s' }}>
      <Navbar title="Daily Progress Report" showBack />

      <main style={{ maxWidth: '720px', width: '100%', margin: '0 auto', padding: '28px 16px 48px', flex: 1 }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.7rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '5px' }}>Field Report</p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: textMain, margin: '0 0 4px' }}>Submit DPR</h1>
          <p style={{ color: textSub, fontSize: '0.875rem' }}>Fill in today's on-site progress details</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* 01 Project */}
          <div style={sectionStyle}>
            <SectionTag num="01" label="Project" />
            <label style={labelStyle}>Project *</label>

            {projectId ? (
              <div style={{ padding: '12px 14px', borderRadius: '10px', background: dark ? 'rgba(56,189,248,0.08)' : '#e0f2fe', border: `1.5px solid ${dark ? 'rgba(56,189,248,0.25)' : '#7dd3fc'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 700, color: accent, fontSize: '0.95rem', margin: '0 0 2px', fontFamily: 'Barlow Condensed, sans-serif' }}>{selectedProject?.name}</p>
                  <p style={{ color: dark ? '#64748b' : '#0369a1', fontSize: '0.75rem', margin: 0 }}>{selectedProject?.location} · {selectedProject?.manager}</p>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', background: dark ? 'rgba(56,189,248,0.15)' : '#bae6fd', color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Selected</span>
              </div>
            ) : (
              <>
                <CustomSelect name="projectId" value={form.projectId} onChange={handleChange}
                  options={projectOptions} placeholder="— Choose a project —" hasError={!!errors.projectId} dark={dark} />
                {errors.projectId && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.projectId}</p>}
                {selectedProject && (
                  <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '10px', background: dark ? 'rgba(56,189,248,0.08)' : '#e0f2fe', border: `1px solid ${dark ? 'rgba(56,189,248,0.2)' : '#bae6fd'}` }}>
                    <p style={{ fontWeight: 700, color: accent, fontSize: '0.85rem', margin: '0 0 2px' }}>{selectedProject.name}</p>
                    <p style={{ color: dark ? '#64748b' : '#0369a1', fontSize: '0.75rem', margin: 0 }}>{selectedProject.location} · {selectedProject.manager}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 02 Site Conditions */}
          <div style={sectionStyle}>
            <SectionTag num="02" label="Site Conditions" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} max={today}
                  style={{ ...inputStyle(errors.date), colorScheme: dark ? 'dark' : 'light' }}
                  onFocus={focusInput} onBlur={blurInput(errors.date)} />
                {errors.date && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.date}</p>}
              </div>
              <div>
                <label style={labelStyle}>Weather *</label>
                <CustomSelect name="weather" value={form.weather} onChange={handleChange}
                  options={weatherOptions} placeholder="— Select —" hasError={!!errors.weather} dark={dark} />
                {errors.weather && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.weather}</p>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {WEATHER_OPTIONS.map(w => (
                <button type="button" key={w} onClick={() => handleChange({ target: { name: 'weather', value: w } })}
                  style={{
                    padding: '6px 12px', borderRadius: '999px', fontSize: '0.78rem', cursor: 'pointer',
                    border: `1.5px solid ${form.weather === w ? '#0ea5e9' : (dark ? '#334155' : '#e0f2fe')}`,
                    background: form.weather === w ? (dark ? 'rgba(14,165,233,0.15)' : '#e0f2fe') : (dark ? 'rgba(255,255,255,0.03)' : '#f8fafc'),
                    color: form.weather === w ? accent : (dark ? '#64748b' : '#64748b'),
                    fontWeight: form.weather === w ? 600 : 400, transition: 'all 0.15s',
                  }}>
                  {WEATHER_ICONS[w]} {w}
                </button>
              ))}
            </div>
          </div>

          {/* 03 Work Details */}
          <div style={sectionStyle}>
            <SectionTag num="03" label="Work Details" />
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Work Description *</label>
              <textarea name="workDescription" value={form.workDescription} onChange={handleChange} rows={4}
                placeholder="Describe all work completed on site today…"
                style={{ ...inputStyle(errors.workDescription), resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusInput} onBlur={blurInput(errors.workDescription)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                {errors.workDescription ? <p style={{ color: '#f87171', fontSize: '0.73rem' }}>{errors.workDescription}</p> : <span />}
                <p style={{ color: form.workDescription.length >= 20 ? '#22c55e' : (dark ? '#334155' : '#94a3b8'), fontSize: '0.7rem', fontWeight: 500 }}>
                  {form.workDescription.length} / 20 min
                </p>
              </div>
            </div>
            <div style={{ maxWidth: '180px' }}>
              <label style={labelStyle}>Worker Count *</label>
              <input type="number" name="workerCount" value={form.workerCount} onChange={handleChange}
                min="1" max="9999" placeholder="e.g. 24" style={inputStyle(errors.workerCount)}
                onFocus={focusInput} onBlur={blurInput(errors.workerCount)} />
              {errors.workerCount && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: '5px' }}>{errors.workerCount}</p>}
            </div>
          </div>

          {/* 04 Photos */}
          <div style={sectionStyle}>
            <SectionTag num="04" label="Site Photos" />
            <p style={{ color: dark ? '#475569' : '#94a3b8', fontSize: '0.78rem', marginBottom: '16px', marginTop: '-8px' }}>Upload up to 3 photos (optional)</p>
            {photoError && <p style={{ color: '#f87171', fontSize: '0.78rem', marginBottom: '10px' }}>{photoError}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {photos.map((photo, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: `1.5px solid ${dark ? '#334155' : '#bae6fd'}` }}>
                  <img src={photo.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => removePhoto(idx)}
                    style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(220,38,38,0.85)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
              ))}
              {photos.length < 3 && (
                <button type="button" onClick={() => fileRef.current.click()}
                  style={{
                    width: '100px', height: '100px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px dashed ${dark ? '#334155' : '#bae6fd'}`, background: dark ? 'rgba(255,255,255,0.02)' : '#f0f7ff',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '4px', color: dark ? '#475569' : '#94a3b8', fontSize: '0.7rem', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.color = accent; e.currentTarget.style.background = dark ? 'rgba(14,165,233,0.08)' : '#e0f2fe'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? '#334155' : '#bae6fd'; e.currentTarget.style.color = dark ? '#475569' : '#94a3b8'; e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.02)' : '#f0f7ff'; }}>
                  <span style={{ fontSize: '1.5rem' }}>+</span>
                  <span>Add photo</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} className="animate-spin" />
                Submitting…
              </>
            ) : 'Submit Daily Progress Report →'}
          </button>
        </form>
      </main>
    </div>
  );
}