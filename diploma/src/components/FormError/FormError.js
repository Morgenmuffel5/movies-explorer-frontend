

function FormError (props) {
    return (
        <div id={props.identificator}>
            <span className="input-error">{props.message}</span>
        </div>
    )
}

export default FormError;