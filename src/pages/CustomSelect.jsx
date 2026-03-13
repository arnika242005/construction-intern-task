import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomSelect({ options, value, onChange, placeholder, name, hasError }) {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const bg = dark ? '#1e293b' : '#fff';
  const border = hasError ? '#f87171' : (open ? '#0ea5e9' : (dark ? '#334155' : '#bae6fd'));
  const textColor = dark ? '#e2e8f0' : '#1e293b';
  const placeholderColor = dark ? '#475569' : '#94a3b8';
  const dropdownBg = dark ? '#1e293b' : '#fff';
  const dropdownBorder = dark ? '#334155' : '#e0f2fe';
  const hoverBg = dark ? 'rgba(56,189,248,0.08)' : '#f0f7ff';
  const activeBg = dark ? 'rgba(14,165,233,0.15)' : '#e0f2fe';
  const activeColor = dark ? '#38bdf8' : '#0284c7';

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: bg,
          border: `1.5px solid ${border}`,
          borderRadius: open ? '10px 10px 0 0' : '10px',
          padding: '11px 14px',
          fontSize: '0.875rem',
          color: selected ? textColor : placeholderColor,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: open ? '0 0 0 3px rgba(14,165,233,0.15)' : (hasError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none'),
          userSelect: 'none',
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          color: dark ? '#475569' : '#94a3b8',
          fontSize: '0.75rem',
        }}>▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: dropdownBg,
          border: `1.5px solid #0ea5e9`,
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
          boxShadow: dark ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 32px rgba(14,165,233,0.15)',
          overflow: 'hidden',
        }}>
          {options.map((opt, i) => (
            <div
              key={opt.value}
              onClick={() => { onChange({ target: { name, value: opt.value } }); setOpen(false); }}
              style={{
                padding: '10px 14px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: value === opt.value ? activeColor : textColor,
                background: value === opt.value ? activeBg : 'transparent',
                borderTop: i > 0 ? `1px solid ${dropdownBorder}` : 'none',
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