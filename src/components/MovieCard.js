import "../styles/MovieCard.css"

function MovieCard({ movie }) {
    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE;

    return (
        <div key={movie.id} className="movie-card">
            <img
                src={`${TMDB_POSTER_PATH}${TMDB_POSTER_SIZE}${movie.poster_path}`}
                alt={`poster ${movie.title}`}
            /><br />
            <span className="movie-title">{movie.title}</span><br />
            <span className="release-date">{movie.release_date}</span>
        </div>
    );
}

export default MovieCard;
