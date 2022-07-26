import { useNavigate } from "react-router-dom";
import { InfoBox, InfoContainer, PrimaryButton } from "../StyledComponents";

export default function EmailVerificationFail() {
    const navigate = useNavigate();

    return (
        <InfoContainer>
            <InfoBox>
                <h1>Uh Oh...</h1>
                <p>Something went wrong while trying to verify your email</p>
                <PrimaryButton
                    onClick={() => navigate("/signup")}
                    variant="outlined"
                >
                    Back to Sign Up
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
