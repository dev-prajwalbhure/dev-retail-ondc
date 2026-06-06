import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { useAppStore } from '../store';

export const SellerTeam: React.FC = () => {
  const { teamMembers, currentUser, sellerProfiles } = useAppStore();
  const profile = sellerProfiles.find(s => s.sellerId === currentUser?.id) || sellerProfiles[0];
  const myTeam = teamMembers.filter(t => t.sellerId === profile.sellerId);

  const columns = [
    { header: 'Member Name', accessor: 'name' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Role', accessor: 'role' as const },
    { header: 'Permissions', accessor: (row: any) => row.permissions.join(', ') },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Team Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage staff access and roles for your store.</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={18}/> Invite Member</button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        {myTeam.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <Users size={48} style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
              <p>No team members added yet.</p>
           </div>
        ) : (
          <DataTable columns={columns} data={myTeam} />
        )}
      </div>
    </div>
  );
};
export default SellerTeam;
