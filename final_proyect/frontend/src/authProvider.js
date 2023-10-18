import decodeJwt from 'jwt-decode';
import { } from "react-admin";

const authProvider = {
    login: async ({ username, password }) => {
        const request = new Request('https://localhost:3011/login', {
            method: 'POST',
            body: JSON.stringify({ "username": username, "password": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject();
            }
            const auth = await response.json();
            const decodedToken = decodeJwt(auth.token);
            localStorage.setItem('auth', auth.token);
            localStorage.setItem('identity', JSON.stringify({ "id": auth.id, "fullName": auth.fullName }));
            localStorage.setItem('permissions', decodedToken.permissions);
            return Promise.resolve()
        } catch {
            return Promise.reject();
        }
    },
    logout: () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("identity");
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("auth");
            localStorage.removeItem("identity");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
        } catch {
            return Promise.reject()
        }
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject()
    },
};

export default authProvider;