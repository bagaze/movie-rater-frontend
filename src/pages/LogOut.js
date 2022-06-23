import { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";

function LogOut() {
    const [, setUserCtx] = useContext(UserContext)

    useEffect( () => {
        setUserCtx({
            loggedIn: false,
            userInfos: {
                username: '',
                access_token: ''}
        });
    });

    return <Navigate replace to="/" />
}

export default LogOut;
