import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  prefix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, trendUp = true, prefix = '' }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
          {icon}
        </div>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trendUp ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div>
        <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
