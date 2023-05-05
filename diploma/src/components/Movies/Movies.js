import React, {useState, useMemo, useEffect, useContext} from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import movieApi from "../../utils/MovieApi";
import {Film} from "../../utils/Film";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
import EmptySearch from "../EmptySearch/EmptySearch";
import {CurrentUserContext} from "../../context/UserContext";
import api from "../../utils/Api";
import MovieApi from "../../utils/MovieApi";
import SearchError from "../SearchError/SearchError";
import PopupError from "../PopupError/PopupError";


function Movies(props) {
    const currentUser = useContext(CurrentUserContext);
    const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);
    const [allFilms, setAllFilms] = useState([]);
    const [allFilmsWithLikes, setAllFilmsWithLikes] = useState([]);
    const [searchResultList, setSearchResultList] = useState([]);
    const [finalResultList, setFinalResultList] = useState([]);
    const [listForShow, setListForShow] = useState([]);
    const [isShort, setIsShort] = useState(true);
    const [emptySearch, setEmptySearch] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [likeDeleteError, setLikeDeleteError] = useState(false);
    const [likeDeleteErrorMessage, setLikeDeleteErrorMessage] = useState('');

    useEffect(() => {
        setEmptySearch(false);
        setSearchError(false);

        if (localStorage.getItem('emptySearch')) {
            setEmptySearch(JSON.parse(localStorage.getItem('emptySearch')));
        }
        if (localStorage.getItem('checkbox')) {
            setIsShort(JSON.parse(localStorage.getItem('checkbox')));
        }
        if (localStorage.getItem('searchError')) {
            setSearchError(JSON.parse(localStorage.getItem('searchError')));
        }
        if (localStorage.getItem('allFilms')) {
            setAllFilms(JSON.parse(localStorage.getItem('allFilms')));
        }
        if (localStorage.getItem('listWithLike')) {
            setAllFilmsWithLikes(JSON.parse(localStorage.getItem('listWithLike')));
        }
        if (localStorage.getItem('filterByKeywordList')) {
            setSearchResultList(JSON.parse(localStorage.getItem('filterByKeywordList')));
        }
        if (localStorage.getItem('filterByDurationList')) {
            setFinalResultList(JSON.parse(localStorage.getItem('filterByDurationList')));
        }
        if (localStorage.getItem('listForShow')) {
            setListForShow(JSON.parse(localStorage.getItem('listForShow')));
        }


    }, []);

    //обработка массивов
    const createArr =(id, keyWord, isShort, allFilms) => {
        //проставляем лайки
        const withLike = movieApi.setLike(id, allFilms, props.userFilms);
        localStorage.setItem('listWithLike', JSON.stringify(withLike))
        //фильруем по выбраным словам
        const searchRes = movieApi.sortByKeyWord(keyWord, withLike);
        localStorage.setItem('filterByKeywordList', JSON.stringify(searchRes));
        //фильруем по метражу и получаем финальный лист
        const resList = movieApi.filterDuration(isShort, searchRes);
        localStorage.setItem('filterByDurationList', JSON.stringify(resList));
        //извлекаем первоначальное кол-во карточек
        if (resList.length > 0) {
            const setupCardList = resList.slice(0, props.setupListCount);
            setListForShow(setupCardList);
            localStorage.setItem('listForShow', JSON.stringify(setupCardList))
        }

        setEmptySearch(resList.length < 1);
        localStorage.setItem('emptySearch', JSON.stringify(resList.length < 1))
        setFinalResultList(resList);
        setAllFilmsWithLikes(withLike);
        setSearchResultList(searchRes);
    }


    function getFilms(id, keyWord, isShort) {
        setIsLoadingInProgress(true);
        setEmptySearch(false);
        setSearchError(false);
        localStorage.setItem('keyword', JSON.stringify(keyWord))
        movieApi.getAllFilms().then((response) => {
            if (response) {
                //загоняем в массив все фильмы
                const all = movieApi.createFilmList(response);
                localStorage.setItem('allFilms', JSON.stringify(all));
                createArr(id, keyWord, isShort, all )
                setAllFilms(all);
                setIsLoadingInProgress(false)

            }
        }).catch((error) => {
            setSearchError(true);
            localStorage.setItem('searchError', JSON.stringify(true))
            setIsLoadingInProgress(false);
        })
    }

    const toggleDuration = (isShort) => {
        setIsShort(isShort);
        localStorage.setItem('checkbox', JSON.stringify(isShort));

        const list = movieApi.filterDuration(isShort, searchResultList);
        const setupCardList = list.slice(0, props.setupListCount);
        setListForShow(setupCardList)
        localStorage.setItem('listForShow', JSON.stringify(setupCardList))
        setFinalResultList(list);
        localStorage.setItem('filterByDurationList', JSON.stringify(list));
        if (allFilms.length > 0) {
            setEmptySearch(setupCardList.length < 1);
            localStorage.setItem('emptySearch', JSON.stringify(setupCardList.length < 1))
        }
    }



    //изменение массивов при лайке и делите
    const changeLike = (ownerId, filmId) => {
        const newWithLike = allFilmsWithLikes.slice(0, allFilmsWithLikes.length);
        const indexLike = newWithLike.findIndex((item) => item.movieId === filmId);
        newWithLike[indexLike].owner = ownerId;
        setAllFilmsWithLikes(newWithLike);
        localStorage.setItem('listWithLike', JSON.stringify(newWithLike));

        const newWithFilter = searchResultList.slice(0, searchResultList.length);
        const indexFilter = newWithFilter.findIndex((item) => item.movieId === filmId);
        newWithFilter[indexFilter].owner = ownerId;
        setAllFilmsWithLikes(newWithFilter);
        localStorage.setItem('filterByKeywordList', JSON.stringify(newWithFilter));

        const newWithFilterDuration = finalResultList.slice(0, finalResultList.length);
        const indexFilterDuration = newWithFilterDuration.findIndex((item) => item.movieId === filmId);
        newWithFilterDuration[indexFilterDuration].owner = ownerId;
        setFinalResultList(newWithFilter);
        localStorage.setItem('filterByDurationList', JSON.stringify(newWithFilterDuration));

        const newShowList = listForShow.slice(0, listForShow.length);
        const indexShowList = newShowList.findIndex((item) => item.movieId === filmId);
        newShowList[indexShowList].owner = ownerId;
        setListForShow(newShowList);
        localStorage.setItem('listForShow', JSON.stringify(newShowList));
    }



    const likeFilm = (film) => {
        const filmForSave = {
            country: film.country,
            director: film.director,
            duration: film.duration,
            year: film.year,
            description: film.description,
            image: film.image,
            trailerLink: film.trailerLink,
            thumbnail: film.thumbnail,
            movieId: film.movieId,
            nameRU: film.nameRU,
            nameEN: film.nameEN,
        }
        api.createNewFilm(filmForSave).then((response) => {
            film.owner = currentUser.data._id;
            changeLike(currentUser.data._id, film.movieId)
            props.updateUserFilms();
        }).catch((error) => {
            setLikeDeleteError(true);
            setLikeDeleteErrorMessage('При сохранении фильма произошла ошибка. Подождите немного и попробуйте еще раз. Код ошибки - ' + error);
        })
    }

    const deleteFilm = (film) => {
        const idx = props.userFilms.findIndex((filmItem) => filmItem.movieId === film.movieId);
        const filmId = props.userFilms[idx]._id;

        api.deleteFilm(filmId).then((response) => {
            changeLike('', film.movieId)
            props.updateUserFilms();
        }).then(() => {
            film.owner = '';

            console.log('Фильм успешно удален')
        }).catch((error) => {
            setLikeDeleteError(true);
            setLikeDeleteErrorMessage('При удалении фильма произошла ошибка. Подождите немного и попробуйте еще раз. Код ошибки - ' + error);
        })
    }

    const showMoreFilms = () => {
        const newCardList = finalResultList.slice(0, listForShow.length + props.addCount);
        setListForShow(newCardList)
        localStorage.setItem('listForShow', JSON.stringify(newCardList))
    }

    const closePopup = () => {
        setLikeDeleteError(false);
        setLikeDeleteErrorMessage('');
    }

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main className="films">
                <SearchForm submit={getFilms}
                            toggle={toggleDuration}
                            checkbox={isShort}
                            savedFilms={false}/>

                {isLoadingInProgress ?
                    <Preloader/> :
                    <>
                        {
                            emptySearch ?

                                <EmptySearch/> : <MoviesCardList films={listForShow}
                                                                 like={likeFilm}
                                                                 delete={deleteFilm}
                                />
                        }
                        <SearchError error={searchError}/>
                    </>

                }


                {listForShow.length > 0 && finalResultList.length > 0 && finalResultList.length > listForShow.length ?
                    <button className="films__more-button" onClick={showMoreFilms}>Ещё </button> : <></>}
            </main>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen}/>
            <PopupError isError={likeDeleteError}
                        close={closePopup}
                        message={likeDeleteErrorMessage}/>
            <Footer/>
        </>
    )
}

export default Movies;