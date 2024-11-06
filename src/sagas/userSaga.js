import { call, put, takeLatest, select, delay, race } from "redux-saga/effects";
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  FETCH_USER_DETAIL_REQUEST,
  fetchUserDetailSuccess,
  fetchUserDetailFailure,
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from "../actions/userActions";

// Simulated API calls
function fetchUsersApi() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json());
}

function fetchUserDetailApi(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => response.json());
}

function updateUserApi(user) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

// Fetch users saga with error handling
function* fetchUsersSaga() {
  try {
    console.log("Starting cal...");
    const users = yield call(fetchUsersApi);
    console.log("After first yield...", users);
    yield put(fetchUsersSuccess(users));
    console.log("End of generator");
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// Fetch specific user detail saga with a timeout and retry logic
function* fetchUserDetailSaga(action) {
  const userId = action.payload;
  let attempts = 3;
  const delayTime = 1000; // Initial delay time (1 second)

  while (attempts > 0) {
    try {
      const { user, timeout } = yield race({
        user: call(fetchUserDetailApi, userId),
        timeout: delay(3000), // Timeout after 3 seconds
      });

      if (timeout) {
        throw new Error("Request timed out");
      }

      yield put(fetchUserDetailSuccess(user));
      return; // Exit loop if successful
    } catch (error) {
      attempts -= 1;
      if (attempts === 0) {
        yield put(fetchUserDetailFailure(error.message));
      } else {
        yield delay(delayTime * (4 - attempts)); // Exponential backoff
      }
    }
  }
}

// Update user saga that also accesses store data
function* updateUserSaga(action) {
  const user = action.payload;
  try {
    const updatedUser = yield call(updateUserApi, user);
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(FETCH_USER_DETAIL_REQUEST, fetchUserDetailSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
}
