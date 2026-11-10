import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingUsers, getDesks } from '../services/api';
import './AdminNewUsers.css';

const roles = ['User', 'Cleaner', 'Admin'];

function AdminNewUsers() {
    const navigate = useNavigate();
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        // fetch the pending users when the screen loads
        setPendingUsers(getPendingUsers());
    }, []);

    return (
        <div className="admin-container">
            <h2 className="page-title">You have {pendingUsers.length} new requests</h2>

            {/* loop through each pending user and generate a card */}
            {pendingUsers.map((user) => (
                <RequestCard key={user.id} user={user} />
            ))}
        </div>
    );
}

// ppass the specific user data into each card
function RequestCard({ user }) {
    const [role, setRole] = useState('');
    const [availableDesks, setAvailableDesks] = useState([]);

    useEffect(() => {
        // only get desks that aren't assigned to anyone yet
        const allDesks = getDesks();
        const unassigned = allDesks.filter(desk => desk.assignedUserID === null);
        setAvailableDesks(unassigned);
    }, []);

    return (
        <div className="request-card">
            <div className="user-info-row">
                <div className="profile-logo">{user.name.charAt(0)}</div>
                <div className="user-name">{user.name} {user.surname}</div>
            </div>

            <hr className="divider" />

            <div className="section-label">Assign Role</div>
            <div className="roles-row">
                {roles.map((r) => (
                    <button
                        key={r}
                        className={`role-button ${role === r.toLowerCase() ? 'selected' : ''}`}
                        onClick={() => setRole(r.toLowerCase())}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {role === 'user' && (
                <div className="desks-section">
                    <div className="section-label">Assign Desk and Beacon</div>
                    <div className="desks-list">
                        {availableDesks.length > 0 ? (
                            availableDesks.map((desk) => (
                                <button key={desk.id} className="desk-select-button">
                                    Desk {desk.deskNum}
                                </button>
                            ))
                        ) : (
                            <div style={{ color: '#666', fontSize: '14px' }}>No available desks.</div>
                        )}
                    </div>
                </div>
            )}

            <div className="action-row">
                <button className="accept-button">Accept</button>
                <button className="reject-button">Reject</button>
            </div>
        </div>
    );
}

export default AdminNewUsers;