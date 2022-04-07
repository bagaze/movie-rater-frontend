import MoviePoster from "./MoviePoster";

function MovieDetailContent({movie, directors, releaseDateFR}) {
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_LARGE;

    return (
        <div style={{marginBottom: 20}}>
            <MoviePoster
                poster_path={movie.poster_path}
                size={TMDB_POSTER_SIZE}
                movie_title={movie.title}
            /><br />
            <span><span style={{"font-weight": "bold"}}> ID:</span> {movie.id}</span><br />
            <span><span style={{"font-weight": "bold"}}>Title:</span> {movie.title}</span><br />
            <span><span style={{"font-weight": "bold"}}>Director(s):</span> {directors.join(', ') || "TBD"}</span><br />
            <span><span style={{"font-weight": "bold"}}>Release date:</span> {releaseDateFR || "TDB"}</span>
        </div>
    );
}

export default MovieDetailContent;
