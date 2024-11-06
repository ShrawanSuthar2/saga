import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USER_DETAIL_REQUEST,
    FETCH_USER_DETAIL_SUCCESS,
    FETCH_USER_DETAIL_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
    loading: false,
    users: [],
    userDetail: null,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case FETCH_USER_DETAIL_REQUEST:
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case FETCH_USER_DETAIL_SUCCESS:
            return { ...state, loading: false, userDetail: action.payload };
        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, userDetail: action.payload };
        case FETCH_USERS_FAILURE:
        case FETCH_USER_DETAIL_FAILURE:
        case UPDATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
