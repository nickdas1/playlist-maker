import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../../auth/useToken";
import EmailVerificationFail from "./EmailVerificationFail";
import EmailVerificationSuccess from "./EmailVerificationSuccess";

export default function EmailVerificationLandingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put("/api/verify-email", {
                    verificationString,
                });
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (e) {
                setIsSuccess(false);
                setIsLoading(false);
            }
        };

        loadVerification();
    }, [setToken, verificationString]);

    if (isLoading) return <p>Loading...</p>;
    if (!isSuccess) return <EmailVerificationFail />;
    return <EmailVerificationSuccess />;
}
