import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";
import { useQueryParams } from "../../hooks/useQueryParams";

export default function Login() {
    const [, setToken] = useToken();

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [googleOauthUrl, setGoogleOauthUrl] = useState("");
    const { token: oauthToken } = useQueryParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            navigate("/");
            window.location.reload();
        }
    }, [oauthToken, setToken, navigate]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get("/auth/google/url");
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                setErrorMsg(
                    "There was a problem logging in with that account."
                );
            }
        };

        loadOauthUrl();
    }, []);

    const onLoginClicked = async () => {
        try {
            const response = await axios.post("/api/login", {
                email,
                password,
            });
            const { token } = response.data;
            setToken(token);
            navigate("/");
            window.location.reload();
        } catch (e) {
            setErrorMsg("Username or Password is Incorrect");
        }
    };

    return (
        <InfoContainer>
            <InfoBox sx={{ height: "55vh" }}>
                <Typography variant="h4">Log In</Typography>
                <Typography sx={{ margin: "15px 0" }}>
                    Welcome to Playlister, an app where you can create playlists
                    of your favorite songs. Please log in or create an account
                    to continue.
                </Typography>
                {errorMsg && <Box className="fail">{errorMsg}</Box>}
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
                <PrimaryButton
                    onClick={onLoginClicked}
                    disabled={!email || !password}
                    variant="contained"
                >
                    Log In
                </PrimaryButton>
                <Button
                    disabled={!googleOauthUrl}
                    onClick={() => (window.location.href = googleOauthUrl)}
                    variant="contained"
                    sx={{
                        marginTop: "15px",
                        borderRadius: "30px",
                        width: "80%",
                        padding: 0,
                        justifyContent: "start",
                        backgroundColor: "#4285F4",
                    }}
                >
                    <svg style={{ borderRadius: "25px" }} width='38' height='38' viewBox='0 0 101.33 101.33' xmlns='http://www.w3.org/2000/svg'><path fill='#fff' d='M0 0h101.33v101.33H0z'/><path d='M50.667 36.167c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85c-4.16-3.87-9.59-6.25-16.06-6.25-9.38 0-17.49 5.38-21.44 13.22l7.98 6.19c1.89-5.69 7.2-9.91 13.46-9.91z' fill='#ea4335'/><path d='M73.647 51.217c0-1.57-.15-3.09-.38-4.55h-22.6v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z' fill='#4285f4'/><path d='M37.197 55.257c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19c-1.63 3.24-2.55 6.9-2.55 10.78s.92 7.54 2.56 10.78z' fill='#fbbc05'/><path d='M50.667 74.667c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19c3.96 7.85 12.07 13.23 21.45 13.23z' fill='#34a853'/><path d='M26.667 26.667h48v48h-48z' fill='none'/></svg>
                    <Box style={{ flexGrow: 1 }}>Log in with Google</Box>
                </Button>
                <PrimaryButton
                    onClick={() => navigate("/signup")}
                    variant="outlined"
                >
                    Sign Up
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/forgot-password")}>
                    Forgot your password?
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
