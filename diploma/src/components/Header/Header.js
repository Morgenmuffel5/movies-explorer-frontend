import NavTab from "../NavTab/NavTab";
import { useHistory} from "react-router-dom";

function Header (props) {
    const history = useHistory();

    return (
        <header className={`header ${history.location.pathname === "/" ? 'header_with-background' : ''}`}>
            <div className={`header__container ${history.location.pathname === "/sign-up"||history.location.pathname === "/sign-in" ? 'header__container_sign' : ''}`}>
                <a href="/" className='header__logo'></a>
                <NavTab openMenu={props.openMenu}
                        loggedIn={props.loggedIn}/>
            </div>
        </header>
    )
}

export default Header;