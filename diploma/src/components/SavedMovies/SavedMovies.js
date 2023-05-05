import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../context/UserContext";
import api from "../../utils/Api";
import EmptySearch from "../EmptySearch/EmptySearch";
import movieApi from "../../utils/MovieApi";

function SavedMovies(props) {

    const [emptySearch, setEmptySearch] = useState(false);
    const [isShort, setIsShort] = useState(true);
    const [finalList, setFinalList] = useState([]);
    const [searchResList, setSearchResList] = useState([]);

    //первичная фильтрация по короткометражкам
    useEffect(() => {
        const resList = movieApi.filterDuration(isShort, props.films);
        setFinalList(resList);
        setEmptySearch(false)
    }, []);

    useEffect(() => {
        const resList = movieApi.filterDuration(isShort, props.films);
        setFinalList(resList);
    }, [props.films])

    useEffect(() => {
        setEmptySearch(false);
    }, []);

    const toggleDuration = (isShort, keyWord) => {
        setIsShort(isShort);
        if (keyWord !== '') {
            filterFilms(keyWord, isShort)
        } else {
            const newList = movieApi.filterDuration(isShort, props.films)
            setFinalList(newList);

        }

    };
/*
    useEffect(() => {
        setEmptySearch(finalList.length < 1) ;
    }, [finalList]);*/

    const filterFilms = (keyWord, isShort) => {
        //фильруем по выбраным словам
        setEmptySearch(false)
        const searchRes = movieApi.sortByKeyWord(keyWord, props.films);
        const durationList = movieApi.filterDuration(isShort, searchRes);
        setFinalList(durationList);
        setSearchResList(searchRes);
        if (searchRes.length < 1) {
            setEmptySearch(true)
        }
    }

    const deleteFilm = (id) => {
        api.deleteFilm(id).then((response) => {
            props.updateUserFilms();
        }).then((response) => {
            console.log('Фильм успешно удален')
        }).catch((error) => {
            console.log('не удалось удалить фильм')
        })
    }

    return (
        <>
            <Header loggedIn={props.loggedIn}
                    openMenu={props.openMenu}/>
            <main className="films">
                <SearchForm toggle={toggleDuration}
                            checkbox={isShort}
                            submit={filterFilms}
                            savedFilms={true}/>
                {
                    emptySearch ?

                        <EmptySearch/> : <MoviesCardList films={finalList}
                                                         delete={deleteFilm}
                        />
                }
            </main>
            <Footer/>
            <Navigation closeMenu={props.closeMenu}
                        isMenuOpen={props.isMenuOpen}/>
        </>
    )
}

export default SavedMovies;


