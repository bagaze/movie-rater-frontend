import { useState } from "react";
import ReactLoading from 'react-loading';

import ErrorInfo from "../components/ErrorInfo";
import MovieCards from "../components/MovieCards";
import MovieSearchForm from "../components/MovieSearchForm";
import MainLayout from "../components/MainLayout";
import { useStateWithSessionStorage } from "../utils/hooks";
import { getMRBackData } from "../utils/helper_api";

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
        null
    );
    const [ moviesLoading, setMoviesLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleClear = (e) => {
        setMovies(null);
        setMoviesLoading(false);
        setSearchField('');
        setLastSearchedField('');
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setMovies(null);
        setMoviesLoading(true);

        setLastSearchedField(e.target.form_field.value);
        if (searchField) {
            const customQueryParams = {
                query: searchField
            };

            await getMRBackData(
                "/movies",
                customQueryParams,
                setMovies,
                setError,
                setErrorInfo
            );
            setMoviesLoading(false);
        }
    }

    const handleLoadMore = () => {
        const customQueryParams = {
            query: lastSearchedField
        };
        getMRBackData("/movies", customQueryParams, setMovies, setError, setErrorInfo, movies.page);
    }

    if (!lastSearchedField) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    value={searchField}
                    onSubmit={handleOnSubmit}
                    onChange={handleChange}
                    onClear={handleClear}
                />
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    value={searchField}
                    onSubmit={handleOnSubmit}
                    onChange={handleChange}
                    onClear={handleClear}
                />
                <ErrorInfo errorInfo={errorInfo} />
            </MainLayout>
        );
    }

    if (moviesLoading) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    value={searchField}
                    onSubmit={handleOnSubmit}
                    onChange={handleChange}
                    onClear={handleClear}
                />
                <ReactLoading type='bars' color='rgb(235,179,189)' height={50} width={50} />
            </MainLayout>
        );
    }

    if (movies && movies.total_results === 0) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <MovieSearchForm
                    value={searchField}
                    onSubmit={handleOnSubmit}
                    onChange={handleChange}
                    onClear={handleClear}
                />
                <p>No movies found for title={lastSearchedField}</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            <MovieSearchForm
                value={searchField}
                onSubmit={handleOnSubmit}
                onChange={handleChange}
                onClear={handleClear}
            />
            {movies.results && <MovieCards movies={movies.results} />}
            {movies.results && movies.results.length < movies.total_results && (
                <div>
                    <button type="button" onClick={handleLoadMore}>Load more results</button>
                </div>
            )}
        </MainLayout>
    );
}

export default MovieSearch;
