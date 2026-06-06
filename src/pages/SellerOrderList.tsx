import React, { useState } from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { Eye, Truck, FileText, Search } from 'lucide-react';

export const SellerOrderList: React.FC = () => {
  const { orders, currentUser, updateOrderStatus, createShipment } = useAppStore();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [shipModal, setShipModal] = useState<string | null>(null);
  const [shipForm, setShipForm] = useState({ courier: 'Delhivery', trackingNumber: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const sellerOrders = orders.filter(o => o.sellerId === currentUser?.id);
  const filtered = sellerOrders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const detail = orders.find(o => o.id === selectedOrder);

  const handleShip = () => {
    if (shipModal && shipForm.trackingNumber) {
      createShipment(shipModal, shipForm.courier, shipForm.trackingNumber);
      setShipModal(null);
      setShipForm({ courier: 'Delhivery', trackingNumber: '' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Orders</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Manage your order fulfillment pipeline</p>
      </div>

      {/* Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {['all', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(s => {
          const count = s === 'all' ? sellerOrders.length : sellerOrders.filter(o => o.status === s).length;
          return (
            <button key={s} className="card" onClick={() => setStatusFilter(s)} style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer', borderColor: statusFilter === s ? 'var(--primary)' : 'var(--border)', transition: 'border-color 0.15s' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{count}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, textTransform: 'capitalize' }}>{s === 'all' ? 'All Orders' : s}</p>
            </button>
          );
        })}
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input" placeholder="Search orders..." style={{ paddingLeft: '2rem' }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Total</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Payment</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--primary)' }}>{order.id}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{order.customerName}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{new Date(order.timestamp).toLocaleDateString()}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{order.total.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={order.paymentStatus} /></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={order.status} /></td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                    <button onClick={() => setSelectedOrder(order.id)} style={{ color: 'var(--primary)', padding: '0.25rem' }} title="View"><Eye size={14} /></button>
                    {order.status === 'Pending' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Processing')} style={{ color: 'var(--warning)', padding: '0.25rem' }} title="Accept"><FileText size={14} /></button>
                    )}
                    {order.status === 'Processing' && (
                      <button onClick={() => setShipModal(order.id)} style={{ color: 'var(--success)', padding: '0.25rem' }} title="Ship"><Truck size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order ${detail?.id}`} size="lg">
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.25rem' }}>Customer</p>
                <p style={{ fontWeight: 600, margin: 0 }}>{detail.customerName}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>{detail.customerEmail}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.25rem' }}>Shipping Address</p>
                <p style={{ fontWeight: 500, margin: 0, fontSize: '0.875rem' }}>{detail.shippingAddress.line1}, {detail.shippingAddress.city}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>{detail.shippingAddress.state} - {detail.shippingAddress.pincode}</p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Items</p>
              {detail.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <img src={item.image} alt="" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 500, margin: 0, fontSize: '0.875rem' }}>{item.productName}</p>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.75rem' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', backgroundColor: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Subtotal:</span> <span style={{ fontWeight: 600 }}> ₹{detail.grossAmount.toLocaleString()}</span></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Tax:</span> <span style={{ fontWeight: 600 }}> ₹{detail.tax.toLocaleString()}</span></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Commission:</span> <span style={{ fontWeight: 600, color: 'var(--danger)' }}> -₹{detail.commission.toLocaleString()}</span></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Your Earnings:</span> <span style={{ fontWeight: 700, color: 'var(--success)' }}> ₹{detail.sellerEarn.toLocaleString()}</span></div>
            </div>
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Timeline</p>
              {detail.timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '0.25rem', flexShrink: 0 }}></div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: '0.8125rem' }}>{t.status}</p>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.75rem' }}>{t.note} · {new Date(t.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Ship Modal */}
      <Modal isOpen={!!shipModal} onClose={() => setShipModal(null)} title="Create Shipment" size="md"
        footer={<><button className="btn btn-outline" onClick={() => setShipModal(null)}>Cancel</button><button className="btn btn-primary" onClick={handleShip}>Create Shipment</button></>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Courier Partner</label>
            <select className="input" value={shipForm.courier} onChange={e => setShipForm({ ...shipForm, courier: e.target.value })}>
              <option>Delhivery</option>
              <option>BlueDart</option>
              <option>DTDC</option>
              <option>FedEx</option>
              <option>India Post</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Tracking Number *</label>
            <input className="input" required value={shipForm.trackingNumber} onChange={e => setShipForm({ ...shipForm, trackingNumber: e.target.value })} placeholder="Enter tracking number" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerOrderList;
