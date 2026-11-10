import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDesks, getUserById } from '../services/api';
import './AdminAllDesks.css';

function AdminAllDesks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState([]);

    useEffect(() => {
        const fetchedDesks = getDesks();
        setDesks(fetchedDesks);
    }, []);

    return (
        <div className="admin-container">
            <h2 className="page-title">Currently you have {desks.length} Desks</h2>

            <div className="desks-grid">
                {desks.map((desk) => {
                    const assignedUser = desk.assignedUserID ? getUserById(desk.assignedUserID) : null;

                    return (
                        <div key={desk.id} className="desk-card">
                            <h3 className="desk-name">Desk {desk.deskNum}</h3>

                            <hr className="divider" />

                            <div className="label">Assigned to</div>
                            <div className="user-row">
                                <div className="profile-logo">
                                    {assignedUser ? assignedUser.name.charAt(0) : '?'}
                                </div>
                                <div className="user-name">
                                    {assignedUser ? `${assignedUser.name} ${assignedUser.surname}` : 'Unassigned'}
                                </div>
                            </div>

                            <button className="edit-button">Edit Preferred User</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminAllDesks;