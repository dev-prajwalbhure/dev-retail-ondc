import React from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { Search } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, sellerProfiles } = useAppStore();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Marketplace Orders</h2>
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input" placeholder="Search orders..." style={{ paddingLeft: '2rem', width: '280px' }} />
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{orders.length} orders</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Order / Date</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Seller</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Gross</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Commission</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Seller Earn</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const seller = sellerProfiles.find(s => s.sellerId === order.sellerId);
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <p style={{ fontWeight: 600, margin: 0, color: 'var(--primary)' }}>{order.id}</p>
                      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.7rem' }}>{new Date(order.timestamp).toLocaleString()}</p>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{order.customerName}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{seller?.shopName || 'Unknown'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{order.grossAmount.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: 'var(--success)' }}>₹{order.commission.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>₹{order.sellerEarn.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={order.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
