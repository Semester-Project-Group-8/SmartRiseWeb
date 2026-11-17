// base url for docker backend
const BASE_URL = 'http://localhost:8080';

// desk endpoints

export async function getDesks() {
    try {
        const response = await fetch(`${BASE_URL}/api/desks`);
        if (!response.ok) throw new Error('Failed to fetch desks');
        return await response.json();
    } catch (error) {
        console.error("Error fetching desks:", error);
        return [];
    }
}

export async function getDeskById(deskId) {
    try {
        const response = await fetch(`${BASE_URL}/api/desks/${deskId}`);
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
        const response = await fetch(`${BASE_URL}/users/approval-pending`);
        if (!response.ok) throw new Error('Failed to fetch pending users');
        return await response.json();
    } catch (error) {
        console.error("Error fetching pending users:", error);
        return [];
    }
}

export async function getUserById(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// fetch all users for admin view
// this is used as admin login was skipped
// but we need to log in as admin
// todo: remove this once admin login is implemented
export async function getAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}