import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Rating({title, rating, isClickable=false, onClick=null}) {
    const [ hoveredStar, setHoveredStar ] = useState(0);
    const [ userSelectedRating, setUserSelectedRating ] = useState(0);
    const maxRating = 5;

    const handleMouseOver = ( (i) => {
        if (isClickable) {
            setHoveredStar(i);
        }
    } );

    const handleClick = ( (i) => {
        if (isClickable) {
            setUserSelectedRating(i);
        }
        if (onClick) {
            onClick(i);
        }
    } );

    let rating_
    if (hoveredStar) {
        rating_ = hoveredStar;
    } else if (userSelectedRating) {
        rating_ = userSelectedRating;
    } else {
        rating_ = rating;
    }
    let ratingStars = [];
    for (let i=1; i<maxRating + 1; i++) {
        if (i <= rating_) {
            ratingStars.push(
                <FontAwesomeIcon 
                    key={i}
                    onClick={ () => handleClick(i) }
                    onMouseOver={ () => handleMouseOver(i) }
                    onMouseLeave={ () => setHoveredStar(0) }
                    icon={faStar} 
                    style={{color: "gold"}}
                />
            );
        } else {
            ratingStars.push(
                <FontAwesomeIcon
                    key={i}
                    onClick={ () => handleClick(i) }
                    onMouseOver={ () => handleMouseOver(i) }
                    onMouseLeave={ () => setHoveredStar(0) }
                    icon={faStar}
                    style={{color: "gray"}}
                />
            );
        }
    }

    return (
        <div style={{margin: "20 0"}}>
            <h2>{title}</h2>
            <div>
                {ratingStars}
            </div>
        </div>
    );
}

export default Rating;
