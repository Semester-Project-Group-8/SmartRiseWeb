import { useNavigate } from 'react-router-dom';
import './AdminReported.css';

function AdminReported() {
    const navigate = useNavigate();

    // storing the reported issues in an array for easy mapping
    const issues = [
        { id: 1, deskName: 'Desk 2', issueText: 'Some issue' }
    ];

    return (
        <div className="admin-container">
            {/* back navigation */}
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Dashboard
            </button>

            <h2 className="page-title">Currently you have {issues.length} issue reported</h2>

            <div className="issues-list">
                {issues.map((issue) => (
                    <div key={issue.id} className="issue-card">
                        <h3 className="desk-name">{issue.deskName}</h3>

                        <hr className="divider" />

                        <div className="label">Reported issue</div>
                        <div className="issue-text">{issue.issueText}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminReported;