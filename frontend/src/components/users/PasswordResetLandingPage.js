import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetSuccess from "./PasswordResetSuccess";
import PasswordResetFail from "./PasswordResetFail";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { Typography } from "@mui/material";

export default function PasswordResetLandingPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const { passwordResetCode } = useParams();

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
                newPassword: passwordValue,
            });
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    };

    if (isFailure) return <PasswordResetFail />;
    if (isSuccess) return <PasswordResetSuccess />;

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Reset Password</Typography>
                <p>Please enter a new password</p>
                <InfoInput
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Password"
                    disableUnderline
                />
                <InfoInput
                    type="password"
                    value={confirmPasswordValue}
                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
                    placeholder="Confirm Password"
                    disableUnderline
                />
                <PrimaryButton
                    disabled={
                        !passwordValue ||
                        !confirmPasswordValue ||
                        passwordValue !== confirmPasswordValue
                    }
                    onClick={onResetClicked}
                    variant="outlined"
                    color="success"
                >
                    Reset Password
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
