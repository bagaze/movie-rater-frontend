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
            "release_date.gte": "2022-03-01",
            "release_date.lte": "2022-04-11",
            "with_release_type": "3"
        };

        getTMDBData("/discover/movie", customQueryParams, setMovies, setError, setErrorInfo);
    }, []);

    const handleLoadMore = () => {
        const customQueryParams = {
            "release_date.gte": "2022-03-01",
            "release_date.lte": "2022-04-11",
            "with_release_type": "3"
        };
        getTMDBData("/discover/movie", customQueryParams, setMovies, setError, setErrorInfo, movies.page);
    }

    if (error) {
        return <ErrorInfo errorInfo={errorInfo} />;
    }

    return (
        <main>
            <h1>Movies by weeks</h1>
            {!movies && <p>Loading</p>}
            {movies.results && (
                <MovieCards movies={movies.results} />
            )}
            {movies.results && movies.results.length < movies.total_results && (
                <div>
                    <button onClick={handleLoadMore}>Load more results</button>
                </div>
            )}
        </main>
    );
};

export default MovieWeek;
