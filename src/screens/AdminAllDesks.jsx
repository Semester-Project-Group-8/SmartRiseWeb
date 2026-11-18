import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDesks, getUserById } from '../services/api';
import './AdminAllDesks.css';

function AdminAllDesks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState([]);

    // store our fetched users
    const [usersMap, setUsersMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);

            // fetch desks 
            const fetchedDesks = await getDesks();
            setDesks(fetchedDesks);

            // fetch the user for each assigned desk in advance
            const userDictionary = {};
            for (const desk of fetchedDesks) {
                if (desk.employeeId) {
                    // fetch if havent already
                    if (!userDictionary[desk.employeeId]) {
                        const user = await getUserById(desk.employeeId);
                        userDictionary[desk.employeeId] = user;
                    }
                }
            }

            // save users and stop loading
            setUsersMap(userDictionary);
            setIsLoading(false);
        }

        loadData();
    }, []);

    // show loading state while fetching from the database
    if (isLoading) {
        return (
            <div className="admin-container">
                <h2 className="page-title">Loading desks from database...</h2>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <h2 className="page-title">Currently you have {desks.length} Desks</h2>

            <div className="desks-grid">
                {desks.map((desk) => {
                    const assignedUser = desk.employeeId ? usersMap[desk.employeeId] : null;

                    return (
                        <div key={desk.id} className="desk-card">
                            <h3 className="desk-name">Desk {desk.minor}</h3>

                            <hr className="divider" />

                            <div className="label">Assigned to</div>
                            <div className="user-row">
                                <div className="profile-logo">
                                    {assignedUser ? assignedUser.name.charAt(0) : '?'}
                                </div>
                                <div className="user-name">
                                    {assignedUser ? assignedUser.name : 'Unassigned'}
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