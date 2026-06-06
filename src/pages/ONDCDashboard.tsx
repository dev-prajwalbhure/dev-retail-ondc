import React from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';

import { Globe, CheckCircle, XCircle, Clock } from 'lucide-react';

export const ONDCDashboard: React.FC = () => {
  const { ondcTransactions } = useAppStore();
  const successCount = ondcTransactions.filter(t => t.status === 'success').length;
  const errorCount = ondcTransactions.filter(t => t.status === 'error').length;
  const avgResponse = Math.round(ondcTransactions.reduce((sum, t) => sum + t.responseTime, 0) / (ondcTransactions.length || 1));

  const actionCounts: Record<string, number> = {};
  ondcTransactions.forEach(t => { actionCounts[t.action] = (actionCounts[t.action] || 0) + 1; });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>ONDC Network Health</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Real-time ONDC transaction monitoring</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<Globe size={20} />} label="Total Transactions" value={ondcTransactions.length} trend="12%" trendUp />
        <StatCard icon={<CheckCircle size={20} />} label="Successful" value={successCount} trend={`${Math.round(successCount / (ondcTransactions.length || 1) * 100)}%`} trendUp />
        <StatCard icon={<XCircle size={20} />} label="Errors" value={errorCount} trend={errorCount > 0 ? 'Needs attention' : 'Clean'} trendUp={errorCount === 0} />
        <StatCard icon={<Clock size={20} />} label="Avg Response (ms)" value={avgResponse} />
      </div>

      {/* Action Distribution */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem' }}>ONDC Action Distribution</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['search', 'select', 'init', 'confirm', 'status', 'track', 'update', 'cancel', 'support', 'rating'].map(action => (
            <div key={action} style={{ padding: '0.75rem 1.25rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '90px' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{actionCounts[action] || 0}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, textTransform: 'capitalize' }}>{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Log */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem' }}>Transaction Log</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Timestamp</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Order</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Action</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Response (ms)</th>
            </tr>
          </thead>
          <tbody>
            {ondcTransactions.slice(0, 10).map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{new Date(t.timestamp).toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>{t.orderId || '—'}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>{t.action}</span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={t.status} /></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 500 }}>{t.responseTime}ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ONDCDashboard;
