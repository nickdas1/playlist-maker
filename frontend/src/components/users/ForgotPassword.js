import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { Typography } from "@mui/material";

export default function ForgotPassword() {
    const [emailValue, setEmailValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    return success ? (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Success</Typography>
                <p>A password reset link has been sent to {emailValue}</p>
            </InfoBox>
        </InfoContainer>
    ) : (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Forgot Password</Typography>
                <p>Enter your email and we'll send you a reset link</p>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                <InfoInput
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Email"
                    disableUnderline
                />
                <PrimaryButton
                    disabled={!emailValue}
                    onClick={onSubmitClicked}
                    variant="contained"
                    color="primary"
                >
                    Send Reset Link
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
