import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { DateTime } from "luxon";

import MovieCards from "../components/MovieCards";
import ErrorInfo from "../components/ErrorInfo";

import { getTMDBData } from "../utils/tmdb_api";
import { getPreviousWednesday, getNextTuesday, getPreviousWeek, getNextWeek } from "../utils/date_utils";

function MovieWeek() {
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

            console.log(`gteDate: ${gteDate} - lteDate:${lteDate}`);

            const customQueryParams = {
                "release_date.gte": gteDate,
                "release_date.lte": lteDate,
                "with_release_type": "3"
            };

            getTMDBData("/discover/movie", customQueryParams, setMovies, setError, setErrorInfo);
        }
    }, [weekDay]);

    const handleLoadMore = () => {
        if (weekDay) {
            const gteDate = weekDay;
            const lteDate = getNextTuesday(weekDay);
            const customQueryParams = {
                "release_date.gte": gteDate,
                "release_date.lte": lteDate,
                "with_release_type": "3"
            };
            getTMDBData("/discover/movie", customQueryParams, setMovies, setError, setErrorInfo, movies.page);
        }
    }

    if (error) {
        return <ErrorInfo errorInfo={errorInfo} />;
    }

    return (
        <main>
            <h1>Movies by weeks</h1>
            {weekDay && (
                <div>
                    <Link to={`/movie-week?week=${getPreviousWeek(weekDay)}`}>Previous week</Link>
                    {" "}
                    <Link to={`/movie-week?week=${getNextWeek(weekDay)}`}>Next week</Link>
                </div>
            )}
            {weekDay && <h2>{`Week of ${weekDay}`}</h2>}
            {!movies && <p>Loading</p>}
            {movies.results && (
                <MovieCards movies={movies.results} />
            )}
            {movies.results && movies.results.length < movies.total_results && (
                <div>
                    <button onClick={handleLoadMore}>Load more results</button>
                </div>
            )}
        </main>
    );
};

export default MovieWeek;
