import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const TSPSubscribers: React.FC = () => {
  const subscribers = [
    { id: 'SUB-101', name: 'Value Marketplace BAP', type: 'Buyer App', status: 'Active' },
    { id: 'SUB-102', name: 'Value Marketplace BPP', type: 'Seller App', status: 'Active' },
    { id: 'SUB-103', name: 'Logistics Partner', type: 'Logistics App', status: 'Pending' },
  ];

  const columns = [
    { header: 'Subscriber ID', accessor: 'id' as const },
    { header: 'Entity Name', accessor: 'name' as const },
    { header: 'Network Role', accessor: 'type' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Network Subscribers</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage NP (Network Participant) registrations on the TSP.</p>
      </div>
      <DataTable columns={columns} data={subscribers} />
    </div>
  );
};
export default TSPSubscribers;
