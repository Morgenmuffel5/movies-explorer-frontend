import {useState} from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";


function Movies (props) {
    const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);
    /*const [films, setFilms] = useState([]);*/

    const films = [
        {
            country: "Россия",
            director: "Кто-то",
            duration: 12,
            year: "2002",
            description: "Это тестовый фильм, чтобы проверить верстку карточки",
            image: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            trailerLink: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            thumbnail: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            owner: "_id1234566",
            movieId: 12345,
            nameRU: "Тестовый фильм",
            nameEN: "Test Film"
        },
        {
            country: "Россия",
            director: "Кто-то",
            duration: 12,
            year: "2002",
            description: "Это тестовый фильм, чтобы проверить верстку карточки",
            image: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            trailerLink: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            thumbnail: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            owner: "_id1234566",
            movieId: 123456,
            nameRU: "Тестовый фильм",
            nameEN: "Test Film"
        },
        {
            country: "Россия",
            director: "Кто-то",
            duration: 12,
            year: "2002",
            description: "Это тестовый фильм, чтобы проверить верстку карточки",
            image: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            trailerLink: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            thumbnail: "https://img.ixbt.site/live/images/original/02/48/98/2023/02/15/5436708224.jpg",
            owner: "_id1234566",
            movieId: 123457,
            nameRU: "Тестовый фильм",
            nameEN: "Test Film"
        }
    ]

    return (
        <>
            <Header  loggedIn={props.loggedIn}
                     openMenu={props.openMenu} />
            <main className="films">
                <SearchForm />

                {isLoadingInProgress ?
                    <Preloader /> :
                    <>
                        <MoviesCardList films={films} />
                    </>

                }

                <button className="films__more-button">
                    Ещё
                </button>
            </main>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen} />
            <Footer />
        </>
    )
}

export default Movies;