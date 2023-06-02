import { logoutStaff } from "./auth";
import { triggerToast } from "./toast";

export const refreshTokenUser = async () => {
    const response = await fetch('/api/v1/staff/auth/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 401) {
        triggerToast('Your session has expired. Please login again.', 'error')
        logoutStaff();
    }
};