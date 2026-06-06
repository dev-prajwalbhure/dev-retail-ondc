import React, { useState } from 'react';
import { Package, ShieldCheck, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store';

export const LogisticsBookings: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [logisticsType, setLogisticsType] = useState<'ondc' | 'third_party' | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const pendingOrders = useAppStore(state => state.orders.filter(o => o.status === 'Processing'));

  const handleBook = () => {
    setBookingStatus('booking');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Logistics Booking Engine</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Dispatch orders via ONDC Network Logistics or Direct 3PL integrations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Step 1: Select Order */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', margin: 0 }}>1. Select Pending Order</h3>
          {pendingOrders.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No pending orders to dispatch.</div>
          ) : (
            pendingOrders.map(order => (
              <div 
                key={order.id} 
                onClick={() => { setSelectedOrder(order.id); setBookingStatus(null); }}
                style={{ 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: `1px solid ${selectedOrder === order.id ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: selectedOrder === order.id ? 'var(--bg-surface)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{order.id}</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>₹{order.total.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Step 2: Select Logistics & Book */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', margin: 0 }}>2. Select Logistics Network</h3>
          
          {!selectedOrder ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Package size={48} style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
              Select an order from the list to view available carriers.
            </div>
          ) : bookingStatus === 'success' ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--success)' }}>
              <CheckCircle size={64} style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ margin: '0 0 0.5rem' }}>Booking Confirmed!</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>AWB has been generated and rider is assigned.</p>
              <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => { setSelectedOrder(null); setBookingStatus(null); }}>
                Dispatch Another Order
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div 
                  onClick={() => setLogisticsType('ondc')}
                  style={{ 
                    padding: '1.5rem', 
                    borderRadius: 'var(--radius-lg)', 
                    border: `2px solid ${logisticsType === 'ondc' ? 'var(--primary)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <ShieldCheck size={32} style={{ color: logisticsType === 'ondc' ? 'var(--primary)' : 'var(--text-muted)', margin: '0 auto 1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem' }}>ONDC Logistics</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Dunzo, Shadowfax, LoadShare via decentralized protocol.</p>
                </div>

                <div 
                  onClick={() => setLogisticsType('third_party')}
                  style={{ 
                    padding: '1.5rem', 
                    borderRadius: 'var(--radius-lg)', 
                    border: `2px solid ${logisticsType === 'third_party' ? 'var(--primary)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <Truck size={32} style={{ color: logisticsType === 'third_party' ? 'var(--primary)' : 'var(--text-muted)', margin: '0 auto 1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem' }}>3PL Direct</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Delhivery, BlueDart via direct API integration.</p>
                </div>
              </div>

              {logisticsType && (
                <div style={{ marginTop: 'auto', padding: '1.5rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem' }}>{logisticsType === 'ondc' ? 'Searching ONDC Network...' : 'Querying 3PL APIs...'}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>Best rates found for {selectedOrder}</p>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>₹45.00</div>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                    onClick={handleBook}
                    disabled={bookingStatus === 'booking'}
                  >
                    {bookingStatus === 'booking' ? 'Generating AWB...' : 'Confirm Booking & Generate AWB'} <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsBookings;
