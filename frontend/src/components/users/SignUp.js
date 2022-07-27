import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";

export default function SignUp() {
    const [, setToken] = useToken();
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            try {
                const response = await axios.post("/api/signup", {
                    email,
                    password,
                });
                const { token } = response.data;
                setToken(token);
                navigate("/verify");
            } catch (e) {
                e.request.status === 409 ? setErrorMsg(e.request.response) : setErrorMsg(e.message);
            }
        } else {
            setErrorMsg("Please enter a valid email")
        }
    };

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                    Sign Up
                </Typography>
                {errorMsg && <Box className="fail">{errorMsg}</Box>}
                <InfoInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                        !email || !password || password !== confirmPassword
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
