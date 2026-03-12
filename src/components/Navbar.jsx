import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ title, showBack }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{
      background: '#13151f',
      borderBottom: '1px solid #1e2130',
      padding: '0 20px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showBack && (
          <button onClick={() => navigate('/projects')}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2d3a', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', color: '#9ca3af', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,146,60,0.1)'; e.currentTarget.style.borderColor = 'rgba(251,146,60,0.3)'; e.currentTarget.style.color = '#fb923c'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = '#2a2d3a'; e.currentTarget.style.color = '#9ca3af'; }}
          >
            ← Back
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 30, height: 30, background: '#fb923c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '0.7rem', color: '#0f1117' }}>CF</div>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#fff', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.05em' }}>{title}</span>
        </div>
      </div>
      <button onClick={() => { logout(); navigate('/'); }}
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2d3a', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500, transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.color = '#fca5a5'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = '#2a2d3a'; e.currentTarget.style.color = '#9ca3af'; }}
      >
        Logout
      </button>
    </header>
  );
}