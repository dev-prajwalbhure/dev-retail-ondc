import React from 'react';
import { TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const AnalyticsRevenue: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Revenue Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Deep-dive into marketplace GMV, commissions, and seller payouts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Total GMV" value="₹24.5M" icon={<TrendingUp />} trend="+12% MoM" trendUp={true} />
        <StatCard label="Platform Revenue" value="₹3.6M" icon={<DollarSign />} trend="+15% MoM" trendUp={true} />
        <StatCard label="Pending Payouts" value="₹1.2M" icon={<PieChart />} trend="Due this week" trendUp={false} />
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <TrendingUp size={48} style={{ color: '#f59e0b', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Financial Visualization</h3>
         <p style={{ color: '#94a3b8' }}>Connect to PowerBI or Metabase for advanced graphing.</p>
      </div>
    </div>
  );
};
export default AnalyticsRevenue;
