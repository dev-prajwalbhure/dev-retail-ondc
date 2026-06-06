import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const QuickCommerceStores: React.FC = () => {
  const stores = [
    { id: 'DS-001', name: 'Koramangala Dark Store', radius: '3km', inventory: 4500, status: 'Active' },
    { id: 'DS-002', name: 'Indiranagar Hub', radius: '4km', inventory: 3200, status: 'Active' },
    { id: 'DS-003', name: 'HSR Layout Node', radius: '2.5km', inventory: 5100, status: 'Maintenance' },
  ];

  const columns = [
    { header: 'Store ID', accessor: 'id' as const },
    { header: 'Store Name', accessor: 'name' as const },
    { header: 'Delivery Radius', accessor: 'radius' as const },
    { header: 'Active Inventory', accessor: 'inventory' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Dark Stores</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage hyperlocal fulfillment nodes.</p>
      </div>
      <DataTable columns={columns} data={stores} />
    </div>
  );
};

export default QuickCommerceStores;
