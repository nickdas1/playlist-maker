import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { InfoBox, InfoContainer, PrimaryButton } from "../StyledComponents";

export default function PasswordResetSuccess() {
    const navigate = useNavigate();

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Success!</Typography>
                <p>
                    Your password has been reset, please login with your new
                    password.
                </p>
                <PrimaryButton
                    onClick={() => navigate("/login")}
                    variant="contained"
                    color="success"
                >
                    Log in
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
