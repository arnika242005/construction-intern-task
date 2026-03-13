import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) navigate('/projects');
      else { setAuthError(result.error); setLoading(false); }
    }, 700);
  };

  const inputStyle = (hasError) => ({
    background: '#fff',
    border: `1.5px solid ${hasError ? '#f87171' : '#bae6fd'}`,
    color: '#1e293b',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    boxShadow: hasError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f0f7ff' }}>
      {/* Left branding panel */}
      <div style={{
        display: 'none', width: '50%', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, #0284c7 0%, #0369a1 100%)'
      }} className="lg:flex">
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px',
          borderRadius: '50%', opacity: 0.25, filter: 'blur(80px)',
          background: 'radial-gradient(circle, #7dd3fc, transparent)'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', color: '#0284c7', fontFamily: 'Barlow Condensed, sans-serif' }}>CF</div>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#fff', fontSize: '1rem', letterSpacing: '0.12em', fontWeight: 700 }}>CONSTRUCTFIELD</span>
          </div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.02, color: '#fff', margin: 0 }}>
            FIELD<br />
            <span style={{ color: '#bae6fd' }}>MANAGEMENT</span><br />
            PLATFORM
          </h1>
          <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '320px' }}>
            Track daily progress, manage teams, and submit reports from any construction site — in real time.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[['5+', 'Active Sites'], ['240+', 'Workers'], ['98%', 'Report Rate']].map(([n, l]) => (
            <div key={l} style={{ borderRadius: 12, padding: '16px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>{n}</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '2px 0 0' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} className="lg:w-1/2">
        <div style={{ width: '100%', maxWidth: '380px' }} className="animate-fade-up">

          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }} className="lg:hidden">
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem', color: '#fff' }}>CF</div>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#0284c7', fontSize: '1rem', letterSpacing: '0.12em', fontWeight: 700 }}>CONSTRUCTFIELD</span>
          </div>

          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#0c4a6e', margin: '0 0 4px' }}>Welcome back</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '28px' }}>Sign in to access your dashboard</p>

          {authError && (
            <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              ⚠ {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="test@test.com" style={inputStyle(errors.email)}
                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)'; }}
                onBlur={e => { if (!errors.email) { e.target.style.borderColor = '#bae6fd'; e.target.style.boxShadow = 'none'; }}}
              />
              {errors.email && <p style={{ color: '#dc2626', fontSize: '0.73rem', marginTop: '5px' }}>{errors.email}</p>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="••••••"
                  style={{ ...inputStyle(errors.password), paddingRight: '52px' }}
                  onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)'; }}
                  onBlur={e => { if (!errors.password) { e.target.style.borderColor = '#bae6fd'; e.target.style.boxShadow = 'none'; }}}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && <p style={{ color: '#dc2626', fontSize: '0.73rem', marginTop: '5px' }}>{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '4px' }}>
              {loading ? (
                <>
                  <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} className="animate-spin" />
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '12px 16px', borderRadius: '10px', textAlign: 'center', background: '#e0f2fe', border: '1px solid #bae6fd' }}>
            <p style={{ fontSize: '0.75rem', color: '#0369a1', margin: 0 }}>
              Demo: <span style={{ fontWeight: 700 }}>test@test.com</span> / <span style={{ fontWeight: 700 }}>123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}