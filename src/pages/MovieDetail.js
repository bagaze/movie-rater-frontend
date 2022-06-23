import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useParams } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";
import { getMRBackData, delMRBackData, postRatingMRBackData } from "../utils/helper_api";
import MainLayout from "../components/MainLayout";
import Rating from "../components/Rating";
import MovieDetailContent from "../components/MovieDetailContent";
import "../styles/MovieDetail.css";

function MovieDetail() {
    const pageTitle = "Movie detail";

    const [ movie, setMovie ] = useState(undefined);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");
    const [ userRating, setUserRating ] = useState(undefined);
    let ratingTMDB = 0;

    const [ userCtx, ] = useContext(UserContext);

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

    useEffect( () => {
        if (userCtx.loggedIn) {
            const customQueryParams = {};

            getMRBackData(
                `/ratings/${tmdbid}/me`,
                customQueryParams,
                setUserRating,
                null,
                null,
                0,
                userCtx.userInfos.accessToken
            );
        }
    }, [userCtx, tmdbid]);

    // Save user rating
    const handleOnClick = async (i) => {
        if (userRating) {
            await delMRBackData("/ratings", userRating.id, userCtx.userInfos.accessToken);
        }
        const data = await postRatingMRBackData(tmdbid, i * 2, userCtx.userInfos.accessToken);
        setUserRating(data);
    };

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
                    {/* User Rating */}
                    { userCtx.loggedIn && userRating &&
                    <Rating
                        title="User rating"
                        rating={userRating.grade / 2}
                        isClickable={true}
                        onClick={handleOnClick}
                    />}
                    { userCtx.loggedIn && !userRating &&
                    <Rating
                        title="User rating"
                        rating={0}
                        isClickable={true}
                        onClick={handleOnClick}
                    />}
                </div>
            ) }
        </MainLayout>
    );
};

export default MovieDetail;
