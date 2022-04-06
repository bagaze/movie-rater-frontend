import MoviePoster from "./MoviePoster";

function MovieDetailContent({movie, directors, releaseDateFR}) {
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_LARGE;

    return (
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
    );
}

export default MovieDetailContent;
