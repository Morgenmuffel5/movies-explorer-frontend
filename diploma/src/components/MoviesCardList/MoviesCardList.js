import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList (props) {

    return (
        <section className="films__list">
            {props.films.map((filmItem) => (
                <MoviesCard film={filmItem}
                            key={filmItem._id} />
            ))}
        </section>
    )
}

export default MoviesCardList;