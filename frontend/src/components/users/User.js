import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableContainer, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    Cell,
    InfoBox,
    InfoContainer,
    PRIMARY_BLUE,
    ProfileContainer,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";

export default function User() {
    const currentUser = useUser();
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [playlistData, setPlaylistData] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.post(`/api/users/playlists`, {
                userId,
            });
            setPlaylistData(response.data);
        };
        getData();
    }, [userId]);

    useEffect(() => {
        setIsLoading(true);
        const getUser = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data);
            } catch (e) {
                setUser(null);
            }
            setIsLoading(false);
        };
        getUser();
    }, [userId]);

    console.log("user: ", user);

    if (userId === currentUser.id) {
        return navigate("/profile");
    }

    const renderContent = () => {
        if (user) {
            return (
                <>
                    <InfoContainer>
                        <InfoBox>
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: "15px" }}
                            >
                                Info for {user.username}
                            </Typography>
                            {user.info.favoriteGenre && (
                                <Typography paragraph>
                                    Favorite Genre: {user.info.favoriteGenre}
                                </Typography>
                            )}
                            {user.info.favoriteArtist && (
                                <Typography paragraph>
                                    Favorite Artist: {user.info.favoriteArtist}
                                </Typography>
                            )}
                            {user.info.favoriteSong && (
                                <Typography paragraph>
                                    Favorite Song: {user.info.favoriteSong}
                                </Typography>
                            )}
                        </InfoBox>
                    </InfoContainer>
                    <InfoContainer>
                        <InfoBox>
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: "15px" }}
                            >
                                Playlists by {user.username}
                            </Typography>
                            {renderPlaylistData()}
                        </InfoBox>
                    </InfoContainer>
                </>
            );
        } else {
            return (
                <InfoContainer>
                    <InfoBox>
                        <Typography>No data for this user</Typography>
                    </InfoBox>
                </InfoContainer>
            );
        }
    };

    const renderPlaylistData = () => {
        if (playlistData.length) {
            return (
                <TableContainer sx={{ height: "100%" }}>
                    <Table>
                        <TableBody>
                            {playlistData.map((playlist, index) => (
                                <TableRow key={playlist._id}>
                                    <Cell sx={{}}>
                                        {index + 1}.{" "}
                                        <Link
                                            to={`/playlist/${playlist._id}`}
                                            style={{
                                                color: PRIMARY_BLUE,
                                            }}
                                        >
                                            {playlist.name}
                                        </Link>
                                    </Cell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else {
            return (
                <Typography>
                    {user.username} has not made any playlists yet.
                </Typography>
            );
        }
    };

    return <ProfileContainer>{isLoading ? <CircularProgress sx={{marginTop: "5rem"}}/> : renderContent()}</ProfileContainer>;
}
