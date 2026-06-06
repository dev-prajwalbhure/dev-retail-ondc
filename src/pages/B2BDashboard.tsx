import React from 'react';
import { StatCard } from '../components/StatCard';
import { Building2, FileText, ShoppingCart, TrendingUp } from 'lucide-react';

export const B2BDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>B2B Enterprise Commerce</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage corporate accounts, bulk orders, and custom pricing.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Active Corp Accounts" value={42} icon={<Building2 />} trend="+3 this month" trendUp={true} />
        <StatCard label="Pending RFQs" value={12} icon={<FileText />} trend="Requires action" trendUp={false} />
        <StatCard label="Bulk Orders" value={156} icon={<ShoppingCart />} trend="+15% MoM" trendUp={true} />
        <StatCard label="Avg Order Value" value="₹1.2M" icon={<TrendingUp />} trend="+5% MoM" trendUp={true} />
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <Building2 size={48} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise Analytics Module</h3>
         <p style={{ color: '#94a3b8' }}>Connect to ERP to visualize enterprise purchase patterns.</p>
      </div>
    </div>
  );
};

export default B2BDashboard;
