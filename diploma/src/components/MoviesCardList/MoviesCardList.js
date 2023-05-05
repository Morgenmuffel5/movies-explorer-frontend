import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React from "react";
import RequestError from "../RequestError/RequestError";

function MoviesCardList(props) {
    const like = (film) => {
        props.like(film)
    }

    const deleteFilm = (id) => {
        props.delete(id);
    }
    return (
        <section className="films__list">

            {props.films.map((filmItem) => (
                <MoviesCard film={filmItem}
                            key={filmItem.movieId}
                            like={like}
                            delete={deleteFilm}
                />
            ))}
        </section>
    )
}

export default MoviesCardList;