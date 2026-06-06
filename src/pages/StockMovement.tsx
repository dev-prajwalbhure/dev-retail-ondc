import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowRight } from 'lucide-react';

export const StockMovement: React.FC = () => {
  const mockTransfers = [
    { id: 'TR-1001', product: 'Wireless Earbuds', from: 'BLR-HUB-01', to: 'DEL-HUB-02', quantity: 500, status: 'In Transit', date: '2023-10-25' },
    { id: 'TR-1002', product: 'Smart Watch', from: 'Supplier', to: 'BLR-HUB-01', quantity: 2000, status: 'Completed', date: '2023-10-24' },
    { id: 'TR-1003', product: 'Mechanical Keyboard', from: 'DEL-HUB-02', to: 'BOM-HUB-01', quantity: 150, status: 'Pending', date: '2023-10-26' },
  ];

  const columns = [
    { header: 'Transfer ID', accessor: 'id' as const },
    { header: 'Product', accessor: 'product' as const },
    { header: 'Route', accessor: (row: any) => <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}><span style={{ backgroundColor: 'var(--bg-base)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{row.from}</span> <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} /> <span style={{ backgroundColor: 'var(--bg-base)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{row.to}</span></div> },
    { header: 'Quantity', accessor: 'quantity' as const },
    { header: 'Date', accessor: 'date' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Stock Movement</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track inbound, outbound, and inter-node transfers.</p>
      </div>

      <DataTable columns={columns} data={mockTransfers} />
    </div>
  );
};

export default StockMovement;
