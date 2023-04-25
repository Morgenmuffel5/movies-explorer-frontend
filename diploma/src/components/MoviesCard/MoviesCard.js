import { useHistory} from "react-router-dom";


function MoviesCard (props) {

    const history = useHistory();

    return (
        <div className="films__card">
            <div className="films__info">
                <div className="films__info-cont">
                    <h2 className="films__title">{props.film.nameRU}</h2>
                    <span className="films__time">{props.film.duration}</span>
                </div>
                <button className={`films__like ${props.film.owner !== '' ? 'films__like_active' : ''} ${history.location.pathname === "/saved-movies" ? 'films__delete_hide' : ''}`}></button>
                <button className={`films__delete ${history.location.pathname === "/saved-movies" ? '' : 'films__delete_hide'}`}></button>
            </div>
            <img className="films__img" src={props.film.image}/>
        </div>
    )
}
export default MoviesCard;