import React from 'react';
import { useAppStore } from '../store';
import { Download, Repeat } from 'lucide-react';

export const SellerTransactions: React.FC = () => {
  const { orders, sellerProfiles, currentUser } = useAppStore();
  
  const profile = sellerProfiles.find(s => s.sellerId === currentUser?.id) || sellerProfiles[0];
  const sellerOrders = orders.filter(o => o.sellerId === profile.sellerId && o.status === 'Delivered');

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>Transactions & Earnings</h2>
          <p className="text-muted" style={{ margin: 0 }}>View your ledger and settled transactions.</p>
        </div>
        <button className="btn btn-outline flex gap-2 items-center"><Download size={16} /> Export CSV</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1rem' }}>
        <div className="card">
          <p className="text-secondary mb-1">Total Sales Amount</p>
          <h3 style={{ fontSize: '2rem', margin: 0 }}>${profile.totalSales.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </div>
        <div className="card">
          <p className="text-secondary mb-1">Total Commission Paid</p>
          <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--danger)' }}>${(profile.totalSales * (profile.commissionRate/100)).toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </div>
        <div className="card">
          <p className="text-secondary mb-1">Net Earnings</p>
          <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--success)' }}>${(profile.totalSales - (profile.totalSales * (profile.commissionRate/100))).toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
        </div>
      </div>

      <div className="card flex-col gap-4" style={{ padding: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Transaction ID</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Gross Amount</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Commission ({profile.commissionRate}%)</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Net Earned</th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div className="font-bold flex gap-2 items-center"><Repeat size={14} className="text-primary" /> TXN-{Math.floor(Math.random() * 90000) + 10000}</div>
                    <div className="text-secondary text-xs">{order.timestamp.replace('T', ' ').substring(0, 19)}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{order.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${order.grossAmount.toFixed(2)}</td>
                  <td style={{ padding: '1rem', color: 'var(--danger)' }}>-${order.commission.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--success)' }}>${order.sellerEarn.toFixed(2)}</td>
                </tr>
              ))}
              {sellerOrders.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No completed transactions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerTransactions;
