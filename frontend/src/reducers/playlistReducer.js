import * as types from "../actions/types";

const playlistReducer = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_PLAYLISTS:
            return action.payload;
        default:
            return state;
    }
};

export default playlistReducer;
