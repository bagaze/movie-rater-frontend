import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getTMDBData } from "../utils/tmdb_api";
import MoviePoster from "../components/MoviePoster";

function MovieDetail() {
    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_LARGE;

    const { tmdbid } = useParams();

    useEffect( () => {
        const customQueryParams = {
            append_to_response: "credits,release_dates"
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
    let releaseDateFR = "";

    if (movie) {
        // Extract list of directors
        directors = movie.credits.crew.reduce( (acc, crew_member) => (
            crew_member.job === "Director" ? [...acc, crew_member.name] : acc
        ), []);
        console.log("directors");
        console.log(directors);

        // Extract french release date in theater
        console.log(movie.release_dates.results)
        movie.release_dates.results.forEach(releaseDateResult => {
            if (releaseDateResult.iso_3166_1 === "FR") {
                releaseDateResult.release_dates.forEach( (releaseDate) => {
                    console.log(releaseDate)
                    if (releaseDate.type === 3) {
                        releaseDateFR = new Date(releaseDate.release_date).toDateString();
                    }
                } );
            }
        });
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
                    <MoviePoster
                        poster_path={movie.poster_path}
                        size={TMDB_POSTER_SIZE}
                        movie_title={movie.title}
                    /><br />
                    <span>Title: {movie.title}</span><br />
                    <span>Director(s): {directors.join(', ') || "TBD"}</span><br />
                    <span>Release date: {releaseDateFR || "TDB"}</span>
                </div>
            ) }
        </div>
    </main>);
};

export default MovieDetail;
