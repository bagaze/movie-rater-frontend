import { useState } from "react";

import "../styles/MovieSearch.css"

import ErrorInfo from "../components/ErrorInfo";
import MovieCards from "../components/MovieCards";
import MovieSearchForm from "../components/MovieSearchForm";
import MainLayout from "../components/MainLayout";
import { useStateWithSessionStorage } from "../utils/hooks";
import { getTMDBData } from "../utils/tmdb_api";

function MovieSearch() {
    const pageTitle = "Search movies";

    const [ searchField, setSearchField ] = useStateWithSessionStorage(
        "moviesearch__searchField",
        ""
    );
    const [ lastSearchedField, setLastSearchedField ] = useStateWithSessionStorage(
        "moviesearch__lastSearchedField",
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

        setLastSearchedField(e.target.form_field.value);
        if (searchField) {
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
    }

    const handleLoadMore = () => {
        console.log(lastSearchedField);
        const customQueryParams = {
            query: lastSearchedField
        };
        getTMDBData("/search/movie", customQueryParams, setMovies, setError, setErrorInfo, movies.page);
    }

    if (!lastSearchedField) {
        return (
            <main>
                <h1>Search movies</h1>
                <MovieSearchForm
                    onChange={handleChange}
                    onSubmit={handleOnSubmit}
                    value={searchField}
                />
            </main>
        )
    }

    if (error) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    onChange={handleChange}
                    onSubmit={handleOnSubmit}
                    value={searchField}
                />
                <ErrorInfo errorInfo={errorInfo} />
            </MainLayout>
        )
    }

    if (movies && movies.total_results === 0) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    onChange={handleChange}
                    onSubmit={handleOnSubmit}
                    value={searchField}
                />
                <p>No movies found for title={lastSearchedField}</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            <MovieSearchForm
                onChange={handleChange}
                onSubmit={handleOnSubmit}
                value={searchField}
            />
            {movies && <MovieCards movies={movies.results} />}
            {movies.results && movies.results.length < movies.total_results && (
                <div>
                    <button onClick={handleLoadMore}>Load more results</button>
                </div>
            )}
        </MainLayout>
    )
}

export default MovieSearch;
