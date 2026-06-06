import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Plus } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

export const WarehouseList: React.FC = () => {
  const { warehouses } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'Warehouse ID', accessor: 'id' as const },
    { header: 'Name & Location', accessor: (row: any) => <div><p style={{ margin: 0, fontWeight: 500 }}>{row.name}</p><p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.location}</p></div> },
    { header: 'Manager', accessor: 'manager' as const },
    { header: 'Capacity', accessor: (row: any) => `${row.currentStock.toLocaleString()} / ${row.capacity.toLocaleString()}` },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Fulfillment Nodes</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage physical infrastructure and active nodes.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Node
        </button>
      </div>

      <DataTable columns={columns} data={warehouses} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Fulfillment Node">
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Node Name</label>
              <input type="text" className="input" placeholder="e.g. BLR-HUB-01" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Location</label>
              <input type="text" className="input" placeholder="e.g. Bangalore, KA" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Max Capacity (Units)</label>
              <input type="number" className="input" placeholder="e.g. 50000" />
            </div>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setIsModalOpen(false)}>Save Node</button>
         </div>
      </Modal>
    </div>
  );
};

export default WarehouseList;
