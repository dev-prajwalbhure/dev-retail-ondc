import React from 'react';
import { useAppStore } from '../store';
import { Star, MessageSquare } from 'lucide-react';

export const SellerReviewsView: React.FC<{ type: 'product' | 'seller' }> = ({ type }) => {
  const { reviews, products, currentUser, customers } = useAppStore();

  // Filter reviews for this seller
  const sellerReviews = reviews.filter(r => {
    if (r.type !== type) return false;
    if (type === 'seller') return r.targetId === currentUser?.id;
    if (type === 'product') {
      const product = products.find(p => p.id === r.targetId);
      return product?.sellerId === currentUser?.id;
    }
    return false;
  });

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem', textTransform: 'capitalize' }}>{type} Reviews</h2>
          <p className="text-muted" style={{ margin: 0 }}>Manage customer feedback and ratings.</p>
        </div>
      </div>

      <div className="card flex-col gap-4" style={{ padding: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Customer</th>
                {type === 'product' && <th style={{ padding: '1rem', fontWeight: 600 }}>Product</th>}
                <th style={{ padding: '1rem', fontWeight: 600 }}>Rating</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Comment</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerReviews.map(review => {
                const customer = customers.find(c => c.id === review.customerId);
                const product = type === 'product' ? products.find(p => p.id === review.targetId) : null;
                
                return (
                  <tr key={review.id} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
                    <td style={{ padding: '1rem' }}>
                      <div className="font-bold">{customer?.name || 'Anonymous'}</div>
                      <div className="text-secondary text-xs">{new Date(review.timestamp).toLocaleDateString()}</div>
                    </td>
                    {type === 'product' && (
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{product?.name}</td>
                    )}
                    <td style={{ padding: '1rem' }}>
                      <div className="flex text-warning">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', maxWidth: '300px' }}>
                      <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-secondary)' }}>"{review.comment}"</p>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        backgroundColor: review.status === 'Approved' ? 'var(--success-bg)' : 'var(--warning-bg)', 
                        color: review.status === 'Approved' ? 'var(--success)' : 'var(--warning)' 
                      }}>
                        {review.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button className="btn btn-outline flex items-center gap-2" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginLeft: 'auto' }}>
                        <MessageSquare size={14} /> Reply
                      </button>
                    </td>
                  </tr>
                );
              })}
              {sellerReviews.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No reviews found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerReviewsView;
