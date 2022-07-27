import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Table, TableBody, TableContainer, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    Cell,
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
    PRIMARY_BLUE,
    ProfileContainer,
} from "../StyledComponents";
import { useToken } from "../../auth/useToken";
import { useUser } from "../../auth/useUser";

export default function Profile() {
    const user = useUser();
    const [token, setToken] = useToken();

    const [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.post(`/api/users/playlists`, {
                user: user.email,
            });
            setPlaylistData(response.data);
        };
        getData();
    }, [user]);

    const { id, username, info, isVerified } = user;

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
            }, 3000);
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
        <ProfileContainer>
            <InfoContainer>
                <InfoBox>
                    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
                        Info for {username}
                    </Typography>
                    {!isVerified && (
                        <Box className="fail">
                            You won't be able to make any changes until you
                            verify your email
                        </Box>
                    )}
                    {showSuccessMessage && (
                        <Box className="success">
                            Successfully saved user data!
                        </Box>
                    )}
                    {showErrorMessage && (
                        <Box className="fail">
                            Uh oh... something went wrong and we couldn't save
                            changes
                        </Box>
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
                    <PrimaryButton onClick={saveChanges} variant="contained">
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
            <InfoContainer>
                <InfoBox>
                    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
                        Playlists by {username}
                    </Typography>
                    <TableContainer sx={{ height: "100%" }}>
                        <Table>
                            <TableBody>
                                {playlistData.map((playlist, index) => (
                                    <TableRow key={playlist._id}>
                                        <Cell sx={{}}>
                                            {index + 1}.{" "}
                                            <Link
                                                to={`/playlist/${playlist._id}`}
                                                style={{ color: PRIMARY_BLUE }}
                                            >
                                                {playlist.name}
                                            </Link>
                                        </Cell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </InfoBox>
            </InfoContainer>
        </ProfileContainer>
    );
}
