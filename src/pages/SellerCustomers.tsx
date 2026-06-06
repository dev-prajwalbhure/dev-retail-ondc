import React from 'react';
import { useAppStore } from '../store';
import { Search, Mail, MapPin } from 'lucide-react';

export const SellerCustomers: React.FC = () => {
  const { customers, orders, currentUser } = useAppStore();

  // Find unique customers who bought from this seller
  const sellerCustomerIds = [...new Set(orders.filter(o => o.sellerId === currentUser?.id).map(o => o.customerId))];
  const sellerCustomersList = customers.filter(c => sellerCustomerIds.includes(c.id));

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>Customer Base</h2>
          <p className="text-muted" style={{ margin: 0 }}>View shoppers who have purchased from your ONDC store.</p>
        </div>
      </div>

      <div className="card flex-col gap-4" style={{ padding: '1.5rem' }}>
        <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="Search customers..." className="input" style={{ width: '300px', paddingRight: '2.5rem' }} />
            <Search size={16} className="text-muted" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Customer Name</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Contact Email</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Total Orders</th>
              </tr>
            </thead>
            <tbody>
              {sellerCustomersList.map(customer => {
                const orderCount = orders.filter(o => o.sellerId === currentUser?.id && o.customerId === customer.id).length;
                return (
                  <tr key={customer.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{customer.name}</td>
                    <td style={{ padding: '1rem' }}><div className="flex items-center gap-2"><Mail size={14} className="text-muted"/> {customer.email}</div></td>
                    <td style={{ padding: '1rem' }}><div className="flex items-center gap-2"><MapPin size={14} className="text-muted"/> {customer.location}</div></td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>{orderCount}</td>
                  </tr>
                );
              })}
              {sellerCustomersList.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerCustomers;
