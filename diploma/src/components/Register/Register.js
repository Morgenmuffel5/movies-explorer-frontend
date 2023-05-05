import Header from "../Header/Header";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import FormError from "../FormError/FormError";
import auth from "../../utils/Auth";
import RequestError from "../RequestError/RequestError";

function Register (props) {

    const history = useHistory();
    const [isDisable, setIsDisable] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageName, setErrorMessageName] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [valid, setValid] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');


    const clearRegisterError = () => {
        setRegisterError(false)
        setRegisterErrorMessage('')
    }

    React.useEffect(() => {
        clearRegisterError();
    }, []);

    //регистрация
    const createAccount = (e) => {
        e.preventDefault();
        const userData={
            name: name,
            email: email,
            password: password,
        }
        auth.createNewUser(userData)
            .then(() => {
                props.login({
                    email: email,
                    password: password,
                });
                setName("");
                setEmail("");
                setPassword("")
                setValid(false);

            })
            .catch((error) => {
                if (error === '409') {
                    setRegisterErrorMessage('Пользователь с таким email уже существует');
                } else {
                    setRegisterErrorMessage('При регистрации пользователя произошла ошибка');
                }
                setRegisterError(true);
            });
    };


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

    return(
        <>
            <Header loggedIn={false}/>
            <main>
                <section className="register">
                    <h2 className="register__title">Добро пожаловать!</h2>
                    <form className="register__form" onSubmit={createAccount}>
                        <div className="register__input-cont">
                            <label htmlFor="name-input" className="register__label">Имя</label>
                            <input id="name-input"
                                   className="register__input"
                                   type="text"
                                   name="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   onInput={(e) => handleInput(e)}
                                   required/>
                            <FormError identificator="name-input-error"
                                       message={errorMessageName} />
                        </div>

                        <div className="register__input-cont">
                            <label htmlFor="email-input" className="register__label">E-mail</label>
                            <input id="email-input"
                                   className="register__input"
                                   type="email"
                                   name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   onInput={(e) => handleInput(e)}
                                   required/>
                            <FormError identificator="email-input-error"
                                       message={errorMessageEmail} />
                        </div>

                        <div className="register__input-cont">
                            <label htmlFor="password-input" className="register__label">Пароль</label>
                            <input id="password-input"
                                   className="register__input"
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
                        <RequestError errorMessage={registerErrorMessage}
                                      isError={registerError}/>
                        <button type="submit" className={`register__submit-button ${isDisable || !valid ? 'register__submit-button_disabled' : ''}`}>Зарегистрироваться</button>
                    </form>
                    <p className="register__sign-in">
                        Уже зарегистрированы? <Link className="register__link" to={"sign-in"}>Войти</Link>
                    </p>
                </section>
            </main>
        </>
    )
}

export default Register;