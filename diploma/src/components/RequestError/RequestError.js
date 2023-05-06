
function RequestError (props) {
    return (
        <div className={`request-error ${props.isError ? 'request-error_visible' : ''}`}>
            <p>{props.errorMessage}</p>
        </div>
    )
}

export default RequestError;