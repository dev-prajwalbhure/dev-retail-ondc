import React, { useState } from 'react';
import { useAppStore } from '../store';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Search } from 'lucide-react';

export const SellerShipments: React.FC = () => {
  const { shipments, orders, currentUser, sellerProfiles } = useAppStore();
  const profile = sellerProfiles.find(s => s.sellerId === currentUser?.id) || sellerProfiles[0];
  
  // Get orders for this seller
  const sellerOrderIds = new Set(orders.filter(o => o.sellerId === profile.sellerId).map(o => o.id));
  
  // Filter shipments
  const sellerShipments = shipments.filter(s => sellerOrderIds.has(s.orderId));
  
  const [search, setSearch] = useState('');

  const filtered = sellerShipments.filter(s => 
    s.id.toLowerCase().includes(search.toLowerCase()) || 
    s.orderId.toLowerCase().includes(search.toLowerCase()) ||
    s.trackingNumber.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Shipment ID', accessor: 'id' as const },
    { header: 'Order ID', accessor: 'orderId' as const },
    { header: 'Courier', accessor: 'courier' as const },
    { header: 'Tracking No.', accessor: 'trackingNumber' as const },
    { header: 'Est. Delivery', accessor: 'estimatedDelivery' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Shipment Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track and manage outbound deliveries.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            className="input" 
            placeholder="Search by shipment ID, order ID, or tracking number..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '3rem', width: '100%' }}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export default SellerShipments;
