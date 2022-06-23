import { useState } from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import SignUpForm from "../components/SignUpForm";
import { signUpMRBack } from "../utils/helper_api";
import FormError from "../components/FormError";
import FormSuccess from "../components/FormSuccess";

function SignUp() {
    const pageTitle = "Sign up";
    const [ userCreated, setUserCreated ] = useState('');
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

    if (userCreated) {
        return <Navigate replace to="/login" />
    }

    return (
        <MainLayout pageTitle={pageTitle}>
            { userCreated && (<FormSuccess successInfo={`User (${userCreated}) successfully created`} />) }
            { error && (<FormError action={'creating new user'} errorInfo={errorInfo} />) }
            <SignUpForm onSubmit={handleOnSubmit} />
        </MainLayout>
    );
}

export default SignUp;
