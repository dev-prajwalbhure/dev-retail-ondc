import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusColors: Record<string, { bg: string; text: string }> = {
  'Active': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'Approved': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'Delivered': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'Processed': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'Paid': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'success': { bg: 'var(--success-bg)', text: 'var(--success)' },
  'Pending': { bg: 'var(--warning-bg)', text: 'var(--warning)' },
  'Processing': { bg: 'var(--warning-bg)', text: 'var(--warning)' },
  'In Transit': { bg: 'var(--warning-bg)', text: 'var(--warning)' },
  'Open': { bg: 'var(--warning-bg)', text: 'var(--warning)' },
  'pending': { bg: 'var(--warning-bg)', text: 'var(--warning)' },
  'Shipped': { bg: '#dbeafe', text: '#2563eb' },
  'Created': { bg: '#dbeafe', text: '#2563eb' },
  'Picked Up': { bg: '#dbeafe', text: '#2563eb' },
  'Out for Delivery': { bg: '#dbeafe', text: '#2563eb' },
  'Rejected': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Cancelled': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Returned': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Suspended': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Refunded': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Exception': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'error': { bg: 'var(--danger-bg)', text: 'var(--danger)' },
  'Inactive': { bg: '#f1f5f9', text: '#64748b' },
  'Expired': { bg: '#f1f5f9', text: '#64748b' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const colors = statusColors[status] || { bg: '#f1f5f9', text: '#64748b' };
  return (
    <span style={{
      padding: size === 'sm' ? '0.2rem 0.6rem' : '0.3rem 0.75rem',
      borderRadius: 'var(--radius-full)',
      fontSize: size === 'sm' ? '0.7rem' : '0.8rem',
      fontWeight: 600,
      backgroundColor: colors.bg,
      color: colors.text,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;
