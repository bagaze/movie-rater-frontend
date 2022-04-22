import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getMRBackData } from "../utils/helper_api";
import MainLayout from "../components/MainLayout";
import Rating from "../components/Rating";
import MovieDetailContent from "../components/MovieDetailContent";
import "../styles/MovieDetail.css";

function MovieDetail() {
    const pageTitle = "Movie detail";

    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");
    const [ userRating, setUserRating ] = useState(0);
    let ratingTMDB = 0;

    const { tmdbid } = useParams();

    useEffect( () => {
        const customQueryParams = {};

        getMRBackData(
            `/movies/${tmdbid}`,
            customQueryParams,
            setMovie,
            setError,
            setErrorInfo
        );
    }, [tmdbid]);

    if (movie) {
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
                <div className="movie-detail">
                    {/* Movie information */}
                    <MovieDetailContent
                        movie={movie}
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
                </div>
            ) }
        </MainLayout>
    );
};

export default MovieDetail;
