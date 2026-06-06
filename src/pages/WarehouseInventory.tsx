import React from 'react';
import { useAppStore } from '../store';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const WarehouseInventory: React.FC = () => {
  const { products } = useAppStore();

  const columns = [
    { header: 'Product ID', accessor: 'id' as const },
    { header: 'Product Name', accessor: (row: any) => <div><p style={{ margin: 0, fontWeight: 500 }}>{row.name}</p><p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.category}</p></div> },
    { header: 'Brand', accessor: 'brand' as const },
    { header: 'Global Stock', accessor: (row: any) => <span style={{ fontWeight: 600 }}>{row.stock}</span> },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.stock > 0 ? 'In Stock' : 'Out of Stock'} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Global Inventory</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>View stock levels across all fulfillment nodes.</p>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default WarehouseInventory;
