import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "./auth/useToken";

export default function SignUp() {
    const [token, setToken] = useToken();
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const response = await axios.post("/api/signup", {
            email,
            password,
        });
        const { token } = response.data;
        setToken(token);
        navigate("/");
    };

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
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
            <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                type="password"
            />
            <hr />
            <button
                disabled={!email || !password || password !== confirmPassword}
                onClick={onSignUpClicked}
            >
                Sign Up
            </button>
            <button onClick={() => navigate("/login")}>
                Already have an account? Log In
            </button>
        </div>
    );
}
