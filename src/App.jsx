import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import AdminAllDesks from './screens/AdminAllDesks';
import AdminNewUsers from './screens/AdminNewUsers';
import AdminReported from './screens/AdminReported';
import AdminProfile from './screens/AdminProfile';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminScreen />} />
                <Route path="/desks" element={<AdminAllDesks />} />
                <Route path="/users" element={<AdminNewUsers />} />
                <Route path="/reports" element={<AdminReported />} />
                <Route path="/profile" element={<AdminProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;