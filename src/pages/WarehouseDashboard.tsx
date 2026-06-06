import React from 'react';
import { useAppStore } from '../store';
import { Warehouse, Package, Truck, Activity } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const WarehouseDashboard: React.FC = () => {
  const warehouses = useAppStore(state => state.warehouses);
  
  const totalCapacity = warehouses.reduce((sum, w: any) => sum + (w.capacity || 5000), 0);
  const currentStock = warehouses.reduce((sum, w: any) => sum + (w.currentStock || 0), 0);
  const utilization = totalCapacity > 0 ? Math.round((currentStock / totalCapacity) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Warehouse Operations</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Multi-node fulfillment and stock distribution.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard label="Total Nodes" value={warehouses.length} icon={<Warehouse />} trend="+2 this quarter" trendUp={true} />
        <StatCard label="Total Inventory" value={currentStock.toLocaleString()} icon={<Package />} trend="System-wide stock" trendUp={true} />
        <StatCard label="Utilization" value={`${utilization}%`} icon={<Activity />} trend="Optimal < 85%" trendUp={utilization < 85} />
        <StatCard label="Inbound Shipments" value="142" icon={<Truck />} trend="Next 48 hours" trendUp={true} />
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Node Utilization</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {warehouses.map((w: any) => {
            const capacity = w.capacity || 5000;
            const currentStock = w.currentStock || 0;
            const util = Math.round((currentStock / capacity) * 100);
            return (
              <div key={w.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>{w.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({w.city}, {w.state})</span></span>
                  <span>{currentStock.toLocaleString()} / {capacity.toLocaleString()} ({util}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${util}%`, backgroundColor: util > 90 ? 'var(--danger)' : util > 75 ? 'var(--warning)' : 'var(--success)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
