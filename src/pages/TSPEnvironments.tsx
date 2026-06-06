import React from 'react';
import { Server } from 'lucide-react';

export const TSPEnvironments: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Environments</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage Pre-prod and Production TSP environments.</p>
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <Server size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Infrastructure Control</h3>
         <p style={{ color: '#94a3b8' }}>Connect to AWS/GCP APIs to manage container deployments.</p>
      </div>
    </div>
  );
};
export default TSPEnvironments;
