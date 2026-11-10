import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import AdminAllDesks from './screens/AdminAllDesks';
import AdminNewUsers from './screens/AdminNewUsers';
import AdminReported from './screens/AdminReported';
import AdminProfile from './screens/AdminProfile';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">

                {/* desktop sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-header">SmartRise</div>
                    <nav className="sidebar-nav">
                        <Link to="/" className="nav-link">Dashboard</Link>
                        <Link to="/desks" className="nav-link">Manage Desks</Link>
                        <Link to="/users" className="nav-link">Manage Users</Link>
                        <Link to="/reports" className="nav-link">Reported Issues</Link>
                        <Link to="/profile" className="nav-link">Profile Settings</Link>
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
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
    );
}

export default App;