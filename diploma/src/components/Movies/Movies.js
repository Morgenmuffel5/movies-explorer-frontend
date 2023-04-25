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
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftelecomdom.com%2Fvsyaka%2Fkartinki-na-zastavku-telefona-skachat-besplatno%2F&psig=AOvVaw0Vw0PdBzvj2CkGnlLoBQFo&ust=1682442891366000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCNiw7qmCw_4CFQAAAAAdAAAAABAD",
            trailerLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
            thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
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
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftelecomdom.com%2Fvsyaka%2Fkartinki-na-zastavku-telefona-skachat-besplatno%2F&psig=AOvVaw0Vw0PdBzvj2CkGnlLoBQFo&ust=1682442891366000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCNiw7qmCw_4CFQAAAAAdAAAAABAD",
            trailerLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
            thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
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
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftelecomdom.com%2Fvsyaka%2Fkartinki-na-zastavku-telefona-skachat-besplatno%2F&psig=AOvVaw0Vw0PdBzvj2CkGnlLoBQFo&ust=1682442891366000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCNiw7qmCw_4CFQAAAAAdAAAAABAD",
            trailerLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
            thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fakspic.ru%2Falbum%2Figry&psig=AOvVaw2H3UNzkhba-Bk4Y3xsn9uQ&ust=1682441311372000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiu4Ln8wv4CFQAAAAAdAAAAABAD",
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