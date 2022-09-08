import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import NotificationContext from "../../contexts/NotificationContext";

export default function ForgotPassword() {
    const [emailValue, setEmailValue] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { setNotificationStatus } = useContext(NotificationContext);

    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (e) {
            setNotificationStatus({
                isActive: true,
                message: e.message,
                severity: "error",
            });
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
        <>
            <InfoContainer>
                <InfoBox>
                    <Typography variant="h4">Forgot Password</Typography>
                    <p>Enter your email and we'll send you a reset link</p>
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
                    >
                        Send Reset Link
                    </PrimaryButton>
                </InfoBox>
            </InfoContainer>
        </>
    );
}
