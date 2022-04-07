import { Link } from "react-router-dom";
import "../styles/MovieCard.css"
import MoviePoster from "./MoviePoster";

function MovieCard({ movie }) {
    const TMDB_POSTER_SIZE = process.env.REACT_APP_TMDB_POSTER_SIZE_SMALL;

    return (
        <Link className="div-link" to={`/movie/${movie.id}`}>
            <div key={movie.id} className="movie-card">
                <MoviePoster
                    poster_path={movie.poster_path}
                    size={TMDB_POSTER_SIZE}
                    movie_title={movie.title}
                /><br />
                <span >{movie.id}</span><br />
                <span className="movie-title">{movie.title}</span><br />
                <span className="release-date">{movie.release_date}</span>
            </div>
        </Link>
    );
}

export default MovieCard;
