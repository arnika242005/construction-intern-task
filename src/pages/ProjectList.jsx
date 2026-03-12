import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';

const FILTERS = ['all', 'active', 'on-hold', 'completed'];

export default function ProjectList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <Navbar title="Projects" />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '0.7rem', color: '#fb923c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
            Construction Field Management
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
            Active Projects
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Select a project to submit a Daily Progress Report</p>
        </div>

        {/* Search + Filter bar */}
        <div style={{
          background: '#13151f', border: '1px solid #1e2130', borderRadius: '14px',
          padding: '14px 16px', marginBottom: '24px',
          display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: '0.85rem' }}>🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or location…"
              style={{
                background: '#0f1117', border: '1.5px solid #2a2d3a', color: '#e8e8e8',
                borderRadius: '9px', padding: '9px 12px 9px 34px', fontSize: '0.85rem',
                width: '100%', outline: 'none', fontFamily: 'DM Sans, sans-serif',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => { e.target.style.borderColor = '#fb923c'; }}
              onBlur={e => { e.target.style.borderColor = '#2a2d3a'; }}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                style={{
                  padding: '7px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                  cursor: 'pointer', textTransform: 'capitalize', border: 'none', transition: 'all 0.2s',
                  background: statusFilter === f ? '#fb923c' : 'rgba(255,255,255,0.05)',
                  color: statusFilter === f ? '#0f1117' : '#9ca3af',
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                {f === 'all' ? 'All' : f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{ fontSize: '0.75rem', color: '#4b5563', marginBottom: '16px' }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#4b5563' }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🏗️</p>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.3rem', color: '#6b7280', fontWeight: 700 }}>No projects match your search</p>
            <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}