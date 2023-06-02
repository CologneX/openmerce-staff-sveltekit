import { goto } from "$app/navigation";
import { isStaffLoggedInStore } from "./stores";

export const logoutStaff = async () => {
    const response = await fetch('/api/v1/staff/auth/logout', {
        method: 'POST',
    });
    if (response.ok) {
        localStorage.removeItem('fin_user');
        localStorage.removeItem('inv_user');
        localStorage.removeItem('sys_admin');
        localStorage.removeItem('username');
        isStaffLoggedInStore.set(false)
        goto('/login');
    }
}

export const getStaffUsername = () => {
    const username = localStorage.getItem('username');
    return username;
};

