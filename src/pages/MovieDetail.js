import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getTMDBData } from "../utils/tmdb_api";

function MovieDetail() {
    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_LARGE;

    const { tmdbid } = useParams();

    useEffect( () => {
        const customQueryParams = {
            append_to_response: "credits"
        };

        getTMDBData(
            `/movie/${tmdbid}`,
            customQueryParams,
            setMovie,
            setError,
            setErrorInfo
        );
    }, [tmdbid]);

    let directors = []

    if (movie) {
        directors = movie.credits.crew.reduce( (acc, crew_member) => (
            crew_member.job === "Director" ? [...acc, crew_member.name] : acc
        ), []);
        console.log("directors");
        console.log(directors);
    }

    if (error) {
        return <ErrorInfo errorInfo={errorInfo} />
    }
    
    return (
    <main>
        <h1>Movie detail</h1>
        <div>
            <p>Movie detail of {tmdbid}</p>
            {!movie && !error && <p>Loading</p>}
            { movie && (
                <div>
                    <img
                        src={`${TMDB_POSTER_PATH}${TMDB_POSTER_SIZE}${movie.poster_path}`}
                        alt={`poster ${movie.title}`}
                    /><br />
                    <span>Title: {movie.title}</span><br />
                    <span>Director(s): {directors.join(', ')}</span><br />
                    <span>Release date: {movie.release_date}</span>
                </div>
            ) }
        </div>
    </main>);
};

export default MovieDetail;
