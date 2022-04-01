import axios from "axios";
import { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

import "../styles/MovieWeek.css";

function MovieWeek() {
    const [ movies, setMovies ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    useEffect( () => {
        const TMDB_API_URL = process.env.REACT_APP_TMDB_API_URL;
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

        const headers = {
            Authorization: `Bearer ${TMDB_API_KEY}`
        };
        const params = {
            "release_date.gte": "2022-03-29",
            "release_date.lte": "2022-04-05",
            "region": "FR",
            "language": "fr-FR",
            "with_release_type": "3"
        }
        
        async function getDiscoverMovie() {
            try {
                const { status, statusText, data } = await axios.get(
                    `${TMDB_API_URL}/discover/movie`,
                    {
                        params,
                        headers
                    }
                );
                if (status !== 200) {
                    setError(true);
                    setErrorInfo(`${status}: ${statusText}`);
                } else {
                    console.log('data_results');
                    console.log(data.results);
                    setMovies(data.results);
                }
            } catch(e) {
                console.log(e);
                setError(true);
                setErrorInfo(e);
            }
        };

        getDiscoverMovie();
    }, []);

    return (
        <main>
            <h1>Movies by weeks</h1>
            {!movies && <p>Loading</p>}
            {error && <p>{errorInfo}</p>}
            <div className="content">
                {movies && movies.map( (movie) => (
                    <MovieCard movie={movie} />
                ) 
                )}
            </div>
        </main>
    )
};

export default MovieWeek;
