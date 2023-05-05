import React from "react";

function SearchError (props) {
    return (
        <p className={`search-error ${props.error ? 'search-error_visible' : ''}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
    )
}

export default SearchError;