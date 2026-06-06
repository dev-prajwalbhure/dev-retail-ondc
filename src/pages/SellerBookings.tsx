import React from 'react';
import { Calendar } from 'lucide-react';

export const SellerBookings: React.FC = () => {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>Service Bookings</h2>
          <p className="text-muted" style={{ margin: 0 }}>Manage appointments and service schedules (B2B/Hyperlocal).</p>
        </div>
      </div>

      <div className="card flex-col items-center justify-center gap-4 text-center" style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-elevated)' }}>
        <Calendar size={64} className="text-primary opacity-50" />
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>No Active Bookings</h3>
        <p className="text-secondary" style={{ maxWidth: '500px' }}>
          The bookings module is designed for Service Providers on the ONDC network. Your current catalog only contains physical Retail products. Add Service SKUs to enable bookings.
        </p>
        <button className="btn btn-primary mt-4">Add Service SKU</button>
      </div>
    </div>
  );
};

export default SellerBookings;
