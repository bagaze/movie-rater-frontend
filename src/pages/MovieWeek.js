import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DateTime } from "luxon";

import MovieCards from "../components/MovieCards";
import ErrorInfo from "../components/ErrorInfo";
import MainLayout from "../components/MainLayout";

import { getMRBackData } from "../utils/helper_api";
import { getPreviousWednesday, getNextTuesday } from "../utils/date_utils";
import PrevNextLinks from "../components/PrevNextLinks";

function MovieWeek() {
    const pageTitle = "Movies by weeks";

    const [ movies, setMovies ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");
    const [ weekDay, setWeekDay ] = useState("");

    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect( () => {
        const paramWeekDay = DateTime.fromISO(searchParams.get('week'));

        if (paramWeekDay.isValid) {
            const previousWednesday = getPreviousWednesday(paramWeekDay.toISODate());
            setSearchParams({
                week: previousWednesday
            });
            setWeekDay(previousWednesday);
        } else {
            setSearchParams({});
            setWeekDay(getPreviousWednesday(DateTime.now().toISODate()));
        }
    }, [searchParams, setSearchParams]);

    useEffect( () => {
        if (weekDay) {
            const gteDate = weekDay;
            const lteDate = getNextTuesday(weekDay);

            const customQueryParams = {
                "release_date_gte": gteDate,
                "release_date_lte": lteDate
            };

            getMRBackData("/weekly_movies", customQueryParams, setMovies, setError, setErrorInfo);
        }
    }, [weekDay]);

    const handleLoadMore = () => {
        if (weekDay) {
            const gteDate = weekDay;
            const lteDate = getNextTuesday(weekDay);
            const customQueryParams = {
                "release_date_gte": gteDate,
                "release_date_lte": lteDate
            };
            getMRBackData("/weekly_movies", customQueryParams, setMovies, setError, setErrorInfo, movies.page);
        }
    }

    if (error) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <ErrorInfo errorInfo={errorInfo} />
            </MainLayout>
        );
    }

    if (!movies) {
        return (
            <MainLayout pageTitle={pageTitle}>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            {weekDay && (
                <PrevNextLinks weekDay={weekDay} />
            )}
            {weekDay && <h2>{`Week of ${weekDay}`}</h2>}
            {movies.results && (
                <MovieCards movies={movies.results} />
            )}
            {movies.results && movies.results.length < movies.total_results && (
                <div>
                    <button onClick={handleLoadMore}>Load more results</button>
                </div>
            )}
        </MainLayout>
    );
};

export default MovieWeek;
