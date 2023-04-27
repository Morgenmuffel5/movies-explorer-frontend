import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";

function Profile (props) {
    function logOut () {
        localStorage.removeItem('token');
    }

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main>
                <section className="account">
                    <h2 className="account__title account__title_center">Привет, {props.user.data.name}!</h2>
                    <div className="account__info">
                        <span className="account__text">Имя</span>
                        <span className="account__text">{props.user.data.name}</span>
                    </div>
                    <div className="account__info">
                        <span className="account__text">E-mail</span>
                        <span className="account__text">{props.user.data.email}</span>
                    </div>
                    <button className="account__button">Редактировать</button>
                    <Link to="/sign-in" onClick={logOut}
                          className="account__button account__button_red-text">
                        Выйти из аккаунта
                    </Link>
                </section>
            </main>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen} />
        </>
    )
}

export default Profile;