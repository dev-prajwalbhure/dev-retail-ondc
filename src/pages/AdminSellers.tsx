import React from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { CheckCircle, XCircle, Search } from 'lucide-react';

export const AdminSellers: React.FC = () => {
  const { sellerProfiles, approveSeller, suspendSeller, orders } = useAppStore();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Seller Management</h2>
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input" placeholder="Search sellers..." style={{ paddingLeft: '2rem', width: '280px' }} />
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{sellerProfiles.length} sellers</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Seller</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>GST</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Revenue</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Orders</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Commission</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Rating</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerProfiles.map(profile => {
              const sellerRevenue = orders.filter(o => o.sellerId === profile.sellerId).reduce((sum, o) => sum + o.grossAmount, 0);
              const sellerOrderCount = orders.filter(o => o.sellerId === profile.sellerId).length;
              return (
                <tr key={profile.sellerId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={profile.logoUrl} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontWeight: 600, margin: 0 }}>{profile.shopName}</p>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.7rem' }}>Joined {profile.joinedDate}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-base)', padding: '0.1rem 0.3rem', borderRadius: '2px' }}>{profile.gstNumber}</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{sellerRevenue.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{sellerOrderCount}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{profile.commissionRate}%</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>⭐ {profile.rating}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={profile.status} /></td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                      <button onClick={() => approveSeller(profile.sellerId)} style={{ color: 'var(--success)', padding: '0.25rem' }} title="Approve"><CheckCircle size={16} /></button>
                      <button onClick={() => suspendSeller(profile.sellerId)} style={{ color: 'var(--danger)', padding: '0.25rem' }} title="Suspend"><XCircle size={16} /></button>
                    </div>
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

export default AdminSellers;
