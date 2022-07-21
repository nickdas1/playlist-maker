import { useNavigate } from "react-router-dom";
import { InfoBox, InfoContainer, PrimaryButton } from "../StyledComponents";

export default function EmailVerificationSuccess() {
    const navigate = useNavigate();

    return (
        <InfoContainer>
            <InfoBox>
                <h1>Success</h1>
                <p>Thanks for verifying your email!</p>
                <PrimaryButton onClick={() => navigate("/")}>Go to home page</PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
