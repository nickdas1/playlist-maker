import * as types from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOG_IN:
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload,
            };
        case types.LOG_OUT:
            return { ...state, isLoggedIn: false, userId: null };
        default:
            return state;
    }
};

export default authReducer;
