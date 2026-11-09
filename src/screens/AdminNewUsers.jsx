import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNewUsers.css';

// The data arrays from the mobile app
const roles = ['User', 'Cleaner', 'Admin'];
const desks = ['Desk 1', 'Desk 2', 'Desk 3', 'Desk 4'];

function AdminNewUsers() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            {/* Back Navigation */}
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Dashboard
            </button>

            <h2 className="page-title">You have 1 new requests</h2>

            <RequestCard />
        </div>
    );
}

// Breaking the request card into its own component just like the mobile team did
function RequestCard() {
    const [role, setRole] = useState('');

    return (
        <div className="request-card">
            {/* User Info */}
            <div className="user-info-row">
                <div className="profile-logo">N</div>
                <div className="user-name">New User Name</div>
            </div>

            <hr className="divider" />

            {/* Role Selection */}
            <div className="section-label">Assign Role</div>
            <div className="roles-row">
                {roles.map((r) => (
                    <button
                        key={r}
                        // This applies the "selected" CSS class if the button's role matches the state
                        className={`role-button ${role === r ? 'selected' : ''}`}
                        onClick={() => setRole(r)}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {/* Conditional Rendering: Only show if "User" is selected */}
            {role === 'User' && (
                <div className="desks-section">
                    <div className="section-label">Assign Desk and Beacon</div>
                    <div className="desks-list">
                        {desks.map((desk) => (
                            <button key={desk} className="desk-select-button">
                                {desk}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="action-row">
                <button className="accept-button">Accept</button>
                <button className="reject-button">Reject</button>
            </div>
        </div>
    );
}

export default AdminNewUsers;