import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast } = useToast();
  if (!toast) return null;

  const configs = {
    success: { icon: '✓', bg: '#13151f', border: 'rgba(52,211,153,0.4)', iconBg: '#34d399', iconColor: '#0f1117', textColor: '#d1fae5' },
    error:   { icon: '✕', bg: '#13151f', border: 'rgba(248,113,113,0.4)', iconBg: '#f87171', iconColor: '#fff',    textColor: '#fee2e2' },
  };
  const c = configs[toast.type] || configs.success;

  return (
    <div className="animate-slide-in" style={{
      position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '14px', padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      maxWidth: '340px',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.iconBg, color: c.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
        {c.icon}
      </div>
      <p style={{ color: c.textColor, fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>{toast.message}</p>
    </div>
  );
}