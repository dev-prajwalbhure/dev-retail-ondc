import React from 'react';
import { Star } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';

export const AdminSellerReviews: React.FC = () => {
  const reviews = [
    { id: 'SREV-01', seller: 'TechStyle Hub', rating: 4, user: 'Ananya Desai', status: 'Approved' },
    { id: 'SREV-02', seller: 'FreshBasket India', rating: 5, user: 'Sanjay Gupta', status: 'Approved' },
    { id: 'SREV-03', seller: 'Gadget World', rating: 1, user: 'Priya Sharma', status: 'Flagged' },
  ];

  const columns = [
    { header: 'Review ID', accessor: 'id' as const },
    { header: 'Seller', accessor: 'seller' as const },
    { header: 'Rating', accessor: (row: any) => <div style={{display:'flex',gap:'0.25rem',alignItems:'center'}}><Star size={14} color="#f59e0b" fill="#f59e0b" />{row.rating}</div> },
    { header: 'User', accessor: 'user' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Seller Review Moderation</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor merchant reputation and handle disputes.</p>
      </div>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};
export default AdminSellerReviews;
