import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getTMDBData } from "../utils/tmdb_api";
import MainLayout from "../components/MainLayout";
import Rating from "../components/Rating";
import MovieDetailContent from "../components/MovieDetailContent";

function MovieDetail() {
    const pageTitle = "Movie detail";

    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");
    const [ userRating, setUserRating ] = useState(0);
    let ratingTMDB = 0;

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

        // Calculate TMDB rating on a scale of 5
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
                    {/* Movie information */}
                    <MovieDetailContent
                        movie={movie}
                        directors={directors}
                        releaseDateFR={releaseDateFR}
                    />
                    {/* TMDB Rating */}
                    <Rating
                        title="TMDB rating"
                        rating={ratingTMDB}
                    />
                    {/* TODO: User Rating */}
                    <Rating
                        title="User rating"
                        rating={userRating}
                        isClickable={true}
                    />
                </>
            ) }
        </MainLayout>
    );
};

export default MovieDetail;
