import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const B2BAccounts: React.FC = () => {
  const accounts = [
    { id: 'CORP-001', company: 'Reliance Retail', contact: 'Rakesh Mehta', tier: 'Platinum', creditLimit: '₹5,000,000', status: 'Active' },
    { id: 'CORP-002', company: 'Tata Enterprises', contact: 'Aman Singh', tier: 'Gold', creditLimit: '₹2,500,000', status: 'Active' },
    { id: 'CORP-003', company: 'Future Group', contact: 'Sneha Patel', tier: 'Silver', creditLimit: '₹500,000', status: 'Pending Approval' },
  ];

  const columns = [
    { header: 'Account ID', accessor: 'id' as const },
    { header: 'Company Name', accessor: 'company' as const },
    { header: 'Primary Contact', accessor: 'contact' as const },
    { header: 'Tier', accessor: 'tier' as const },
    { header: 'Credit Limit', accessor: 'creditLimit' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Corporate Accounts</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage verified enterprise buyers and their credit limits.</p>
      </div>
      <DataTable columns={columns} data={accounts} />
    </div>
  );
};

export default B2BAccounts;
