import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import SignUpForm from "../components/SignUpForm";
import { UserContext } from "../components/UserContext";
import { signUpMRBack } from "../utils/helper_api";
import FormError from "../components/FormError";
import FormSuccess from "../components/FormSuccess";

function SignUp() {
    const pageTitle = "Sign up";
    const [ user, setUser ] = useContext(UserContext);
    const [ createdUser, setUserCreated ] = useState('');
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setUserCreated('')
        setError(false);
        
        const createdUser_ = await signUpMRBack({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }, setError, setErrorInfo);
        console.log(createdUser_);
        if (createdUser_) {
            setUserCreated(createdUser_.username)
        }
    };

    if (createdUser) {
        return <Navigate replace to="/login" />
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            { createdUser && (<FormSuccess successInfo={`User (${createdUser}) successfully created`} />) }
            { error && (<FormError action={'creating new user'} errorInfo={errorInfo} />) }
            <SignUpForm onSubmit={handleOnSubmit} />
        </MainLayout>
    );
}

export default SignUp;
