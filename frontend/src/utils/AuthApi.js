class AuthApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _handleRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    registerUser(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(res => this._handleRequest(res));
    }

    loginUser(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        }).then(res => this._handleRequest(res));
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(res => this._handleRequest(res));
    }
}

export const authApi = new AuthApi({
    baseUrl: 'https://api.mesto.world.nomoredomains.monster'
});