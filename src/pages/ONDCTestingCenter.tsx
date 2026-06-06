import React, { useState } from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { Code } from 'lucide-react';
import { Modal } from '../components/Modal';

export const ONDCTestingCenter: React.FC = () => {
  const { ondcTransactions } = useAppStore();
  const [filter, setFilter] = useState('all');
  const [payloadModal, setPayloadModal] = useState<string | null>(null);

  const filtered = filter === 'all' ? ondcTransactions : ondcTransactions.filter(t => t.action === filter);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Transaction Explorer</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Inspect ONDC protocol messages and payloads</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['all', 'search', 'select', 'init', 'confirm', 'status', 'track', 'cancel'].map(a => (
          <button key={a} className={filter === a ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setFilter(a)}>
            {a === 'all' ? 'All' : a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Order</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Action</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Time (ms)</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Payload</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ fontSize: '0.7rem' }}>{t.id}</code></td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>{t.orderId || '—'}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>{t.action}</span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={t.status} /></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{t.responseTime}ms</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <button onClick={() => setPayloadModal(t.payload)} style={{ color: 'var(--primary)', padding: '0.25rem' }}><Code size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!payloadModal} onClose={() => setPayloadModal(null)} title="ONDC Message Payload" size="lg">
        <pre style={{ backgroundColor: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', overflow: 'auto', maxHeight: '400px', lineHeight: 1.6 }}>
          {payloadModal ? JSON.stringify(JSON.parse(payloadModal), null, 2) : ''}
        </pre>
      </Modal>
    </div>
  );
};

export default ONDCTestingCenter;
