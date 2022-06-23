import { useState, useEffect } from "react";

import "../styles/LogInForm.css"


function LogInForm({ onSubmit }) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ disabled, setDisabled ] = useState(true);

    useEffect( () => {
        let usernameOk = false;
        let passwordOk = false;

        const reUsername = /^[a-zA-Z0-9_-]{3,50}$/
        if (username.match(reUsername)) {
            usernameOk = true;
        }

        if (password.length >= 5) {
            passwordOk = true;
        }

        if (usernameOk && passwordOk) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [username, password])

    return (
        <form id="login_form" className="login_form__form" onSubmit={onSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                className="login_form__field"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                className="login_form__field"
                placeholder="Password"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" disabled={disabled} className="login_form__submit" value="Submit" />
        </form>
    );
}

export default LogInForm;
