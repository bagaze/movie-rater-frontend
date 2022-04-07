import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "../styles/MovieSearchForm.css"

function MovieSearchForm({ value, onSubmit, onChange, onClear }) {
    return (
        <form id="search_form" onSubmit={onSubmit}>
            <input
                id="form_field"
                className="form__field"
                placeholder="Movie title"
                type="text"
                value={value}
                onChange={onChange}
            />
            <button 
                type="button"
                className="clear_button"
                onClick={onClear}>
                    <FontAwesomeIcon
                        size="xl"
                        icon={faXmark}
                    />
            </button>
        </form>
    )
}

export default MovieSearchForm;
