import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';

function AdminProfile() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            {/* back navigation */}
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Dashboard
            </button>

            {/* profile header */}
            <div className="profile-header">
                <div className="profile-avatar-large">A</div>
                <h2 className="profile-name">Admin Name</h2>
                <span className="profile-role">Admin</span>
            </div>

            {/* account details table */}
            <div className="account-section">
                <h3 className="section-title">Account</h3>
                <div className="account-card">
                    <div className="account-row">
                        <span className="row-label">Name</span>
                        <span className="row-value">Admin's Name</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Preferred Desk</span>
                        <span className="row-value">Admin's PD</span>
                    </div>
                    <div className="account-row">
                        <span className="row-label">Department</span>
                        <span className="row-value">Admin's Depart.</span>
                    </div>
                    <div className="account-row no-border">
                        <span className="row-label">Date Of Birth</span>
                        <span className="row-value">Admin's DOB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;