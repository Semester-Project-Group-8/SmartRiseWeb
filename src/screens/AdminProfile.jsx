import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import { getAllUsers } from '../services/api';
import './AdminProfile.css';

function getEmailFromToken(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload.sub || null;
    } catch {
        return null;
    }
}

function AdminProfile() {
    const { token } = useContext(AuthContext);
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        async function loadProfile() {
            const loggedInEmail = getEmailFromToken(token);

            // check if the logged-in email exists in /users (employees)
            const allUsers = await getAllUsers();
            const matchedUser = loggedInEmail
                ? allUsers.find(u => u.email?.toLowerCase() === loggedInEmail.toLowerCase())
                : null;

            // fall back to token info for Admin accounts (which live in Admins table)
            setAdminUser(
                matchedUser || {
                    name: 'Admin',
                    email: loggedInEmail || 'Not set',
                    role: 'admin',
                    desk: null
                }
            );
        }
        loadProfile();
    }, [token]);

    // quick loading state while the data fetches
    if (!adminUser) {
        return <div className="admin-container">Loading profile...</div>;
    }

    return (
        <div className="admin-container">
            <div className="profile-header">
                <div className="profile-avatar-large">
                    {(adminUser.name || adminUser.email || 'A').charAt(0).toUpperCase()}
                </div>
                <h2 className="profile-name">{adminUser.name}</h2>
                <span className="profile-role">
                    {adminUser.role ? adminUser.role.charAt(0).toUpperCase() + adminUser.role.slice(1) : ''}
                </span>
            </div>

            <div className="account-section">
                <h3 className="section-title">Account</h3>
                <div className="account-card">
                    <div className="account-row">
                        <span className="row-label">Name</span>
                        <span className="row-value">{adminUser.name}</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Email</span>
                        <span className="row-value">{adminUser.email || 'Not set'}</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Height</span>
                        <span className="row-value">
                            {adminUser.desk?.preferredHeight ? `${adminUser.desk.preferredHeight} cm` : 'Not set'}
                        </span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Sit Preset</span>
                        <span className="row-value">Not set</span>
                    </div>
                    <div className="account-row no-border">
                        <span className="row-label">Stand Preset</span>
                        <span className="row-value">Not set</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;