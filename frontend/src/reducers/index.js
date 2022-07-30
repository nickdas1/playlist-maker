import { combineReducers } from "redux";
import playlistReducer from "./playlistReducer";
import songsReducer from "./songsReducer";

export default combineReducers({
    playlists: playlistReducer,
    songs: songsReducer,
});
