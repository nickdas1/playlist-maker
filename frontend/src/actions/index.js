import axios from "axios";
import * as types from "./types";
import history from "../history";

export const fetchPlaylists = () => async (dispatch) => {
    const response = await axios.get("/api/playlists");
    dispatch({ type: types.FETCH_PLAYLISTS, payload: response.data });
};

export const fetchPlaylist = (playlistId) => async (dispatch) => {
    const response = await axios.get(`/api/playlist/${playlistId}`);

    dispatch({ type: types.FETCH_PLAYLIST, payload: response.data[0] });
};

export const createPlaylist = (body) => async (dispatch, getState) => {
    const response = await axios.post("/api/playlist/create", {
        ...body,
    });
    const data = JSON.parse(response.config.data);
    const playlistId = response.data.insertedId;

    dispatch({
        type: types.CREATE_PLAYLIST,
        payload: { ...data, _id: playlistId },
    });
    history.push(`/playlist/${playlistId}`);
};

export const deletePlaylist = (playlistId, token) => async (dispatch) => {
    await axios.delete(`/api/playlist/${playlistId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: types.DELETE_PLAYLIST, payload: playlistId });
    history.push("/");
};

export const removeSong = (playlistId, song, token) => async (dispatch) => {
    const response = await axios.patch(
        `/api/playlist/${playlistId}/delete-song`,
        { song },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    const deletedSongId = JSON.parse(response.config.data).song._id;

    dispatch({
        type: types.REMOVE_SONG,
        payload: { deletedSongId, playlistId },
    });
};

export const fetchSongs = (query) => async (dispatch) => {
    const response = await axios.get(`/api/songs/search?q=${query}`);
    dispatch({ type: types.FETCH_SONGS, payload: response.data });
};
