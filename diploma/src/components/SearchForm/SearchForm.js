import React, {useContext, useEffect, useState} from "react";
import FormError from "../FormError/FormError";
import {CurrentUserContext} from '../../context/UserContext';
import {useHistory} from "react-router-dom";

function SearchForm(props) {
    const history = useHistory();
    const currentUser = useContext(CurrentUserContext);
    const [search, setSearch] = useState('');
    const [valid, setValid] = useState(false);
    const [errorMessageSearch, setErrorMessageSearch] = useState("");

    useEffect(()=> {
        //если мы странице фильмов, то смотрим есть ли там keyword и checkbox, если есть - естанавливаем значения
        if (history.location.pathname === "/movies") {
            if (localStorage.getItem('keyword')) {
                setSearch(JSON.parse(localStorage.getItem('keyword')))
            }
        }
    }, []);

    const toggleCheckbox = () => {
        props.toggle(!props.checkbox, search);
    }

    const searchFilms = (e) => {
        e.preventDefault();
        if (search === '') {
            setValid(false);
            setErrorMessageSearch('Поле поиска не должно оставаться пустым, пожулуйста введите ключевое слово');
        } else {
            setValid(true);
            setErrorMessageSearch('');
            if (props.savedFilms) {
                props.submit(search, props.checkbox)
            } else {
                props.submit(currentUser._id, search, props.checkbox);
            }
        }
    }

    const handleInput = (e) => {
        if (!valid) {
            setValid(true);
            setErrorMessageSearch('')
        }
    };

    return (
        <div className="search">
            <form className="search__container" onSubmit={searchFilms}>
                <input id="search-input"
                       className="search__input"
                       placeholder="Фильм"
                       type="text"
                       name="search"
                       value={search}
                       onInput={(e) => handleInput(e)}
                       onChange={(e) => setSearch(e.target.value)}/>
                <button className="search__button">Найти</button>
            </form>
            <FormError identificator="search-input-error"
                       message={errorMessageSearch}/>

            <div className="search__toggle-container">
                <div className="search__checkbox">

                    <input
                        className="search__toggle"
                        type="checkbox"
                        checked={props.checkbox}
                        onChange={toggleCheckbox}
                    />

                    <div className="search__toggle-text">
                        Короткометражки
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SearchForm;