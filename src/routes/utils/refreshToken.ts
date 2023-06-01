import { logoutStaff } from "./auth";

export const refreshTokenUser = async () => {
    const response = await fetch('/api/v1/staff/auth/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 401) {
        await logoutStaff();
    }
};