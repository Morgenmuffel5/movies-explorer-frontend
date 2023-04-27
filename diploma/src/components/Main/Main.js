import React from "react";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

function Main (props) {
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen} />
        </>
    )
}

export default Main;