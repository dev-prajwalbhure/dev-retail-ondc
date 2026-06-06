import React from 'react';
import { Settings, Percent } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const AdminCommission: React.FC = () => {
  const rules = [
    { id: 'CR-001', category: 'Electronics', rate: '15%', lastUpdated: '01-Jan-2025', status: 'Active' },
    { id: 'CR-002', category: 'Groceries', rate: '8%', lastUpdated: '15-Feb-2025', status: 'Active' },
    { id: 'CR-003', category: 'Fashion', rate: '20%', lastUpdated: '10-Mar-2025', status: 'Active' },
  ];

  const columns = [
    { header: 'Rule ID', accessor: 'id' as const },
    { header: 'Category', accessor: 'category' as const },
    { header: 'Commission Rate', accessor: 'rate' as const },
    { header: 'Last Updated', accessor: 'lastUpdated' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Commission Configuration</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage platform take-rates and category-specific fees.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Avg Platform Commission" value="14.3%" icon={<Percent />} trend="+0.2% MoM" trendUp={true} />
        <StatCard label="Total Categories Configured" value={24} icon={<Settings />} trend="Fully mapped to ONDC" trendUp={true} />
      </div>

      <DataTable columns={columns} data={rules} />
    </div>
  );
};
export default AdminCommission;
