import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css"
import movie_rater_logo from "../assets/logo.png"

function StyledHeaderLink({ children, to }) {
    return (
        <NavLink to={to}>
        { children }
        </NavLink>
    );
};

function Header() {
    return (
        <header className="header">
            <Link to="/">
            <img className="logo" src={movie_rater_logo} alt="logo" />
            </Link>
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
                <StyledHeaderLink to="signup">
                Sign up
                </StyledHeaderLink>
                <StyledHeaderLink to="login">
                Log in
                </StyledHeaderLink>
            </nav>
        </header>
    );
};

export default Header;
