import * as types from "../actions/types";

const playlistReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PLAYLISTS:
            const playlistsObj = action.payload.reduce((acc, playlist) => {
                acc[playlist._id] = playlist;
                return acc;
            }, {});
            return { ...state, ...playlistsObj };
        case types.FETCH_PLAYLIST:
            return { ...state, [action.payload._id]: action.payload };
        case types.CREATE_PLAYLIST:
            return { ...state, [action.payload._id]: action.payload };
        case types.DELETE_PLAYLIST:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        case types.REMOVE_SONG:
            return {
                ...state,
                [action.payload.playlistId]: {
                    ...state[action.payload.playlistId],
                    songs: state[action.payload.playlistId].songs.filter(
                        (song) => song._id !== action.payload.deletedSongId
                    ),
                },
            };
        default:
            return state;
    }
};

export default playlistReducer;
