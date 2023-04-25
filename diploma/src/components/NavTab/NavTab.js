import {Link, useHistory} from "react-router-dom";

function NavTab (props) {

    const history = useHistory();

    const openMenu = () => {
        props.openMenu();
    }

    return (
        <>
            <div  className={`header__menu ${history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in"  ? 'header__menu_hide' : ''}`}>
                <div className="header__films">
                    <Link to="/movies"
                          className={`header__link ${history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ? 'header__link_hide' : ''}`}>
                        Фильмы
                    </Link>
                    <Link to="/saved-movies"
                          className={`header__link ${history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ?  'header__link_hide' : ''}`}>
                        Сохраненные фильмы
                    </Link>
                </div>
                <div className="header__login">
                    <Link to="/sign-up"
                          className={`header__link-signup ${props.loggedIn || history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ? 'header__link_hide' : ''}`}>
                        Регистрация
                    </Link>
                    <Link to="/sign-in"
                          className={`header__link-signin  ${props.loggedIn || history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ? 'header__link_hide' : ''} `}>
                        <div className="header__link-text">Войти</div>
                    </Link>
                    <Link to="/profile"
                          className={`header__link ${props.loggedIn && !(history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in") ? '' : 'header__link_hide'}`}>
                        <div className="header__link-container">
                            <span className="header__account-text">Аккаунт</span>
                            <div className="header__icon"></div>
                        </div>
                    </Link>
                    <button className={`header__menu-button ${props.loggedIn &&!(history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in") ? '' : 'header__link_hide'}`}
                            onClick={openMenu}></button>
                </div>
            </div>
        </>

    )
}

export default NavTab;