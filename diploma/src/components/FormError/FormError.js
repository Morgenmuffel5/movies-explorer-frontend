

function FormError (props) {
    return (
        <div id={props.identificator}>
            <span className="inputError">{props.message}</span>
        </div>
    )
}

export default FormError;