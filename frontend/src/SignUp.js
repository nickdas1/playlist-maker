import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "./StyledComponents";
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
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4" sx={{marginBottom: "10px"}}>Sign Up</Typography>
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
