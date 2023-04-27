import React from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

function App() {

    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({
        data: {
            name: 'Виталий',
            email: 'abc@abc.com'
        }
    });
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const openMenu = () => {
        setMenuOpen(true);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }
    return (
        <div className="page">
            <div className="page__content">
                <Switch>

                    <Route exact path="/">
                        <Main loggedIn={loggedIn}
                              openMenu={openMenu}
                        closeMenu={closeMenu}
                        isMenuOpen={isMenuOpen}/>
                    </Route>


                    <Route path="/movies">
                        <Movies loggedIn={loggedIn}
                                openMenu={openMenu}
                                closeMenu={closeMenu}
                                isMenuOpen={isMenuOpen}/>
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies loggedIn={loggedIn}
                                     openMenu={openMenu}
                                     closeMenu={closeMenu}
                                     isMenuOpen={isMenuOpen}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login/>
                    </Route>
                    <Route path="/sign-up">
                        <Register/>
                    </Route>
                    <Route path="/profile">
                        <Profile user={currentUser}
                                 loggedIn={loggedIn}
                                 openMenu={openMenu}
                                 closeMenu={closeMenu}
                                 isMenuOpen={isMenuOpen}/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>


                </Switch>
            </div>
        </div>
    );
}

export default App;

