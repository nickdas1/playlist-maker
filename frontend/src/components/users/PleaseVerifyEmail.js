import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { InfoBox, InfoContainer } from "../StyledComponents";

export default function PleaseVerifyEmail() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/profile");
        }, 3000);
    }, [navigate]);

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h4">Thanks for Signing Up!</Typography>
                <p>
                    A verification email has been sent to the email address you
                    provided.
                </p>
            </InfoBox>
        </InfoContainer>
    );
}
