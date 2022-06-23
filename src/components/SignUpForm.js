import { useEffect, useState } from "react";
import "../styles/SignUpForm.css"

import validator from "validator";


function SignUpForm({ onSubmit }) {
    const [ username, setUsername ]  = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ disabled, setDisabled ] = useState(true);

    useEffect( () => {
        let usernameOk = false;
        let emailOk = false;
        let passwordOk = false;

        const reUsername = /^[a-zA-Z0-9_-]{3,50}$/
        if (username.match(reUsername)) {
            usernameOk = true;
        }

        if (validator.isEmail(email)) {
            emailOk = true;
        }

        if (password.length >= 5) {
            passwordOk = true;
        }

        if (usernameOk && emailOk && passwordOk) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [username, email, password])

    return (
        <form id="signup_form" className="signup_form__form" onSubmit={onSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                className="signup_form__field"
                placeholder="Username (Minimum length: 3 characters)"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
                id="email"
                className="signup_form__field"
                placeholder="Valid email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                className="signup_form__field"
                placeholder="Password (Minimum length: 5 characters)"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={disabled} className="signup_form__submit">Submit</button>
        </form>
    );
}

export default SignUpForm;
