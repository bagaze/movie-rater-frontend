import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating({title, rating, isClickable=false}) {
    const maxRating = 5;

    let ratingStars = [];
    for (let i=0; i<maxRating; i++) {
        if (i < rating) {
            ratingStars.push(<FontAwesomeIcon icon={faStar} style={{color: "gold"}}/>);
        } else {
            ratingStars.push(<FontAwesomeIcon icon={faStar} style={{color: "gray"}}/>);
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <div>
                {ratingStars}
            </div>
        </div>
    );
}

export default Rating;
