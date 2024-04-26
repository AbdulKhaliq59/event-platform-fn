import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // Check token expiration
        if (decodedToken.exp < currentTime) {
            return false; // Token expired
        }

        return true; // Valid token
    } catch (error) {
        return false; // Token is invalid
    }
};

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.email === 'admin@example.com';
    } catch (error) {

        return false;

    }
}
export const isManager = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decoded: any = decodedToken(token);
        return decoded.role === 'manager';
    } catch (error) {
        return false;
    }
}