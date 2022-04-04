import { Link } from "react-router-dom";
import "../styles/MovieCard.css"

function MovieCard({ movie }) {
    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_SMALL;

    return (
        <Link to={`/movie/${movie.id}`}>
            <div key={movie.id} className="movie-card">
                <img
                    src={`${TMDB_POSTER_PATH}${TMDB_POSTER_SIZE}${movie.poster_path}`}
                    alt={`poster ${movie.title}`}
                /><br />
                <span >{movie.id}</span><br />
                <span className="movie-title">{movie.title}</span><br />
                <span className="release-date">{movie.release_date}</span>
            </div>
        </Link>
    );
}

export default MovieCard;
