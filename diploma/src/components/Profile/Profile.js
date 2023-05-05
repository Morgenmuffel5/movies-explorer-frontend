import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import {Link, useHistory} from "react-router-dom";
import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../../context/UserContext';
import FormError from "../FormError/FormError";
import api from "../../utils/Api";
import RequestError from "../RequestError/RequestError";

function Profile (props) {

    const history = useHistory();
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessageName, setErrorMessageName] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [valid, setValid] = useState(true);

    const [editUserError, setEditUserError] = useState(false);
    const [editUserErrorMessage, setEditUserErrorMessage] = useState('');


    const clearEditUserError = () => {
        setEditUserError(false)
        setEditUserErrorMessage('')
    }

    React.useEffect(() => {
        clearEditUserError();
    }, []);

    useEffect(() => {
        setName(currentUser.data.name);
        setEmail(currentUser.data.email);
        setErrorMessageEmail('');
        setErrorMessageName('');
    }, [currentUser]);

    function logOut () {
        props.setLoggedIn(false);
        localStorage.clear()
        history.push('/')
    }


    const editProfile = (e) => {
        e.preventDefault();
        const userData={
            email:email,
            name: name,
        }

        api.editUser(userData).then((response) => {
            if (response) {
                props.editUser(response);
            }
        }).catch((error) => {
            if (error === '409') {
                setEditUserErrorMessage('Пользователь с таким email уже существует');
            } else {
                setEditUserErrorMessage('При обновлении профиля произошла ошибка');
            }
            setEditUserError(true);
        })
    }

    const handleInput = (e) => {
        switch (e.target.name) {
            case "name":
                if (!e.target.validity.valid) {
                    setValid(false);
                    setErrorMessageName(e.target.validationMessage);
                } else {
                    setErrorMessageName("");
                }
                break;
            case "email":
                if (!e.target.validity.valid) {
                    setValid(false);
                    setErrorMessageEmail(e.target.validationMessage);
                } else {
                    setErrorMessageEmail("");
                }
                break;
        }

        if (e.target.closest("form").checkValidity()) {
            setValid(true);
        }
    };

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main>
                <section className="account">
                    <h2 className="account__title account__title_center">Привет, {currentUser.data.name}!</h2>
                    <form className="account__form" onSubmit={editProfile}>
                        <div className="account__info">
                            <label htmlFor="name-input" className="account__text">Имя</label>
                            <input id="name-input"
                                   className="account__input"
                                   type="text"
                                   name="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   onInput={(e) => handleInput(e)}
                                   required/>
                        </div>
                        <FormError identificator="name-input-error"
                                   message={errorMessageName} />
                        <div className="account__info">
                            <label htmlFor="email-input" className="account__text">Email</label>
                            <input id="email-input"
                                   className="account__input"
                                   type="text"
                                   name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   onInput={(e) => handleInput(e)}
                                   required/>
                        </div>
                        <FormError identificator="email-input-error"
                                   message={errorMessageEmail} />
                        <RequestError errorMessage={editUserErrorMessage}
                                      isError={editUserError}/>
                        <button className="account__button account__button_padding" type="submit" disabled={!valid}>Редактировать</button>
                    </form>
                    <button onClick={logOut}
                          className="account__button account__button_red-text">
                        Выйти из аккаунта
                    </button>
                </section>
            </main>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen} />
        </>
    )
}

export default Profile;