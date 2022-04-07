import { Link } from "react-router-dom";
import { getPreviousWeek, getNextWeek } from "../utils/date_utils";
import "../styles/PrevNextLinks.css";

function PrevNextLinks({weekDay}) {
    return (
        <div className="prev-next-div">
            <Link className="button-link" to={`/movie-week?week=${getPreviousWeek(weekDay)}`}>Previous week</Link>
            {" "}
            <Link className="button-link" to={`/movie-week?week=${getNextWeek(weekDay)}`}>Next week</Link>
        </div>
    );
}

export default PrevNextLinks;
