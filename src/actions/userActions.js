export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER_DETAIL_REQUEST = "FETCH_USER_DETAIL_REQUEST";
export const FETCH_USER_DETAIL_SUCCESS = "FETCH_USER_DETAIL_SUCCESS";
export const FETCH_USER_DETAIL_FAILURE = "FETCH_USER_DETAIL_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

export const fetchUserDetailRequest = (userId) => ({ type: FETCH_USER_DETAIL_REQUEST, payload: userId });
export const fetchUserDetailSuccess = (user) => ({ type: FETCH_USER_DETAIL_SUCCESS, payload: user });
export const fetchUserDetailFailure = (error) => ({ type: FETCH_USER_DETAIL_FAILURE, payload: error });

export const updateUserRequest = (user) => ({ type: UPDATE_USER_REQUEST, payload: user });
export const updateUserSuccess = (user) => ({ type: UPDATE_USER_SUCCESS, payload: user });
export const updateUserFailure = (error) => ({ type: UPDATE_USER_FAILURE, payload: error });
