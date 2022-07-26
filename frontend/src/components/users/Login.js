import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";
import { useQueryParams } from "../../hooks/useQueryParams";
import { Button } from "@mui/material";

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
                console.log(e);
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
                <PrimaryButton
                    onClick={onLoginClicked}
                    disabled={!email || !password}
                    variant="contained"
                    color="success"
                >
                    Log In
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => navigate("/forgot-password")}
                    color="primary"
                >
                    Forgot your password?
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => navigate("/signup")}
                    variant="outlined"
                    color="success"
                >
                    Sign Up
                </PrimaryButton>
                <Button
                    disabled={!googleOauthUrl}
                    onClick={() => (window.location.href = googleOauthUrl)}
                    variant="contained"
                    sx={{
                        marginTop: "15px",
                        borderRadius: "30px",
                        width: "80%",
                    }}
                >
                    <GoogleIcon sx={{ marginRight: "5px" }} /> Log in with
                    Google
                </Button>
            </InfoBox>
        </InfoContainer>
    );
}
