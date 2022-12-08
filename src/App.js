import React from "react";
import { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
import ErrorModal from "./components/UI/ErrorModal";

function App() {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(false);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      let a = prevUsersList.filter(
        (user) => user.age === uAge && user.name === uName
      );
      if (a.length === 0) {
        return [
          ...prevUsersList,
          { id: Math.random(), name: uName, age: uAge }
        ];
      } else {
        setError({
          title: "User ??",
          message: `${uName} (${uAge} years old) already exists !!!`
        });
        return [...prevUsersList];
      }
    });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <AddUser onAddUser={addUserHandler} />
      {usersList.length >= 0 && <UsersList users={usersList} />}
    </div>
  );
}

export default App;
