import {useState} from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {

   /* const [films, setFilms] = useState([]);*/

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
            movieId: 123451,
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
            movieId: 123452,
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
            movieId: 123453,
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
            movieId: 123454,
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
            movieId: 123455,
            nameRU: "Тестовый фильм",
            nameEN: "Test Film"
        }
    ]

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main className="films">
                <SearchForm />
                <MoviesCardList films={films}/>
            </main>
            <Footer/>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen} />
        </>
    )
}

export default SavedMovies;


