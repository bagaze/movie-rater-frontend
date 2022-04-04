import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

import "../styles/MovieCards.css";

function MovieCards( { movies } ) {
    return ( 
        <div className="content">
            {movies && movies.map( (movie) => (
                <MovieCard key={movie.id} movie={movie} />
            )
            )}
        </div>
    );
}

MovieCards.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MovieCards;
