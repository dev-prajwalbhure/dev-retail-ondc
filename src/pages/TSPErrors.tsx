import React from 'react';
import { DataTable } from '../components/DataTable';

export const TSPErrors: React.FC = () => {
  const errors = [
    { id: 'ERR-4001', endpoint: '/on_search', message: 'Invalid Signature', severity: 'High', timestamp: '10 mins ago' },
    { id: 'ERR-4002', endpoint: '/select', message: 'Item Out of Stock', severity: 'Low', timestamp: '2 hours ago' },
  ];

  const columns = [
    { header: 'Error ID', accessor: 'id' as const },
    { header: 'Endpoint', accessor: 'endpoint' as const },
    { header: 'Message', accessor: 'message' as const },
    { header: 'Severity', accessor: 'severity' as const },
    { header: 'Time', accessor: 'timestamp' as const },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Error Monitor</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track NACKs and schema validation errors across the network.</p>
      </div>
      <DataTable columns={columns} data={errors} />
    </div>
  );
};
export default TSPErrors;
