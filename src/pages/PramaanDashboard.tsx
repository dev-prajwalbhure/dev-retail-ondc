import React from 'react';
import { StatCard } from '../components/StatCard';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const checks = [
  { name: 'Search API Response Format', status: 'Pass', desc: 'on_search callback returns valid catalog' },
  { name: 'Select API Item Validation', status: 'Pass', desc: 'Item price and availability verified' },
  { name: 'Init API Billing/Fulfillment', status: 'Pass', desc: 'Billing and fulfillment details accepted' },
  { name: 'Confirm API Order Acceptance', status: 'Pass', desc: 'Order confirmed within SLA' },
  { name: 'Status API Update Frequency', status: 'Pass', desc: 'Status updates within 30-min intervals' },
  { name: 'Cancel API Refund Processing', status: 'Warning', desc: 'Refund timeline exceeds recommended 48hrs' },
  { name: 'Auth Header Signature', status: 'Pass', desc: 'ED25519 signature validation successful' },
  { name: 'Registry Lookup', status: 'Pass', desc: 'Subscriber lookup resolves correctly' },
  { name: 'Catalog Compliance (RET10)', status: 'Pass', desc: 'All mandatory fields present' },
  { name: 'Error Handling (NACK)', status: 'Warning', desc: 'Missing error codes for 2 scenarios' },
  { name: 'Fulfillment State Machine', status: 'Pass', desc: 'Valid state transitions' },
  { name: 'Settlement API', status: 'Fail', desc: 'Settlement callback not implemented' },
];

export const PramaanDashboard: React.FC = () => {
  const passed = checks.filter(c => c.status === 'Pass').length;
  const warnings = checks.filter(c => c.status === 'Warning').length;
  const failed = checks.filter(c => c.status === 'Fail').length;
  const score = Math.round((passed / checks.length) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Pramaan Readiness Hub</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>ONDC certification readiness and compliance status</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `conic-gradient(var(--success) ${score}%, var(--border) ${score}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>{score}%</div>
          </div>
          <p style={{ fontWeight: 600, margin: 0 }}>Readiness Score</p>
        </div>
        <StatCard icon={<CheckCircle size={20} />} label="Tests Passed" value={passed} />
        <StatCard icon={<AlertTriangle size={20} />} label="Warnings" value={warnings} />
        <StatCard icon={<XCircle size={20} />} label="Failed" value={failed} />
      </div>

      {/* Compliance Checks */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem' }}>Compliance Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {checks.map((check, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: check.status === 'Fail' ? 'var(--danger-bg)' : check.status === 'Warning' ? 'var(--warning-bg)' : 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
              {check.status === 'Pass' ? <CheckCircle size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> :
               check.status === 'Warning' ? <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} /> :
               <XCircle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, margin: 0, fontSize: '0.875rem' }}>{check.name}</p>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.75rem' }}>{check.desc}</p>
              </div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                color: check.status === 'Pass' ? 'var(--success)' : check.status === 'Warning' ? 'var(--warning)' : 'var(--danger)',
                backgroundColor: check.status === 'Pass' ? 'var(--success-bg)' : check.status === 'Warning' ? 'var(--warning-bg)' : 'var(--danger-bg)',
              }}>{check.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PramaanDashboard;
