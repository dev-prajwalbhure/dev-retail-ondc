import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const QuickCommerceLive: React.FC = () => {
  const liveOrders = [
    { id: 'QC-1001', store: 'Koramangala Dark Store', items: 4, amount: 450, status: 'Picking', elapsed: '4m 12s' },
    { id: 'QC-1002', store: 'Indiranagar Hub', items: 2, amount: 120, status: 'Out for Delivery', elapsed: '14m 05s' },
    { id: 'QC-1003', store: 'HSR Layout Node', items: 8, amount: 1200, status: 'Pending', elapsed: '0m 45s' },
  ];

  const columns = [
    { header: 'Order ID', accessor: 'id' as const },
    { header: 'Dark Store', accessor: 'store' as const },
    { header: 'Items', accessor: 'items' as const },
    { header: 'Amount', accessor: (row: any) => `₹${row.amount}` },
    { header: 'Elapsed Time', accessor: (row: any) => <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{row.elapsed}</span> },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Live Orders</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor active hyperlocal fulfillment.</p>
      </div>
      <DataTable columns={columns} data={liveOrders} />
    </div>
  );
};

export default QuickCommerceLive;
