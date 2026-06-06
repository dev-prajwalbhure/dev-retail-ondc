import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const B2BOrders: React.FC = () => {
  const orders = [
    { id: 'PO-991', company: 'Infosys', items: 1000, total: '₹8,000,000', status: 'Shipped', expectedDelivery: '12-Oct-2025' },
    { id: 'PO-992', company: 'Tata Enterprises', items: 50, total: '₹250,000', status: 'Processing', expectedDelivery: '15-Oct-2025' },
    { id: 'PO-993', company: 'Reliance Retail', items: 500, total: '₹2,250,000', status: 'Delivered', expectedDelivery: '01-Oct-2025' },
  ];

  const columns = [
    { header: 'PO Number', accessor: 'id' as const },
    { header: 'Company', accessor: 'company' as const },
    { header: 'Total Items', accessor: 'items' as const },
    { header: 'Total Value', accessor: 'total' as const },
    { header: 'Expected Delivery', accessor: 'expectedDelivery' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Purchase Orders</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track fulfillment of approved bulk B2B orders.</p>
      </div>
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default B2BOrders;
