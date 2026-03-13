import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

const FILTERS = ['all', 'active', 'on-hold', 'completed'];

export default function ProjectList() {
  const { dark } = useTheme();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bg = dark ? '#0d1117' : '#f0f7ff';
  const cardBg = dark ? '#0f172a' : '#fff';
  const border = dark ? '#1e293b' : '#e0f2fe';
  const textMain = dark ? '#e2e8f0' : '#0c4a6e';
  const textSub = dark ? '#64748b' : '#64748b';
  const accent = dark ? '#38bdf8' : '#0284c7';
  const inputBg = dark ? '#1e293b' : '#f8fafc';

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', flexDirection: 'column', transition: 'background 0.3s' }}>
      <Navbar title="Projects" />

      <main style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '28px 16px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '0.7rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
            Construction Field Management
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.6rem', fontWeight: 800, color: textMain, margin: '0 0 6px', transition: 'color 0.3s' }}>
            Active Projects
          </h1>
          <p style={{ color: textSub, fontSize: '0.875rem' }}>Select a project to submit a Daily Progress Report</p>
        </div>

        {/* Search + Filter bar */}
        <div style={{
          background: cardBg, border: `1.5px solid ${border}`, borderRadius: '14px',
          padding: '12px 14px', marginBottom: '24px',
          display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',
          boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(14,165,233,0.07)',
          transition: 'background 0.3s, border-color 0.3s',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '180px' }}>
            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: dark ? '#475569' : '#94a3b8', fontSize: '0.85rem' }}>🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or location…"
              style={{
                background: inputBg, border: `1.5px solid ${border}`, color: dark ? '#e2e8f0' : '#1e293b',
                borderRadius: '9px', padding: '8px 12px 8px 32px', fontSize: '0.83rem',
                width: '100%', outline: 'none', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = '#38bdf8'; }}
              onBlur={e => { e.target.style.borderColor = border; }}
            />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: border }} className="hidden sm:block" />

          {/* Filter label */}
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: dark ? '#475569' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filter:</span>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                style={{
                  padding: '6px 13px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
                  cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
                  background: statusFilter === f ? '#0ea5e9' : (dark ? 'rgba(255,255,255,0.05)' : '#f0f7ff'),
                  color: statusFilter === f ? '#fff' : (dark ? '#94a3b8' : '#475569'),
                  border: statusFilter === f ? '1px solid #0ea5e9' : `1px solid ${border}`,
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                {f === 'all' ? 'All' : f === 'on-hold' ? 'On Hold' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Count + sort hint */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: dark ? '#475569' : '#94a3b8' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          </p>
          <p style={{ fontSize: '0.72rem', color: dark ? '#334155' : '#cbd5e1' }}>Click a card to open DPR →</p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: dark ? '#334155' : '#94a3b8' }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🏗️</p>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.3rem', color: dark ? '#475569' : '#64748b', fontWeight: 700 }}>No projects match your search</p>
            <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Try adjusting your filters</p>
          </div>
        )}
      </main>

    </div>
  );
}