import './App.css';

function App() {
    return (
        <div className="admin-container">

            {/* Header Area */}
            <header className="header">
                <h1 className="welcome-text">Admin Dashboard</h1>
                <button className="profile-button">
                    <span className="profile-letter">A</span>
                </button>
            </header>

            {/* Warning Banner */}
            <div className="waiting-banner">
                <span className="waiting-text">3 users waiting for approval</span>
                <button className="review-btn">Review</button>
            </div>

            {/* Summary Cards */}
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

            {/* Action Buttons */}
            <div className="row">
                <button className="manage-button"><span className="manage-text">Manage Desks</span></button>
                <button className="manage-button"><span className="manage-text">Manage Users</span></button>
            </div>

            <button className="lift-button"><span className="lift-text">Lift All Desks</span></button>

            <button className="logout-button"><span className="logout-text">Logout</span></button>

        </div>
    );
}

export default App;