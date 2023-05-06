class Auth {
    constructor({baseURL, headers}) {
        this.url = baseURL;
        this._headers = headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`${response.status}`);
    }

    //регистрация (требуется имя, мыло и пароль)
    createNewUser(userData) {
        return fetch(`${this.url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(userData),
        })
            .then((res) => {
                return this._checkResponse(res);
            })
            .then((response) => {
                localStorage.setItem("token", response.token);
                return response;
            });
    }

    //логин, требуется мыло и логин
    logInCurrentUser(userData) {
        return fetch(`${this.url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(userData),
        })
            .then((res) => {
                return this._checkResponse(res);
            })
            .then((response) => {
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    return response;
                } else {
                    return;
                }
            });
    }

//получение инфо текущего юзера
    checkToken(token) {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
                return this._checkResponse(res);
            });
    }
}

const auth = new Auth({
    baseURL: 'https://api.morgenmuffel.diploma.nomoredomains.monster',
    headers: {
        "Content-Type": "application/json",
    },
});

export default auth;