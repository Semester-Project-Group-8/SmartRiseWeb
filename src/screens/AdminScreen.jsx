import { useNavigate } from 'react-router-dom';

function AdminScreen() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">

            {/* header area */}
            <header className="header">
                <h1 className="welcome-text">Admin Dashboard</h1>
                <button className="profile-button" onClick={() => navigate('/profile')}>
                    <span className="profile-letter">A</span>
                </button>
            </header>

            {/* warning banner */}
            <div className="waiting-banner">
                <span className="waiting-text">3 users waiting for approval</span>
                <button className="review-btn">Review</button>
            </div>

            {/* summary cards */}
            <div className="row">
                <div className="summary-card">
                    <div>Total Desks</div>
                    <div className="summary-number">12</div>
                </div>
                <div className="summary-card">
                    <div>Reported Issues</div>
                    <div className="summary-number">2</div>
                </div>
            </div>

            {/* action buttons */}
            <div className="row">
                <button className="manage-button" onClick={() => navigate('/desks')}>
                    <span className="manage-text">Manage Desks</span>
                </button>
                <button className="manage-button" onClick={() => navigate('/users')}>
                    <span className="manage-text">Manage Users</span>
                </button>
            </div>

            <button className="lift-button"><span className="lift-text">Lift All Desks</span></button>

            <button className="logout-button"><span className="logout-text">Logout</span></button>

        </div>
    );
}

export default AdminScreen;