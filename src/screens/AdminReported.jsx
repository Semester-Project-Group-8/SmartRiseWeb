import './AdminReported.css';

function AdminReported() {
    // hardcoding 2 issues here so it matches the dashboard summary card
    // until there are actual issues in backend
    const issues = [
        { id: 1, deskNum: 2, issueText: "Desk is stuck at 70cm and won't go up." },
        { id: 2, deskNum: 1, issueText: "Connection dropping intermittently." }
    ];

    return (
        <div className="admin-container">
            <h2 className="page-title">Currently you have {issues.length} issues reported</h2>

            <div className="issues-list">
                {issues.map((issue) => (
                    <div key={issue.id} className="issue-card">
                        <h3 className="desk-name">Desk {issue.deskNum}</h3>

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