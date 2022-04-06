import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getTMDBData } from "../utils/tmdb_api";
import MoviePoster from "../components/MoviePoster";
import MainLayout from "../components/MainLayout";
import Rating from "../components/Rating";

function MovieDetail() {
    const pageTitle = "Movie detail";

    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");
    let ratingTMDB = 0;

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

        // Extract french release date in theater
        movie.release_dates.results.forEach(releaseDateResult => {
            if (releaseDateResult.iso_3166_1 === "FR") {
                releaseDateResult.release_dates.forEach( (releaseDate) => {
                    if (releaseDate.type === 3) {
                        releaseDateFR = new Date(releaseDate.release_date).toDateString();
                    }
                } );
            }
        });
        ratingTMDB = Math.round(movie.vote_average / 2); 
    }

    if (error) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <ErrorInfo errorInfo={errorInfo} />
            </MainLayout>
        );
    }

    if (!movie && !error) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <p>Loading...</p>
            </MainLayout>
        );
    }
    
    return (
        <MainLayout pageTitle={pageTitle}>
            { movie && (
                <>
                    <div>
                        <h2>Informations</h2>
                        <MoviePoster
                            poster_path={movie.poster_path}
                            size={TMDB_POSTER_SIZE}
                            movie_title={movie.title}
                        /><br />
                        <span>ID: {movie.id}</span><br />
                        <span>Title: {movie.title}</span><br />
                        <span>Director(s): {directors.join(', ') || "TBD"}</span><br />
                        <span>Release date: {releaseDateFR || "TDB"}</span>
                    </div>
                    <Rating
                        title="Rating TMDB"
                        rating={ratingTMDB}
                    />
                </>
            ) }
        </MainLayout>
    );
};

export default MovieDetail;
