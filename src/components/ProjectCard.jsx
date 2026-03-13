import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const STATUS = {
  'active':    { label: 'Active',    color: '#059669', bg: '#ecfdf5', bgDark: 'rgba(5,150,105,0.12)', border: '#6ee7b7' },
  'on-hold':   { label: 'On Hold',   color: '#d97706', bg: '#fffbeb', bgDark: 'rgba(217,119,6,0.12)',  border: '#fcd34d' },
  'completed': { label: 'Completed', color: '#0284c7', bg: '#e0f2fe', bgDark: 'rgba(2,132,199,0.12)',  border: '#7dd3fc' },
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const s = STATUS[project.status];

  const cardBg = dark ? '#0f172a' : '#fff';
  const borderColor = dark ? '#1e293b' : '#e0f2fe';
  const titleColor = dark ? '#e2e8f0' : '#0c4a6e';
  const descColor = dark ? '#64748b' : '#64748b';
  const metaLabel = dark ? '#334155' : '#94a3b8';
  const metaVal = dark ? '#cbd5e1' : '#334155';
  const divider = dark ? '#1e293b' : '#e0f2fe';
  const accentColor = dark ? '#38bdf8' : '#0284c7';

  return (
    <div onClick={() => navigate(`/dpr/${project.id}`)}
      style={{
        background: cardBg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.3s',
        boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(14,165,233,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = dark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 16px 40px rgba(14,165,233,0.15)';
        e.currentTarget.style.borderColor = '#38bdf8';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = dark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(14,165,233,0.05)';
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: titleColor, lineHeight: 1.2, flex: 1, transition: 'color 0.3s' }}>
          {project.name}
        </span>
        <span style={{
          flexShrink: 0, fontSize: '0.63rem', fontWeight: 700, padding: '4px 10px', borderRadius: '999px',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: s.color, background: dark ? s.bgDark : s.bg, border: `1px solid ${s.border}`,
          display: 'flex', alignItems: 'center', gap: '5px'
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: descColor, fontSize: '0.82rem', marginBottom: '16px', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Meta */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[
          ['Start Date', new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })],
          ['Location', project.location],
          ['Manager', project.manager]
        ].map(([label, val]) => (
          <div key={label} style={{ gridColumn: label.includes('Manager') ? '1 / -1' : undefined }}>
            <p style={{ fontSize: '0.6rem', color: metaLabel, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: '0.82rem', color: metaVal, fontWeight: 500, margin: 0, transition: 'color 0.3s' }}>{val}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${divider}`, paddingTop: '12px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: accentColor, fontWeight: 600 }}>Open DPR Form</span>
        <span style={{ color: accentColor, fontSize: '1rem' }}>→</span>
      </div>
    </div>
  );
}