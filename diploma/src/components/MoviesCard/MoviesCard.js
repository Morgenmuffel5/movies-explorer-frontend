import {useHistory} from "react-router-dom";
import {Film} from "../../utils/Film";

function MoviesCard(props) {

    const history = useHistory();
    const likeFilm = () => {
        if (props.film.owner === '') {
            props.like(props.film)
        } else {
            props.delete(props.film);
        }
    }
    const deleteFilm = () => {
        props.delete(props.film._id)
    }

    return (
        <>
            <div className="films__card">
                <div className="films__info">
                    <div className="films__info-cont">
                        <h2 className="films__title">{props.film.nameRU}</h2>
                        <span className="films__time">{Film.getDuration(props.film.duration)}</span>
                    </div>
                    <button
                        className={`films__like ${props.film.owner !== '' ? 'films__like_active' : ''} ${history.location.pathname === "/saved-movies" ? 'films__delete_hide' : ''}`}
                        onClick={likeFilm}></button>
                    <button
                        className={`films__delete ${history.location.pathname === "/saved-movies" ? '' : 'films__delete_hide'}`}
                        onClick={deleteFilm}></button>
                </div>
                <a className="films__link" href={props.film.trailerLink} target="_blank">
                    <img className="films__img" alt={'Постер к фильму ' + props.film.nameRU} src={props.film.image}/>
                </a>
            </div>
        </>

    )
}

export default MoviesCard;