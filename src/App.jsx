import { useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from './services/AuthContext';
import AdminLogin from './screens/AdminLogin';
import AdminScreen from './screens/AdminScreen';
import AdminAllDesks from './screens/AdminAllDesks';
import AdminNewUsers from './screens/AdminNewUsers';
import AdminReported from './screens/AdminReported';
import AdminProfile from './screens/AdminProfile';
import './App.css';

function App() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {/* if no token show only login screen */}
            {!token ? (
                <Routes>
                    <Route path="*" element={<AdminLogin />} />
                </Routes>
            ) : (
                /* if token show dashboard */
                <div className="app-layout">

                    {/* desktop sidebar */}
                    <aside className="sidebar">
                        <div className="sidebar-header">SmartRise</div>
                        <nav className="sidebar-nav">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/desks"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Manage Desks
                            </NavLink>

                            <NavLink
                                to="/users"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Manage Users
                            </NavLink>

                            <NavLink
                                to="/reports"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Reported Issues
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                Profile Settings
                            </NavLink>
                        </nav>
                    </aside>

                    {/* main content area */}
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<AdminScreen />} />
                            <Route path="/desks" element={<AdminAllDesks />} />
                            <Route path="/users" element={<AdminNewUsers />} />
                            <Route path="/reports" element={<AdminReported />} />
                            <Route path="/profile" element={<AdminProfile />} />
                            {/* safety net if wrong url ( navigates to dashboard )*/}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>

                </div>
            )}
        </BrowserRouter>
    );
}

export default App;