import { Link } from "react-router-dom";
import "../styles/Header.css"

function StyledHeaderLink({ children, to }) {
    return (
        <Link to={to}>
        { children }
        </Link>
    );
};

function Header() {
    return (
        <header className="header">
            <div>
                <h1>
                    Movie Rater
                </h1>
            </div>
            <div>
                <nav>
                    <StyledHeaderLink to="/">
                    Home
                    </StyledHeaderLink>
                    <StyledHeaderLink to="/movie-week">
                    Movies by weeks
                    </StyledHeaderLink>
                    <StyledHeaderLink to="movie-search">
                    Search movies
                    </StyledHeaderLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
