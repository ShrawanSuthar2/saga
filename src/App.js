import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest, fetchUserDetailRequest, updateUserRequest } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const { users, userDetail, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleFetchUserDetail = (id) => {
    dispatch(fetchUserDetailRequest(id));
  };

  const handleUpdateUser = (user) => {
    dispatch(updateUserRequest({ ...user, name: "Updated Name" }));
  };

  return (
    <div>
      <h1>User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <button onClick={() => handleFetchUserDetail(user.id)}>Fetch Details</button>
          <button onClick={() => handleUpdateUser(user)}>Update User</button>
        </div>
      ))}
      {userDetail && (
        <div>
          <h2>User Details</h2>
          <p>{userDetail.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
