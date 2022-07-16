import { useState } from "react";
import { createBrowserHistory } from "history";

export default function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = createBrowserHistory();

    const onLoginClicked = async () => {};

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMsg && <div className="fail">{errorMsg}</div>}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
            />
            <button onClick={onLoginClicked} disabled={!email || !password}>
                Log In
            </button>
            <button onClick={() => history.push("/forgot-password")}>
                Forgot your password?
            </button>
            <button onClick={() => history.push("/signup")}>Sign Up</button>
        </div>
    );
};
