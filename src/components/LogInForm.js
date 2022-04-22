import { useState, useEffect } from "react";
import validator from "validator";

import "../styles/LogInForm.css"


function LogInForm({ onSubmit }) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ disabled, setDisabled ] = useState(true);

    useEffect( () => {
        let emailOk = false;
        let passwordOk = false;

        if (validator.isEmail(email)) {
            emailOk = true;
        }

        if (password.length > 5) {
            passwordOk = true;
        }

        if (emailOk && passwordOk) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [email, password])

    return (
        <form id="login_form" className="login_form__form" onSubmit={onSubmit}>
            <label for="email">Email</label>
            <input
                id="email"
                className="login_form__field"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label for="password">Password</label>
            <input
                id="password"
                className="login_form__field"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" disabled={disabled} className="login_form__submit" value="Submit" />
        </form>
    );
}

export default LogInForm;
