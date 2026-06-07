import React, { useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogisticsTracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAwb, setSelectedAwb] = useState<string | null>('AWB-ONDC-9921');

  const activeShipments = [
    { awb: 'AWB-ONDC-9921', orderId: 'ORD-5001', carrier: 'Dunzo (ONDC)', dest: 'Mumbai, MH', status: 'Out for Delivery', updated: '10 mins ago', progress: 3 },
    { awb: 'AWB-DEL-4412', orderId: 'ORD-5002', carrier: 'Delhivery (3PL)', dest: 'Bangalore, KA', status: 'In Transit', updated: '2 hours ago', progress: 2 },
    { awb: 'AWB-ONDC-9922', orderId: 'ORD-5003', carrier: 'Shadowfax (ONDC)', dest: 'Pune, MH', status: 'Picked Up', updated: '5 hours ago', progress: 1 },
    { awb: 'AWB-BLU-1109', orderId: 'ORD-5004', carrier: 'BlueDart (3PL)', dest: 'Delhi, NCR', status: 'Delivered', updated: '1 day ago', progress: 4 },
  ];

  const trackingSteps = [
    { title: 'Order Confirmed', icon: <CheckCircle size={20} />, time: 'Aug 12, 10:00 AM', desc: 'Order received by seller.' },
    { title: 'Picked Up', icon: <Package size={20} />, time: 'Aug 12, 02:30 PM', desc: 'Package collected from warehouse.' },
    { title: 'In Transit', icon: <Truck size={20} />, time: 'Aug 13, 08:15 AM', desc: 'Arrived at sorting facility.' },
    { title: 'Out for Delivery', icon: <MapPin size={20} />, time: 'Aug 14, 09:00 AM', desc: 'Delivery partner is on the way.' }
  ];

  const selectedShipment = activeShipments.find(s => s.awb === selectedAwb);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="button" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}>Track</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Shipments List */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Active Shipments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeShipments.map(shipment => (
              <motion.div 
                key={shipment.awb}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedAwb(shipment.awb)}
                style={{ 
                  padding: '1.25rem', 
                  border: `1px solid ${selectedAwb === shipment.awb ? 'var(--primary)' : 'var(--border)'}`, 
                  borderRadius: '0.75rem', 
                  cursor: 'pointer',
                  backgroundColor: selectedAwb === shipment.awb ? 'rgba(37, 99, 235, 0.05)' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{shipment.awb}</h4>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{shipment.orderId} • {shipment.carrier}</p>
                  </div>
                  <StatusBadge status={shipment.status} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {shipment.dest}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {shipment.updated}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Timeline Panel */}
        <AnimatePresence mode="wait">
          {selectedShipment && (
            <motion.div 
              key={selectedShipment.awb}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card" 
              style={{ position: 'sticky', top: '5rem', overflow: 'hidden' }}
            >
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>Live Tracking</h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{selectedShipment.awb}</p>
                </div>
                <button className="button" style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                  <Map size={18} color="var(--primary)" />
                </button>
              </div>

              <div style={{ padding: '2rem 1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  {/* Vertical Line */}
                  <div style={{ position: 'absolute', left: '1.25rem', top: '1rem', bottom: '1rem', width: '2px', backgroundColor: 'var(--border)' }} />
                  
                  {/* Timeline Steps */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {trackingSteps.map((step, index) => {
                      const isCompleted = index < selectedShipment.progress;
                      const isCurrent = index === selectedShipment.progress - 1;
                      
                      return (
                        <div key={index} style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: isCompleted ? 1 : 0.5 }}>
                          <motion.div 
                            initial={false}
                            animate={{ 
                              backgroundColor: isCompleted ? 'var(--primary)' : 'white',
                              color: isCompleted ? 'white' : 'var(--text-muted)',
                              borderColor: isCompleted ? 'var(--primary)' : 'var(--border)'
                            }}
                            style={{ 
                              width: '2.5rem', height: '2.5rem', borderRadius: '50%', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              border: '2px solid',
                              boxShadow: isCurrent ? '0 0 0 4px rgba(37, 99, 235, 0.2)' : 'none'
                            }}
                          >
                            {step.icon}
                          </motion.div>
                          <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                              <h4 style={{ margin: 0, fontSize: '0.9375rem', color: isCurrent ? 'var(--primary)' : 'inherit' }}>{step.title}</h4>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.time}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedShipment.progress < 4 && (
                  <div style={{ marginTop: '2.5rem', padding: '1rem', backgroundColor: 'rgba(37, 99, 235, 0.05)', borderRadius: '0.5rem', border: '1px dashed var(--primary)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Truck size={20} color="var(--primary)" />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary)' }}>Estimated Delivery</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tomorrow by 9:00 PM</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LogisticsTracking;
