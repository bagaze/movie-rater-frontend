import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";
import { loginMRBack } from "../utils/helper_api";
import LogInForm from "../components/LogInForm";
import MainLayout from "../components/MainLayout";
import FormError from "../components/FormError";
import FormSuccess from "../components/FormSuccess";

function LogIn() {
    const pageTitle = "Log in";
    const [ userConnected, setUserConnected ] = useState(null);
    const [ error, setError ] = useState('');
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ , setUserCtx ] = useContext(UserContext);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setUserConnected('');
        setError(false);
        
        const { user, token } = await loginMRBack({
            username: e.target.username.value,
            password: e.target.password.value
        }, setError, setErrorInfo);
        if (user) {
            setUserConnected(user);
            setUserCtx({
                loggedIn: true,
                userInfos: {
                    username: user.username,
                    access_token: token.access_token
                }
            })
        }
    };

    if (userConnected) {
        return <Navigate replace to="/" />
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            { userConnected && (<FormSuccess successInfo={`User (${userConnected.username}) successfully connected`} />) }
            { error && (<FormError action={'connecting'} errorInfo={errorInfo} />) }
            <LogInForm onSubmit={handleOnSubmit} />
        </MainLayout>
    );
}

export default LogIn;
