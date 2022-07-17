import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "./auth/useToken";

export default function Login() {
    const [token, setToken] = useToken();
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onLoginClicked = async () => {
        const response = await axios.post("/api/login", {
            email,
            password,
        });
        const { token } = response.data;
        setToken(token);
        navigate("/");
    };

    return (
        <div className="content-container">
            <h1>Log In</h1>
            <h3>Welcome to Spotifyre, an app where you can create playlists of your favorite songs.
                Please log in or create an account to continue.
            </h3>
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
            <button onClick={() => navigate("/forgot-password")}>
                Forgot your password?
            </button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
    );
}
