import PropTypes from "prop-types";

function ErrorInfo( { errorInfo } ) {
    return (
        <p>Error while retrieving the information: {errorInfo}</p>
    )
}

ErrorInfo.propTypes = {
    errorInfo: PropTypes.string.isRequired
}

export default ErrorInfo;
