import React from "react";
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import FormError from "../FormError/FormError";

function Login () {

    const [isDisable, setIsDisable] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [valid, setValid] = useState(false);

    const handleInput = (e) => {
        switch (e.target.name) {
            case "email":
                if (!e.target.validity.valid) {
                    setValid(false);
                    setErrorMessageEmail(e.target.validationMessage);
                } else {
                    setErrorMessageEmail("");
                }
                break;
            case "password":
                if (!e.target.validity.valid) {
                    setValid(false);
                    setErrorMessagePassword(e.target.validationMessage);
                } else {
                    setErrorMessagePassword("");
                }
                break;
        }

        if (e.target.closest("form").checkValidity()) {
            setValid(true);
        }
    };


    return (
        <>
            <Header loggedIn={false}/>
            <main>
                <section className="login">
                    <h2 className="login__title">Рады видеть!</h2>
                    <form className="login__form">
                        <div className="login__input-cont">
                            <label htmlFor="email-input" className="login__label">E-mail</label>
                            <input id="email-input"
                                   className="login__input"
                                   type="email"
                                   name="email"
                                   required
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   onInput={(e) => handleInput(e)}/>
                            <FormError identificator="email-input-error"
                                       message={errorMessageEmail} />
                        </div>

                        <div className="login__input-cont">
                            <label htmlFor="password-input" className="login__label">Пароль</label>
                            <input id="password-input"
                                   className="login__input"
                                   type="password"
                                   name="password"
                                   minLength="2"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   onInput={(e) => handleInput(e)}
                                   required/>
                            <FormError identificator="password-input-error"
                                       message={errorMessagePassword} />
                        </div>

                        <button type="submit" className={`login__submit-button ${isDisable || !valid ? 'login__submit-button_disabled' : ''}`}>Войти</button>
                    </form>
                    <p className="login__sign-in">
                        Ещё не зарегистрированы? <Link className="login__link" to={"sign-up"}>Регистрация</Link>
                    </p>
                </section>
            </main>
        </>
    )
}

export default Login ;