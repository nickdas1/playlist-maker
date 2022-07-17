import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { InfoBox, InfoContainer, InfoInput, PrimaryButton } from "../StyledComponents";
import { useToken } from "../../auth/useToken";

export default function Login() {
    const [, setToken] = useToken();
    const [errorMsg,] = useState("");
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
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Log In</Typography>
                <Typography sx={{margin: "15px 0"}}>
                    Welcome to Spotifyre, an app where you can create playlists
                    of your favorite songs. Please log in or create an account
                    to continue.
                </Typography>
                {errorMsg && <div className="fail">{errorMsg}</div>}
                <InfoInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username"
                    disableUnderline
                />
                <InfoInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    disableUnderline
                />
                <PrimaryButton onClick={onLoginClicked} disabled={!email || !password}>
                    Log In
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/forgot-password")}>
                    Forgot your password?
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/signup")}>Sign Up</PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
