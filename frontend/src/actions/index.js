import axios from "axios";
import * as types from "./types";

export const fetchPlaylists = () => async (dispatch) => {
    const response = await axios.get("/api/playlists");
    dispatch({
        type: types.FETCH_PLAYLISTS,
        payload: response.data,
    });
};

export const createPlaylist = () => {
    return {
        type: types.CREATE_PLAYLIST,
    };
};
