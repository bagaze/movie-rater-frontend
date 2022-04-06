import { useState } from "react";

import poster_not_found from "../assets/poster_not_found.png";

function MoviePoster( { poster_path, size, movie_title } ) {
    const [ loaded, setLoaded ] = useState(false);

    const TMDB_POSTER_PATH = process.env.REACT_APP_TMDB_POSTER_PATH;
    const src = `${TMDB_POSTER_PATH}${size}${poster_path}`;

    const displayNoneStyle = {
        display: "none"
    };
    const posterNotFoundStyle = {
        width: parseInt(size.substring(1)),
        height: "auto"
    };

    return (
        <>
            <img
                style={loaded ? {} : displayNoneStyle}
                src={src}
                onLoad={ () => setLoaded(true)}
                alt={movie_title}
            />
            <img
                style={loaded ? displayNoneStyle : posterNotFoundStyle}
                src={poster_not_found}
                alt={movie_title}
            />
        </>
    )
}

export default MoviePoster;
