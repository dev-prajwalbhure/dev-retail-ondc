import React from 'react';
import { Star } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const AdminProductReviews: React.FC = () => {
  const reviews = [
    { id: 'REV-991', product: 'Wireless Headphones', rating: 5, user: 'Ananya Desai', status: 'Approved' },
    { id: 'REV-992', product: 'Office Chair', rating: 2, user: 'Sanjay Gupta', status: 'Flagged' },
    { id: 'REV-993', product: 'Smart Watch', rating: 4, user: 'Priya Sharma', status: 'Pending' },
  ];

  const columns = [
    { header: 'Review ID', accessor: 'id' as const },
    { header: 'Product', accessor: 'product' as const },
    { header: 'Rating', accessor: (row: any) => <div style={{display:'flex',gap:'0.25rem',alignItems:'center'}}><Star size={14} color="#f59e0b" fill="#f59e0b" />{row.rating}</div> },
    { header: 'User', accessor: 'user' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Product Review Moderation</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Approve, reject, or flag customer reviews on products.</p>
      </div>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};
export default AdminProductReviews;
