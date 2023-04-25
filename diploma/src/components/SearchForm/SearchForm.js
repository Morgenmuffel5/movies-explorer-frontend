import React from "react";

function SearchForm () {

    const [isShortFilms, setIsShortFilms] = React.useState(true);

    function changeCheckbox() {
        setIsShortFilms(!isShortFilms);
    }

    return (
        <section className="search">
            <div className="search__container">
                <input className="search__input" placeholder="Фильм"/>
                <button className="search__button">Найти</button>
            </div>

            <div className="search__toggle-container">
                <label className="search__toggle">
                    <input
                        type="checkbox"
                        checked={isShortFilms}
                        onChange={changeCheckbox}
                        className="search__checkbox"
                    />
                    <div className="search__visible-checkbox">
                        <div className={`search__circle ${isShortFilms ? '' : 'search__circle_inactive'}`}></div>
                    </div>
                </label>
                <span className="search__toggle-text">Короткометражки</span>
            </div>
        </section>
    )
}

export default SearchForm;