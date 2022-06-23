import "../styles/FormError.css";

function FormError({ action, errorInfo }) {
    return <div class="form_error"><p>Error when {action}:</p><pre>{JSON.stringify(errorInfo, null, 2)}</pre></div>
}

export default FormError;
