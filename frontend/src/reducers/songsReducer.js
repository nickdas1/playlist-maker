import * as types from "../actions/types";

const songsReducer = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_SONGS:
            return action.payload;
        default:
            return state;
    }
};

export default songsReducer;
