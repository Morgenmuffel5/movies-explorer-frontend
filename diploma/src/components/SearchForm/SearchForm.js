import React, {useState} from "react";

function SearchForm() {

    const [isShortFilms, setIsShortFilms] = React.useState(true);

    function changeCheckbox() {
        setIsShortFilms(!isShortFilms);
    }

    return (
        <div className="search">
            <form className="search__container">
                <input className="search__input"
                       placeholder="Фильм"
                       required/>
                <button className="search__button">Найти</button>
            </form>

            <div className="search__toggle-container">
                <div className="search__toggle">
                    <input
                        type="checkbox"
                        checked={isShortFilms}
                        onChange={changeCheckbox}
                        className="search__checkbox"
                    />
                    <div className="search__visible-checkbox">
                        <div className={`search__circle ${isShortFilms ? '' : 'search__circle_inactive'}`}></div>
                    </div>
                </div>
                <span className="search__toggle-text">Короткометражки</span>
            </div>
        </div>
    )
}

export default SearchForm;