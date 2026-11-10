import { useState, useEffect } from 'react';
import { getUserById } from '../services/api';
import './AdminProfile.css';

function AdminProfile() {
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        // fetch the admin user
        const user = getUserById("user-003");
        setAdminUser(user);
    }, []);

    // quick loading state while the data fetches
    if (!adminUser) {
        return <div className="admin-container">Loading profile...</div>;
    }

    return (
        <div className="admin-container">
            {/* profile header */}
            <div className="profile-header">
                <div className="profile-avatar-large">{adminUser.name.charAt(0)}</div>
                <h2 className="profile-name">{adminUser.name} {adminUser.surname}</h2>
                <span className="profile-role">
                    {adminUser.role.charAt(0).toUpperCase() + adminUser.role.slice(1)}
                </span>
            </div>

            {/* account details table */}
            <div className="account-section">
                <h3 className="section-title">Account</h3>
                <div className="account-card">
                    <div className="account-row">
                        <span className="row-label">Name</span>
                        <span className="row-value">{adminUser.name} {adminUser.surname}</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Height</span>
                        <span className="row-value">{adminUser.height ? `${adminUser.height} cm` : 'Not set'}</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Sit Preset</span>
                        <span className="row-value">{adminUser.sitPreset ? `${adminUser.sitPreset} cm` : 'Not set'}</span>
                    </div>
                    <div className="account-row no-border">
                        <span className="row-label">Stand Preset</span>
                        <span className="row-value">{adminUser.standPreset ? `${adminUser.standPreset} cm` : 'Not set'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;