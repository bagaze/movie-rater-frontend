function MovieSearchForm({ value, onSubmit, onChange }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                id="form_field"
                className="form__field"
                placeholder="Movie title"
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>
    )
}

export default MovieSearchForm;
