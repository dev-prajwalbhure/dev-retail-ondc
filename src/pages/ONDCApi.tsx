import React from 'react';
import { Terminal } from 'lucide-react';

export const ONDCApi: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>API Explorer</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Test and interact directly with ONDC Protocol APIs.</p>
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <Terminal size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>GraphQL / REST Sandbox</h3>
         <p style={{ color: '#94a3b8' }}>Connect Swagger or GraphiQL interface here.</p>
      </div>
    </div>
  );
};
export default ONDCApi;
