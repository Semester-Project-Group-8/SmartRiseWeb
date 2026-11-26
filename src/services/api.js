// base url for docker backend
export const BASE_URL = 'http://localhost:8080';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
}

// desk endpoints

export async function getDesks() {
    try {
        const response = await fetch(`${BASE_URL}/api/desks`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch desks');
        return await response.json();
    } catch (error) {
        console.error("Error fetching desks:", error);
        return [];
    }
}

export async function getDeskById(deskId) {
    try {
        const response = await fetch(`${BASE_URL}/api/desks/${deskId}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch desk');
        return await response.json();
    } catch (error) {
        console.error("Error fetching desk:", error);
        return null;
    }
}

// user endpoints

export async function getPendingUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users/approval-pending`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch pending users');
        return await response.json();
    } catch (error) {
        console.error("Error fetching pending users:", error);
        return [];
    }
}

export async function getUserById(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export async function approveUser(id, approvalData)
{
    try
    {
        const response = await fetch(`${BASE_URL}/users/${id}/approve`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(approvalData)
            }
        )
        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.message || error.Message);
        }
        return await response.json();
    }
    catch (error)
    {
        console.error("Error approving user:", error);
        return null;
    }
}

export async function getDepartments() {
    try {
        const response = await fetch(
            `${BASE_URL}/departments`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }

        return await response.json();
    }
    catch (error) {
        console.error('Error fetching departments:', error);
        return [];
    }
}

export async function rejectUser(id) {
    try {
        const response = await fetch(
            `${BASE_URL}/users/${id}/reject`,
            {
                method: 'PATCH',
                headers: getAuthHeaders()
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.Message);
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error rejecting user:", error);
        return null;
    }
}

// fetch all users for admin view
// this is used as admin login was skipped
// but we need to log in as admin
// todo: remove this once admin login is implemented
export async function getAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch users');
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}