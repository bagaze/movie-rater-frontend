import poster_not_found from "../assets/poster_not_found.png";

function MoviePoster( { poster_path, size, movie_title } ) {
    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const src = poster_path ? `${TMDB_POSTER_PATH}${size}${poster_path}` : poster_not_found;

    const style = {
        width: parseInt(size.substring(1)),
        height: "auto"
    };

    const handleError = (e) => {
        if (e.target.src !== poster_not_found) {
            e.target.onerror = null;
            e.target.src = poster_not_found
        }
    }

    return (
        <>
            <img
                style={style}
                src={src}
                onError={handleError}
                alt={movie_title}
            />
        </>
    )
}

export default MoviePoster;
