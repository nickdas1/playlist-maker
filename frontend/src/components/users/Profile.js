import { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";
import { useUser } from "../../auth/useUser";

export default function Profile() {
    const user = useUser();
    const [token, setToken] = useToken();

    console.log(user);

    const { id, email, info, isVerified } = user;

    const [favoriteGenre, setFavoriteGenre] = useState(
        info.favoriteGenre || ""
    );
    const [favoriteArtist, setFavoriteArtist] = useState(
        info.favoriteArtist || ""
    );
    const [favoriteSong, setFavoriteSong] = useState(info.favoriteSong || "");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 5000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        try {
            const response = await axios.put(
                `/api/users/${id}`,
                {
                    favoriteGenre,
                    favoriteArtist,
                    favoriteSong,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    };

    const resetValues = () => {
        setFavoriteGenre(info.favoriteGenre);
        setFavoriteArtist(info.favoriteArtist);
        setFavoriteSong(info.favoriteSong);
    };

    return (
        <InfoContainer>
            <InfoBox>
                <Typography variant="h5" sx={{ marginBottom: "15px" }}>
                    Info for {email}
                </Typography>
                {!isVerified && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        You won't be able to make any changes until you verify
                        your email
                    </div>
                )}
                {showSuccessMessage && (
                    <div className="success">Successfully saved user data!</div>
                )}
                {showErrorMessage && (
                    <div className="fail">
                        Uh oh... something went wrong and we couldn't save
                        changes
                    </div>
                )}
                <label>
                    Favorite Genre:
                    <InfoInput
                        onChange={(e) => setFavoriteGenre(e.target.value)}
                        value={favoriteGenre}
                        disableUnderline
                    />
                </label>
                <label>
                    Favorite Artist:
                    <InfoInput
                        onChange={(e) => setFavoriteArtist(e.target.value)}
                        value={favoriteArtist}
                        disableUnderline
                    />
                </label>
                <label>
                    Favorite Song:
                    <InfoInput
                        onChange={(e) => setFavoriteSong(e.target.value)}
                        value={favoriteSong}
                        disableUnderline
                    />
                </label>
                <hr />
                <PrimaryButton
                    onClick={saveChanges}
                    variant="contained"
                    color="success"
                >
                    Save Changes
                </PrimaryButton>
                <PrimaryButton
                    onClick={resetValues}
                    variant="outlined"
                    color="error"
                >
                    Reset Values
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
