import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Power, Clock, Code, Play } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const apis = [
  { id: 'search', title: 'Search', desc: 'Broadcasts a search request for catalogs matching user intent.' },
  { id: 'select', title: 'Select', desc: 'Selects items from a catalog and requests a quote.' },
  { id: 'init', title: 'Init', desc: 'Initializes the order with billing and fulfillment details.' },
  { id: 'confirm', title: 'Confirm', desc: 'Confirms the order and accepts the contract.' },
  { id: 'status', title: 'Status', desc: 'Requests or pushes updates regarding order fulfillment.' },
  { id: 'track', title: 'Track', desc: 'Requests active tracking link for a live shipment.' },
  { id: 'cancel', title: 'Cancel', desc: 'Cancels an order before it is fulfilled.' },
  { id: 'update', title: 'Update', desc: 'Updates order details (e.g., returns or modifications).' },
  { id: 'rating', title: 'Rating', desc: 'Submits a rating for a fulfilled order or seller.' },
  { id: 'support', title: 'Support', desc: 'Initiates a support ticket for an active or past order.' },
];

export const ONDCAPIVisualizer: React.FC = () => {
  const { isOndcConnected, toggleOndcConnection, ondcTransactions, addOndcLog } = useAppStore();
  const [activeApi, setActiveApi] = useState(apis[0].id);

  const activeLogs = ondcTransactions.filter(t => t.action === activeApi);
  const latestLog = activeLogs[0];

  const handleSimulate = (action: string) => {
    if (!isOndcConnected) return alert("Please connect to the ONDC Network first using the switch above.");
    const payload = JSON.stringify({
      context: { action, domain: 'ONDC:RET10', timestamp: new Date().toISOString() },
      message: { simulated: true }
    }, null, 2);
    
    addOndcLog({
      id: `ondc_${Date.now()}_${action}`,
      orderId: 'SIMULATED',
      action: action as any,
      status: 'success',
      timestamp: new Date().toISOString(),
      payload,
      responseTime: Math.floor(Math.random() * 300) + 100
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      
      {/* Header & Switch */}
      <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isOndcConnected ? 'linear-gradient(135deg, #1e1b4b, #312e81)' : 'var(--bg-surface)', color: isOndcConnected ? 'white' : 'inherit', transition: 'all 0.3s' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>ONDC API Visualizer</h2>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Live documentation and state inspector for ONDC protocol integrations.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Network Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOndcConnected ? '#10b981' : '#ef4444', boxShadow: isOndcConnected ? '0 0 8px #10b981' : 'none' }}></div>
              <span style={{ fontWeight: 700 }}>{isOndcConnected ? 'LIVE / CONNECTED' : 'OFFLINE'}</span>
            </div>
          </div>
          <button 
            onClick={toggleOndcConnection}
            style={{
              width: '64px', height: '64px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              backgroundColor: isOndcConnected ? '#10b981' : 'var(--bg-base)',
              color: isOndcConnected ? 'white' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isOndcConnected ? '0 4px 12px rgba(16, 185, 129, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            <Power size={32} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* API Navigation */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.5rem 0.5rem' }}>Protocol APIs</h3>
          {apis.map(api => (
            <button
              key={api.id}
              onClick={() => setActiveApi(api.id)}
              style={{
                padding: '0.75rem 1rem', textAlign: 'left', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
                backgroundColor: activeApi === api.id ? 'var(--primary-light)' : 'transparent',
                color: activeApi === api.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeApi === api.id ? 600 : 500,
                transition: 'all 0.15s'
              }}
            >
              {api.title}
            </button>
          ))}
        </div>

        {/* API Details */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {apis.filter(a => a.id === activeApi).map(api => (
            <div key={api.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <code style={{ fontSize: '1.25rem', backgroundColor: 'var(--bg-base)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>/{api.id}</code>
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '1rem 0 0' }}>{api.desc}</p>
                </div>
                <button onClick={() => handleSimulate(api.id)} className="btn btn-primary">
                  <Play size={16} /> Simulate Call
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> Latest Execution Status</h3>
                {latestLog ? (
                  <div style={{ display: 'flex', gap: '2rem', padding: '1rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</p>
                      <StatusBadge status={latestLog.status} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Timestamp</p>
                      <p style={{ margin: 0, fontWeight: 500 }}>{new Date(latestLog.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Response Time</p>
                      <p style={{ margin: 0, fontWeight: 500 }}>{latestLog.responseTime}ms</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    No execution logs found for this API yet. Interact with the store or click Simulate.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={18} /> JSON Payload</h3>
                {latestLog ? (
                  <pre style={{ margin: 0, padding: '1.5rem', backgroundColor: '#0f172a', color: '#e2e8f0', borderRadius: 'var(--radius-md)', overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.5, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                    {latestLog.payload}
                  </pre>
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#0f172a', color: '#475569', borderRadius: 'var(--radius-md)' }}>
                    <Code size={32} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <p style={{ margin: 0 }}>Payload will appear here once executed.</p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ONDCAPIVisualizer;
