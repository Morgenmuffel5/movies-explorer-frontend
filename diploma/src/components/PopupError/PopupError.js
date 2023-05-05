
function PopupError (props) {

    const close = () => {
        props.close();
    }

    return (
        <div className={`popup-error ${props.isError ? 'popup-error_visible' : ''}`}>
            <div className="popup-error__cont">
                <button className="popup-error__button" onClick={close}></button>
            </div>
            <p className="popup-error__text" >{props.message}</p>
        </div>
    )
}

export default PopupError;