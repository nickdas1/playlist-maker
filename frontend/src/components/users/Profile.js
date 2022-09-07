import { useState, useEffect, useContext } from "react";
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
import NotificationContext from "../../contexts/NotificationContext";

export default function Profile() {
    const user = useUser();
    const [token, setToken] = useToken();
    const { id, username, info, isVerified } = user;

    const { setNotificationStatus } = useContext(NotificationContext);

    const [playlistData, setPlaylistData] = useState([]);

    const [favoriteGenre, setFavoriteGenre] = useState(
        info.favoriteGenre || ""
    );
    const [favoriteArtist, setFavoriteArtist] = useState(
        info.favoriteArtist || ""
    );
    const [favoriteSong, setFavoriteSong] = useState(info.favoriteSong || "");

    useEffect(() => {
        const getData = async () => {
            const response = await axios.post(`/api/users/playlists`, {
                userId: id,
            });
            setPlaylistData(response.data);
        };
        getData();
    }, [id]);

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

            setNotificationStatus({
                isActive: true,
                message: "Successfully saved user data!",
                severity: "success",
            });
        } catch (error) {
            setNotificationStatus({
                isActive: true,
                message:
                    "Something went wrong and we couldn't save the changes",
                severity: "error",
            });
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
