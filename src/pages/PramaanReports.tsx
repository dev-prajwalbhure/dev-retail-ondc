import React from 'react';
import { Download } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const PramaanReports: React.FC = () => {
  const reports = [
    { id: 'RPT-001', date: '05-Oct-2025', title: 'Q3 Compliance Audit', score: '98%', status: 'Passed' },
    { id: 'RPT-002', date: '01-Oct-2025', title: 'Network Load Test', score: '92%', status: 'Passed' },
  ];

  const columns = [
    { header: 'Report ID', accessor: 'id' as const },
    { header: 'Date', accessor: 'date' as const },
    { header: 'Title', accessor: 'title' as const },
    { header: 'Compliance Score', accessor: 'score' as const },
    { header: 'Result', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Audit Reports</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Review historical compliance and certification reports.</p>
        </div>
        <button className="btn btn-primary"><Download size={18}/> Export CSV</button>
      </div>
      <DataTable columns={columns} data={reports} />
    </div>
  );
};
export default PramaanReports;
