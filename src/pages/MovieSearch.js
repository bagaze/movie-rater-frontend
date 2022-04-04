import { useState } from "react";

import "../styles/MovieSearch.css"

import ErrorInfo from "../components/ErrorInfo";
import MovieCards from "../components/MovieCards";
import { useStateWithSessionStorage } from "../utils/hooks";
import { getTMDBData } from "../utils/tmdb_api";

function MovieSearch() {
    const [ searchField, setSearchField ] = useStateWithSessionStorage(
        "moviesearch__searchField",
        ""
    );
    const [ movies, setMovies ] = useStateWithSessionStorage(
        "moviesearch__movies",
        []
    );
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("handleOnSubmit");

        const customQueryParams = {
            query: searchField
        };

        getTMDBData(
            "/search/movie",
            customQueryParams,
            setMovies,
            setError,
            setErrorInfo
        );
    }

    if (error) {
        return <ErrorInfo errorInfo={errorInfo} />
    }

    return (
        <main>
            <h1>Search movies</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    className="form__field"
                    placeholder="Movie title"
                    type="text"
                    value={searchField}
                    onChange={handleChange}
                />
            </form>
            {movies && <MovieCards movies={movies} />}
        </main>
    )
}

export default MovieSearch;
