import React from 'react';
import { StatCard } from '../components/StatCard';
import { Server, Globe, CheckCircle, AlertTriangle } from 'lucide-react';

export const TSPDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>TSP Control Center</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Manage ONDC network subscriptions and environments</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<Server size={20} />} label="Active Subscribers" value={12} trend="3 new" trendUp />
        <StatCard icon={<Globe size={20} />} label="Network Calls (24h)" value="2,847" trend="18%" trendUp />
        <StatCard icon={<CheckCircle size={20} />} label="Success Rate" value="99.2%" trend="0.3%" trendUp />
        <StatCard icon={<AlertTriangle size={20} />} label="Error Rate" value="0.8%" trend="Stable" trendUp />
      </div>

      {/* Environments */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem' }}>Registered Environments</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Environment</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Domain</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>API Calls (24h)</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Uptime</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Production', domain: 'prod.ondc.valuemarketplace.com', status: 'Active', calls: 2341, uptime: '99.98%' },
              { name: 'Staging', domain: 'staging.ondc.valuemarketplace.com', status: 'Active', calls: 506, uptime: '99.95%' },
              { name: 'Pre-Production', domain: 'preprod.ondc.valuemarketplace.com', status: 'Active', calls: 0, uptime: '100%' },
            ].map((env, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                    {env.name}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-base)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>{env.domain}</code></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--success)', backgroundColor: 'var(--success-bg)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>{env.status}</span></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{env.calls.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600, color: 'var(--success)' }}>{env.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subscriber Registry */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem' }}>ONDC Subscriber Registry</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Subscriber ID</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Domain</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>City</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Signing Key</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'vm-bpp-1', type: 'BPP', domain: 'ONDC:RET10', city: 'std:022', key: '✅ Valid' },
              { id: 'vm-bpp-2', type: 'BPP', domain: 'ONDC:RET11', city: 'std:011', key: '✅ Valid' },
              { id: 'vm-bap-1', type: 'BAP', domain: 'ONDC:RET10', city: '*', key: '✅ Valid' },
            ].map((sub, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{sub.id}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ padding: '0.1rem 0.4rem', backgroundColor: sub.type === 'BPP' ? '#dbeafe' : '#fef3c7', color: sub.type === 'BPP' ? '#2563eb' : '#d97706', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontWeight: 600 }}>{sub.type}</span></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{sub.domain}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{sub.city}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{sub.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TSPDashboard;
