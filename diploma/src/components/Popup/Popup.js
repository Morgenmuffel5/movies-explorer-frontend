
function Popup (props) {

    const close = () => {
        props.close();
    }

    return (
        <div className={`popup ${props.class} ${props.isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__cont">
                <button className="popup__button" onClick={close}></button>
            </div>
            <p className="popup__text" >{props.message}</p>
        </div>
    )
}

export default Popup;