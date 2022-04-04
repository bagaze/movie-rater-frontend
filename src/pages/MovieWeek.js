import { useEffect, useState } from "react";

import MovieCards from "../components/MovieCards";
import ErrorInfo from "../components/ErrorInfo";

import { getTMDBData } from "../utils/tmdb_api";

function MovieWeek() {
    const [ movies, setMovies ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    useEffect( () => {
        const customQueryParams = {
            "release_date.gte": "2022-03-29",
            "release_date.lte": "2022-04-05",
            "with_release_type": "3"
        }

        getTMDBData("/discover/movie", customQueryParams, setMovies, setError, setErrorInfo);
    }, []);

    if (error) {
        return <ErrorInfo errorInfo={errorInfo} />
    }

    return (
        <main>
            <h1>Movies by weeks</h1>
            {!movies && <p>Loading</p>}
            {movies && <MovieCards movies={movies} />}
        </main>
    )
};

export default MovieWeek;
