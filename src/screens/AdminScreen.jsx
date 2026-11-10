import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDesks, getPendingUsers } from '../services/api';

function AdminScreen() {
    const navigate = useNavigate();

    // create state variables to hold our dynamic numbers
    const [totalDesks, setTotalDesks] = useState(0);
    const [pendingUsersCount, setPendingUsersCount] = useState(0);

    // fetch the data when the dashboard loads
    useEffect(() => {
        const desks = getDesks();
        const pending = getPendingUsers();

        setTotalDesks(desks.length);
        setPendingUsersCount(pending.length);
    }, []);

    return (
        <div className="admin-container">
            <div className="header">
                <h1 className="welcome-text">Admin Dashboard</h1>
                <button className="profile-button" onClick={() => navigate('/profile')}>
                    <span className="profile-letter">A</span>
                </button>
            </div>

            {/* wrap the banner in a condition so it ONLY shows up if there are actual users waiting! */}
            {pendingUsersCount > 0 && (
                <div className="waiting-banner">
                    <span className="waiting-text">{pendingUsersCount} users waiting for approval</span>
                    <button className="review-btn" onClick={() => navigate('/users')}>Review</button>
                </div>
            )}

            <div className="row">
                <div className="summary-card">
                    <div>Total Desks</div>
                    <div className="summary-number">{totalDesks}</div>
                </div>
                <div className="summary-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/reports')}>
                    <div>Reported Issues</div>
                    <div className="summary-number">2</div>
                </div>
            </div>

            <div className="row">
                <button className="manage-button" onClick={() => navigate('/desks')}>
                    <span className="manage-text">Manage Desks</span>
                </button>
                <button className="manage-button" onClick={() => navigate('/users')}>
                    <span className="manage-text">Manage Users</span>
                </button>
            </div>

            <button className="lift-button">
                <span className="lift-text">Lift All Desks</span>
            </button>

            <button className="logout-button">
                <span className="logout-text">Logout</span>
            </button>
        </div>
    );
}

export default AdminScreen;