class Api {
    constructor({baseURL, headers}) {
        this.url = baseURL;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`${response.status}`);
    }

    //получение данных текущего юзера
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    //редактирование юзера
    editUser(userData) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((res) => {
            return this._checkResponse(res);
        });
    }


    //удаление фильма
    deleteFilm(filmId) {
        return fetch(`${this.url}/movies/${filmId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    //добавление нового фильма
    createNewFilm(filmData) {
        return fetch(`${this.url}/movies`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filmData),
        }).then((res) => {
            return this._checkResponse(res);
        });
    }
}


const api = new Api({
    baseURL: 'https://api.morgenmuffel.diploma.nomoredomains.monster'
});

export default api;