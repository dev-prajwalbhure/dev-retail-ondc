import React from 'react';
import { Zap, Clock, MapPin, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const QuickCommerceDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Quick Commerce OS</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage sub-30 minute hyperlocal deliveries.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Active Dark Stores" value={14} icon={<MapPin />} trend="+1 this month" trendUp={true} />
        <StatCard label="Live Orders" value={182} icon={<Zap />} trend="Current spike" trendUp={true} />
        <StatCard label="Avg Delivery Time" value="18m 42s" icon={<Clock />} trend="-1m 12s vs last week" trendUp={true} />
        <StatCard label="Fulfillment Rate" value="99.2%" icon={<TrendingUp />} trend="+0.4%" trendUp={true} />
      </div>

      <div className="card" style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#0f172a', color: 'white' }}>
         <Zap size={48} style={{ color: '#f59e0b', margin: '0 auto 1rem' }} />
         <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Live Delivery Radar</h3>
         <p style={{ color: '#94a3b8' }}>Connect to Google Maps API to visualize active hyperlocal fleets.</p>
      </div>
    </div>
  );
};

export default QuickCommerceDashboard;
