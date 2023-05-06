import NavTab from "../NavTab/NavTab";
import {Link, useHistory} from "react-router-dom";

function Header (props) {
    const history = useHistory();

    return (
        <header className={`header ${history.location.pathname === "/" ? 'header_with-background' : ''}`}>
            <div className={`header__container ${history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ? 'header__container_sign' : ''}`}>
                <Link to="/" className='header__logo'></Link>
                <NavTab openMenu={props.openMenu}
                        loggedIn={props.loggedIn}/>
            </div>
        </header>
    )
}

export default Header;