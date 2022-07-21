import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { InfoBox, InfoContainer, PrimaryButton } from "../StyledComponents";

export default function PasswordResetFail() {
    const navigate = useNavigate();

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Uh oh...</Typography>
                <p>Something went wrong while trying to reset your password.</p>
                <PrimaryButton onClick={() => navigate("/login")}>
                    Back to Log in
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
