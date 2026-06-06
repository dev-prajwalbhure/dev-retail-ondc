import React from 'react';
import { StatCard } from '../components/StatCard';
import { Truck, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const LogisticsDashboard: React.FC = () => {
  const activeFleets = [
    { id: 'FLT-01', carrier: 'Shadowfax (ONDC)', activeRiders: 45, onTimeRate: '96%', status: 'Active' },
    { id: 'FLT-02', carrier: 'Dunzo (ONDC)', activeRiders: 28, onTimeRate: '94%', status: 'Active' },
    { id: 'FLT-03', carrier: 'Delhivery (Direct)', activeRiders: 112, onTimeRate: '98%', status: 'Active' },
    { id: 'FLT-04', carrier: 'XpressBees (Direct)', activeRiders: 0, onTimeRate: '-', status: 'Inactive' },
  ];

  const columns = [
    { header: 'Fleet ID', accessor: 'id' as const },
    { header: 'Logistics Partner', accessor: 'carrier' as const },
    { header: 'Active Riders', accessor: 'activeRiders' as const },
    { header: 'On-Time SLA', accessor: 'onTimeRate' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Logistics Operations Hub</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor multi-carrier fulfillment across ONDC and 3rd-party networks.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Total Active Fleets" value={3} icon={<Truck />} trend="All networks operational" trendUp={true} />
        <StatCard label="Live Deliveries" value={482} icon={<MapPin />} trend="+12% from yesterday" trendUp={true} />
        <StatCard label="Avg Fulfillment Time" value="1.2 Days" icon={<Clock />} trend="-4 hours vs last week" trendUp={true} />
        <StatCard label="ONDC Delivery Share" value="48%" icon={<ShieldCheck />} trend="Growing network usage" trendUp={true} />
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Carrier Performance & SLA</h3>
        <DataTable columns={columns} data={activeFleets} />
      </div>
    </div>
  );
};

export default LogisticsDashboard;
