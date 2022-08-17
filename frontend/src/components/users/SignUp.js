import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";
import InfoSnackbar from "../InfoSnackbar";

export default function SignUp() {
    const [, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            try {
                const response = await axios.post("/api/signup", {
                    email,
                    password,
                    username,
                });
                const { token } = response.data;
                setToken(token);
                navigate("/verify");
                window.location.reload();
            } catch (e) {
                setShowErrorMessage(true);
                e.request.status === 409 ? setErrorMessage(e.request.response) : setErrorMessage(e.message);
            }
        } else {
            setShowErrorMessage(true);
            setErrorMessage("Please enter a valid email")
        }
    };

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                    Sign Up
                </Typography>
                {showErrorMessage && (
                <InfoSnackbar
                    showMessage={showErrorMessage}
                    setShowMessage={setShowErrorMessage}
                    message={errorMessage}
                />
            )}
                <InfoInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    disableUnderline
                />
                <InfoInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <InfoInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    type="password"
                    disableUnderline
                />
                <hr />
                <PrimaryButton
                    disabled={
                        !email || !username || !password || password !== confirmPassword 
                    }
                    onClick={onSignUpClicked}
                    variant="contained"
                >
                    Sign Up
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/login")}>
                    Already have an account? Log In
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
