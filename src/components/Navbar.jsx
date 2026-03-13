import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ title, showBack }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e0f2fe',
      padding: '0 20px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 1px 12px rgba(14,165,233,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {showBack && (
          <button onClick={() => navigate('/projects')}
            style={{ background: '#f0f7ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', color: '#0284c7', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e0f2fe'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0f7ff'; }}
          >
            ← Back
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '0.72rem', color: '#fff' }}>CF</div>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#0c4a6e', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em' }}>{title}</span>
        </div>
      </div>
      <button onClick={() => { logout(); navigate('/'); }}
        style={{ background: '#fff0f0', border: '1px solid #fecaca', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff0f0'; }}
      >
        Logout
      </button>
    </header>
  );
}