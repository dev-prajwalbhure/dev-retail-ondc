import React from 'react';
import { useAppStore } from '../store';
import { Package, Clock, Truck, CheckCircle, ChevronRight, Search } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const StorefrontOrders: React.FC = () => {
  const { orders, currentUser } = useAppStore();
  
  // In a real app we'd fetch only the current user's orders.
  // For this demo, we'll show all orders if not logged in, or just filter.
  const myOrders = currentUser ? orders.filter(o => o.customerId === currentUser.id) : orders;

  if (!currentUser) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Please log in to view your orders</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>My Orders</h1>
        
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="input" 
            style={{ paddingLeft: '2.5rem', width: '300px', borderRadius: 'var(--radius-full)' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>All Orders</button>
        <button className="btn" style={{ border: '1px solid var(--border)', backgroundColor: 'transparent' }}>In Transit</button>
        <button className="btn" style={{ border: '1px solid var(--border)', backgroundColor: 'transparent' }}>Delivered</button>
        <button className="btn" style={{ border: '1px solid var(--border)', backgroundColor: 'transparent' }}>Cancelled</button>
      </div>

      {myOrders.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem' }}>No orders found</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {myOrders.map(order => (
            <div key={order.id} className="card hover-scale" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.25rem' }}>Order Placed</p>
                    <p style={{ fontWeight: 600, margin: 0 }}>{new Date(order.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.25rem' }}>Total Amount</p>
                    <p style={{ fontWeight: 600, margin: 0 }}>₹{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.25rem' }}>Order ID</p>
                    <p style={{ fontWeight: 500, margin: 0, color: 'var(--primary)' }}>{order.id}</p>
                  </div>
                </div>
                <div>
                  <button className="btn" style={{ border: '1px solid var(--border)', fontSize: '0.875rem' }}>View Invoice</button>
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ 
                        width: '64px', height: '64px', borderRadius: 'var(--radius-md)', border: '2px solid var(--bg-base)',
                        overflow: 'hidden', marginLeft: idx > 0 ? '-1rem' : 0, zIndex: 10 - idx, backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <img src={item.image || 'https://via.placeholder.com/64'} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', border: '2px solid var(--bg-base)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-1rem', zIndex: 1, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div>
                    <StatusBadge status={order.status} />
                    <p style={{ margin: '0.5rem 0 0', fontWeight: 500 }}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} from ONDC Network
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {order.status === 'Delivered' ? <CheckCircle size={16} /> : order.status === 'Shipped' ? <Truck size={16} /> : <Clock size={16} />}
                    Track Package
                  </button>
                  <button className="btn" style={{ padding: '0.5rem' }}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorefrontOrders;
