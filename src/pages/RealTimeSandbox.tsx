import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Play, CheckCircle, XCircle, Code } from 'lucide-react';

export const RealTimeSandbox: React.FC = () => {
  const { addOndcLog } = useAppStore();
  const [action, setAction] = useState('search');
  const [logs, setLogs] = useState<{ action: string; status: string; time: string; payload: string }[]>([]);

  const simulate = () => {
    const statuses = ['success', 'success', 'success', 'error'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const payload = JSON.stringify({ context: { action, domain: 'ONDC:RET10', timestamp: new Date().toISOString() }, message: status === 'error' ? { error: { code: '40001', message: 'Simulated error' } } : { ack: { status: 'ACK' } } }, null, 2);
    const entry = { action, status, time: new Date().toLocaleTimeString(), payload };
    setLogs(prev => [entry, ...prev]);
    addOndcLog({ id: Date.now(), event: action, status, payload: JSON.parse(payload) });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>ONDC API Sandbox</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Simulate ONDC protocol API calls</p>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <select className="input" style={{ width: '200px' }} value={action} onChange={e => setAction(e.target.value)}>
            {['search', 'select', 'init', 'confirm', 'status', 'track', 'cancel', 'update', 'support', 'rating'].map(a => (
              <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={simulate}><Play size={14} /> Execute</button>
        </div>

        {logs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {logs.slice(0, 10).map((log, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${log.status === 'success' ? 'var(--success)' : 'var(--danger)'}` }}>
                {log.status === 'success' ? <CheckCircle size={16} style={{ color: 'var(--success)', marginTop: '0.1rem', flexShrink: 0 }} /> : <XCircle size={16} style={{ color: 'var(--danger)', marginTop: '0.1rem', flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase' }}>{log.action}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.time}</span>
                  </div>
                  <pre style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', overflow: 'auto', maxHeight: '120px', margin: 0 }}>{log.payload}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
        {logs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Code size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>Select an action and click Execute to simulate an ONDC API call.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeSandbox;
