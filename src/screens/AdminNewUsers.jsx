import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingUsers, getDesks, getDepartments, approveUser, rejectUser } from '../services/api';
import './AdminNewUsers.css';

const roles = ['Employee', 'Cleaner', 'Admin'];

function AdminNewUsers() {
    const navigate = useNavigate();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadPendingUsers() {
            setIsLoading(true);
            const users = await getPendingUsers();
            setPendingUsers(users);
            setIsLoading(false);
        }
        loadPendingUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="admin-container">
                <h2 className="page-title">Loading requests...</h2>
            </div>
        );
    }

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

// pass the specific user data into each card
function RequestCard({ user }) {
    const [role, setRole] = useState('');
    const [availableDesks, setAvailableDesks] = useState([]);
    const [selectedDesk, setSelectedDesk] = useState(null);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [availableDepartments, setAvailableDepartments] = useState([]);
    useEffect(() => {
        async function loadData() {

            const allDesks = await getDesks();
            const unassigned = allDesks.filter(
                desk => desk.employeeId === null
            );
            setAvailableDesks(unassigned);

            const allDepartments = await getDepartments();

            setAvailableDepartments(allDepartments)
        }

        loadData();
    }, []);

    function toggleDepartment(departmentId) {
        setSelectedDepartments(current => {

            if (current.includes(departmentId)) {
                return current.filter(id => id !== departmentId);
            }

            return [...current, departmentId];
        });
    }
    async function handleReject() {
        const result = await rejectUser(user.id);

        if (result) {
            window.location.reload();
        }
    }
    async function handleAccept() {
        let approvalData;
        if (role === 'employee') {
            approvalData = {
                role: 'default',
                deskId: selectedDesk
            };
        }
        else if (role === 'cleaner') {
            if (selectedDepartments.length === 0) {
                alert("Select at least one department");
                return;
            }

            approvalData = {
                role: 'cleaner',
                departmentIds: selectedDepartments
            };
        }
        else if (role === 'admin') {
            if (selectedDepartments.length === 0) {
                alert("Select at least one department");
                return;
            }

            approvalData = {
                role: 'admin',
                departmentIds: selectedDepartments
            };
        }
        else {
            alert("Select a role");
            return;
        }

        const result = await approveUser(user.id, approvalData);
        if (result) {
            window.location.reload();
        }
    }
    const displayedDepartments =
        role === 'admin'
            ? availableDepartments.filter(
                department => department.adminId == null
            )
            : availableDepartments;
    return (
        <div className="request-card">
            <div className="user-info-row">
                <div className="profile-logo">{user.name.charAt(0)}</div>
                <div className="user-name">{user.name}</div>
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

            {role === 'employee' && (
                <div className="desks-section">
                    <div className="section-label">Assign Desk and Beacon</div>
                    <div className="desks-list">
                        {availableDesks.length > 0 ? (
                            availableDesks.map((desk) => (
                                <button
                                    key={desk.id}
                                    className={`desk-select-button ${selectedDesk === desk.id ? 'selected' : ''
                                        }`}
                                    onClick={() => setSelectedDesk(desk.id)}
                                >
                                    <div className="desk-title">
                                        Desk - {desk.id}
                                    </div>

                                    <div className="desk-details">
                                        Department: {desk.department?.major} • Cluster: {desk.minor}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div style={{ color: '#666', fontSize: '14px' }}>No available desks.</div>
                        )}
                    </div>
                </div>
            )}

            {(role === 'cleaner' || role === 'admin') && (
                <div className="desks-section">
                    <div className="section-label">
                        Assign Departments
                    </div>

                    <div className="desks-list">

                        {displayedDepartments.map((department) => (
                            <button
                                key={department.id}
                                className={`desk-select-button ${selectedDepartments.includes(department.id)
                                    ? 'selected'
                                    : ''
                                    }`}
                                onClick={() => toggleDepartment(department.id)}
                            >
                                <div className="desk-title">
                                    Department {department.major}
                                </div>

                                <div className="desk-details">
                                    Start: {department.startTime}
                                    {' • '}
                                    End: {department.endTime}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="action-row">
                <button className="accept-button" onClick={handleAccept}>Accept</button>
                <button className="reject-button" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
}


export default AdminNewUsers;