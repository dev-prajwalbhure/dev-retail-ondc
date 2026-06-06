import React from 'react';
import { HeartPulse, Server, Activity } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const AnalyticsHealth: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Platform Health</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>System uptime, API latencies, and active user metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Global Uptime" value="99.99%" icon={<Activity />} trend="Last 30 Days" trendUp={true} />
        <StatCard label="Avg API Latency" value="124ms" icon={<Server />} trend="-12ms vs yesterday" trendUp={true} />
        <StatCard label="Active Sessions" value="1,204" icon={<HeartPulse />} trend="Normal load" trendUp={true} />
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <Activity size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Datadog Integration</h3>
         <p style={{ color: '#94a3b8' }}>Embed Datadog APM dashboards here.</p>
      </div>
    </div>
  );
};
export default AnalyticsHealth;
