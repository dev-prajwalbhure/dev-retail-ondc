import React from 'react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Search } from 'lucide-react';

export const LogisticsTracking: React.FC = () => {
  const activeShipments = [
    { awb: 'AWB-ONDC-9921', orderId: 'ORD-5001', carrier: 'Dunzo (ONDC)', dest: 'Mumbai, MH', status: 'Out for Delivery', updated: '10 mins ago' },
    { awb: 'AWB-DEL-4412', orderId: 'ORD-5002', carrier: 'Delhivery (3PL)', dest: 'Bangalore, KA', status: 'In Transit', updated: '2 hours ago' },
    { awb: 'AWB-ONDC-9922', orderId: 'ORD-5003', carrier: 'Shadowfax (ONDC)', dest: 'Pune, MH', status: 'Picked Up', updated: '5 hours ago' },
    { awb: 'AWB-BLU-1109', orderId: 'ORD-5004', carrier: 'BlueDart (3PL)', dest: 'Delhi, NCR', status: 'Delivered', updated: '1 day ago' },
  ];

  const columns = [
    { header: 'AWB Number', accessor: 'awb' as const },
    { header: 'Order ID', accessor: 'orderId' as const },
    { header: 'Carrier', accessor: 'carrier' as const },
    { header: 'Destination', accessor: 'dest' as const },
    { header: 'Last Updated', accessor: 'updated' as const },
    { header: 'Tracking Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Global Tracking Command</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Real-time Unified Tracking for all ONDC and 3PL shipments.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            className="input" 
            placeholder="Track via AWB, Order ID, or Customer Phone..." 
            style={{ paddingLeft: '3rem', width: '100%' }}
          />
        </div>
        <button className="btn btn-primary">Track Shipment</button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <DataTable columns={columns} data={activeShipments} />
      </div>
    </div>
  );
};

export default LogisticsTracking;
