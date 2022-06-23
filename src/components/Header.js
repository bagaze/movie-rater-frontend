import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css"
import { useState } from "react";
import movie_rater_logo from "../assets/logo.png"

function StyledHeaderLink({ children, to, onMouseOverText='' }) {
    const [ textContent, setTextContent ] = useState(children);

    const onMouseEnter = (e) => {
        if (onMouseOverText) {
            setTextContent(onMouseOverText);
        }
    };
    const onMouseOut = (e) => {
        if (onMouseOverText) {
            setTextContent(children)
        }
    }

    const navLink = (
        <NavLink to={to} onMouseEnter={onMouseEnter} onMouseOut={onMouseOut}>
        { textContent }
        </NavLink>
    );
    return navLink;
};

function Header() {
    const [ userCtx, ] = useContext(UserContext);

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
                { !userCtx.loggedIn && (<>
                    <StyledHeaderLink to="signup">
                    Sign up
                    </StyledHeaderLink>
                    <StyledHeaderLink to="login">
                    Log in
                    </StyledHeaderLink>
                    </>)
                }
                { userCtx.loggedIn && (<>
                    <StyledHeaderLink to="logout" onMouseOverText="Log out">
                    Logged as: {userCtx.userInfos.username}
                    </StyledHeaderLink></>)
                }
            </nav>
        </header>
    );
};

export default Header;
