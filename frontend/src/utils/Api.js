import { apiConfig } from "./configData.js";

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._handleRequest(res))
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,
            {
                headers: this._headers
            })
            .then(res => this._handleRequest(res));
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => this._handleRequest(res));
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`,
            {
                headers: this._headers,
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(res => this._handleRequest(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`,
            {
                headers: this._headers,
                method: 'DELETE'
            })
            .then(res => this._handleRequest(res));
    }

    toggleLikeCard(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: isLiked ? 'DELETE' : 'PUT'
        })
            .then(res => this._handleRequest(res));
    }



    setAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`,
            {
                headers: this._headers,
                method: 'PATCH',
                body: JSON.stringify(avatar)
            })
            .then(res => this._handleRequest(res));
    }
}

const api = new Api(apiConfig);

export default api;