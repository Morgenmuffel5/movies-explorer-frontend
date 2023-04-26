import {Link, useHistory} from "react-router-dom";

function Navigation(props) {

    const history = useHistory();

    const closeMenu = () => {
        props.closeMenu()
    }

    return (
        <>
        <div className={`menu ${props.isMenuOpen ? 'menu_visible' : ''}`}>
            <div className="menu__card">
                <div className="menu__button-cont" >
                    <button className="menu__close-button" onClick={closeMenu}/>
                </div>

                <div className="menu__container">
                    <Link to="/" onClick={closeMenu}
                          className={`menu__link  ${history.location.pathname === "/" ? 'menu__link_underline' : ''}`}>
                        Главная
                    </Link>
                    <Link to="/movies" onClick={closeMenu}
                          className={`menu__link ${history.location.pathname === "/movies" ? 'menu__link_underline' : ''}`}>
                        Фильмы
                    </Link>
                    <Link to="/saved-movies" onClick={closeMenu}
                          className={`menu__link ${history.location.pathname === "/saved-movies" ? 'menu__link_underline' : ''}`}>
                        Сохраненные фильмы
                    </Link>
                </div>
                <div className='menu__account' >
                    <Link to="/profile" onClick={closeMenu}
                          className="menu__link">
                        <div className="menu__link-container">
                            <span className="menu__account-text">Аккаунт</span>
                            <div className="menu__icon"></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navigation;