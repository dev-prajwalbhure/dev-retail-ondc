import React from 'react';
import { BarChart2 } from 'lucide-react';

export const ONDCMonitoring: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Network Monitoring</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Real-time telemetry of ONDC network health and uptime.</p>
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <BarChart2 size={48} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Grafana / Kibana Dashboard</h3>
         <p style={{ color: '#94a3b8' }}>Embed telemetry visualizations here.</p>
      </div>
    </div>
  );
};
export default ONDCMonitoring;
