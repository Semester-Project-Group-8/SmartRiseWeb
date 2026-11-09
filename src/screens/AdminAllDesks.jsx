import { useNavigate } from 'react-router-dom';
import './AdminAllDesks.css';

function AdminAllDesks() {
    const navigate = useNavigate();

    // store the data in an array so react can loop through it
    const desks = [
        { id: 1, name: 'Desk 1', user: 'User Name', logo: 'U' },
        { id: 2, name: 'Desk 2', user: 'User Name', logo: 'U' },
        { id: 3, name: 'Desk 3', user: 'User Name', logo: 'U' },
        { id: 4, name: 'Desk 4', user: 'User Name', logo: 'U' },
    ];

    return (
        <div className="admin-container">
            {/* back navigation */}
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Dashboard
            </button>

            <h2 className="page-title">Currently you have {desks.length} Desks</h2>

            {/* desk cards grid */}
            <div className="desks-grid">
                {desks.map((desk) => (
                    <div key={desk.id} className="desk-card">
                        <h3 className="desk-name">{desk.name}</h3>

                        <hr className="divider" />

                        <div className="label">Assigned to</div>
                        <div className="user-row">
                            <div className="profile-logo">{desk.logo}</div>
                            <div className="user-name">{desk.user}</div>
                        </div>

                        <button className="edit-button">Edit Preferred User</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminAllDesks;