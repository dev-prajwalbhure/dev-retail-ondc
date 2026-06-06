import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const B2BRFQs: React.FC = () => {
  const rfqs = [
    { id: 'RFQ-2201', company: 'Reliance Retail', item: 'Office Chairs', quantity: 500, targetPrice: '₹4,500/ea', status: 'Open' },
    { id: 'RFQ-2202', company: 'Tata Enterprises', item: 'Laptops', quantity: 250, targetPrice: '₹45,000/ea', status: 'Negotiating' },
    { id: 'RFQ-2203', company: 'Infosys', item: 'Monitors', quantity: 1000, targetPrice: '₹8,000/ea', status: 'Closed' },
  ];

  const columns = [
    { header: 'RFQ ID', accessor: 'id' as const },
    { header: 'Company', accessor: 'company' as const },
    { header: 'Requested Item', accessor: 'item' as const },
    { header: 'Quantity', accessor: 'quantity' as const },
    { header: 'Target Price', accessor: 'targetPrice' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Request For Quotation (RFQ)</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Negotiate bulk pricing directly with enterprise buyers.</p>
      </div>
      <DataTable columns={columns} data={rfqs} />
    </div>
  );
};

export default B2BRFQs;
