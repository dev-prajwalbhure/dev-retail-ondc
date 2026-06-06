import React from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';

export const AdminPayments: React.FC = () => {
  const { payoutRequests, sellerProfiles, processPayout, rejectPayout } = useAppStore();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Payout Requests</h2>
      <div className="card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Seller</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Method</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payoutRequests.map(req => {
              const seller = sellerProfiles.find(s => s.sellerId === req.sellerId);
              return (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{req.id}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{seller?.shopName || 'Unknown'}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{req.method}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 700 }}>₹{req.amount.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{new Date(req.timestamp).toLocaleDateString()}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={req.status} /></td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                    {req.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button onClick={() => processPayout(req.id)} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Process</button>
                        <button onClick={() => rejectPayout(req.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--danger)' }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
