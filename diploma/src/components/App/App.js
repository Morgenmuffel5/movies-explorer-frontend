import React from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import {CurrentUserContext} from '../../context/UserContext';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import auth from '../../utils/Auth';
import api from "../../utils/Api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Portfolio from "../Portfolio/Portfolio";
import movieApi from "../../utils/MovieApi";
import MovieApi from "../../utils/MovieApi";


function App() {

    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({data: {}});
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [films, setFilms] = useState([]);
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const [addCount, setAddCount] = useState(Number());
    const [setupMovieListCount, setSetupMovieListCount] = useState(Number());
    let timer;


    const openMenu = () => {
        setMenuOpen(true);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const clearLoginError = () => {
        setLoginError(false)
        setLoginErrorMessage('')
    }

    const resize = () => {
        clearTimeout(timer);
        timer = setTimeout(handleResize, 2000);
    }

    const handleResize = () => {
        if (window.innerWidth < 480) {
            setAddCount(2);
            setSetupMovieListCount(5);
        } else if (window.innerWidth < 768) {
            setAddCount(7);
            setSetupMovieListCount(7);
        } else {
            setAddCount(7);
            setSetupMovieListCount(7);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resize);
        handleResize();
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);


    //получение инфо о пльзователе и фильмов
    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), movieApi.getSavedFilms()])
                .then(([userData, userFilms]) => {
                    setCurrentUser(userData);
                    setFilms(userFilms);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [loggedIn]);

    //проверка токена
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken(token)
                .then((response) => {
                    if (response) {
                        setLoggedIn(true);
                        history.push(history.location.pathname)
                    }
                })
                .catch((err) => console.log(err))

        }
    }, [loggedIn, history]);

    //вход
    const handleLogin = (userData) => {
        setLoginError(false);
        setLoginErrorMessage('');
        auth.logInCurrentUser(userData)
            .then((response) => {
                localStorage.setItem('token', response.token);
            })
            .then(() => {
                setLoggedIn(true);
            })
            .then(() => history.push('/movies'))
            .catch((error) => {
                setLoginError(true)
               setLoginErrorMessage('Вы ввели неправильный логин или пароль')

            });
    };

    //изменение стейта логина
    const setLogin = (val) => {
        setLoggedIn(val)
    }

    //изменение стейта юзера
    const setUser = (userData) => {
        setCurrentUser(userData);
    }

    const updateSaveFilms = () => {
        MovieApi.getSavedFilms().then((response) => {
            setFilms(response);
        }).catch((error) => {
            console.log('Не удалось сохранить фильм');
            }
        )
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Switch>

                        <Route exact path="/">
                            <Main loggedIn={loggedIn}
                                  openMenu={openMenu}
                                  closeMenu={closeMenu}
                                  isMenuOpen={isMenuOpen}
                            />
                        </Route>

                        <Route path="/sign-in">
                            {loggedIn ? <Redirect to='/' /> :  <Login signIn={handleLogin}
                                                                      errorMessage={loginErrorMessage}
                                                                      isError={loginError}
                                                                      clearErrors={clearLoginError}/> }

                        </Route>
                        <Route path="/sign-up">
                            {loggedIn ? <Redirect to='/' /> : <Register login={handleLogin}/> }

                        </Route>

                        <Route path="/movies">
                            {loggedIn ?
                                <ProtectedRoute
                                exact
                                path='/movies'
                                loggedIn={loggedIn}
                                component={Movies}
                                userFilms={films}
                                openMenu={openMenu}
                                closeMenu={closeMenu}
                                isMenuOpen={isMenuOpen}
                                updateUserFilms={updateSaveFilms}
                                addCount={addCount}
                                setupListCount={setupMovieListCount}
                            /> : <Redirect to='/' />}

                        </Route>

                        <Route path="/saved-movies">
                            {loggedIn ?
                                <ProtectedRoute
                                exact
                                path='/saved-movies'
                                loggedIn={loggedIn}
                                component={SavedMovies}
                                openMenu={openMenu}
                                closeMenu={closeMenu}
                                isMenuOpen={isMenuOpen}
                                films={films}
                                updateUserFilms={updateSaveFilms}
                            /> : <Redirect to='/' />}

                        </Route>


                        <Route path="/profile">
                            {loggedIn ?
                                <ProtectedRoute
                                    exact
                                    path='/profile'
                                    loggedIn={loggedIn}
                                    component={Profile}
                                    openMenu={openMenu}
                                    closeMenu={closeMenu}
                                    isMenuOpen={isMenuOpen}
                                    editUser={setUser}
                                    setLoggedIn={setLoggedIn}
                                /> : <Redirect to='/' />}

                        </Route>


                        <Route path="*">
                            <NotFound/>
                        </Route>


                    </Switch>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

