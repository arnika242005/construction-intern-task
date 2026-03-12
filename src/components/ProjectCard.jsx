import { useNavigate } from 'react-router-dom';

const STATUS = {
  'active':    { label: 'Active',    color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)'  },
  'on-hold':   { label: 'On Hold',   color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)'  },
  'completed': { label: 'Completed', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.2)'  },
};

export default function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  const s = STATUS[project.status];

  return (
    <div onClick={() => navigate(`/dpr/${project.id}`)}
      className="card-hover"
      style={{
        background: '#13151f',
        border: '1px solid #1e2130',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        animation: `fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s both`,
      }}>

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, flex: 1 }}>
          {project.name}
        </span>
        <span style={{
          flexShrink: 0, fontSize: '0.65rem', fontWeight: 700, padding: '4px 10px', borderRadius: '999px',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: s.color, background: s.bg, border: `1px solid ${s.border}`,
          display: 'flex', alignItems: 'center', gap: '5px'
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
          {s.label}
        </span>
      </div>

      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '16px', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[['📅 Start Date', new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })],
          ['📍 Location', project.location],
          ['👷 Manager', project.manager]
        ].map(([label, val]) => (
          <div key={label} style={{ gridColumn: label.includes('Manager') ? '1 / -1' : undefined }}>
            <p style={{ fontSize: '0.6rem', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: '0.8rem', color: '#d1d5db', fontWeight: 500 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ borderTop: '1px solid #1e2130', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#fb923c', fontWeight: 600 }}>Open DPR Form</span>
        <span style={{ color: '#fb923c', fontSize: '1rem' }}>→</span>
      </div>
    </div>
  );
}