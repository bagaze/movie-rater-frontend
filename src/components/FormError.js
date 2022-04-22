import "../styles/FormError.css";

function FormError({ action, errorInfo }) {
    return <div class="form_error">Error when {action}: <pre>{JSON.stringify(errorInfo, null, 2)}</pre></div>
}

export default FormError;
