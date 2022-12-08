import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
// import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AddUser.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function simulateNeteworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
const AddUser = (props) => {
  const [enteredName, setName] = useState("");
  const [enteredAge, setYear] = useState("");
  const [error, setError] = useState();

  const [isAdding, setAdding] = useState(false);

  useEffect(() => {
    if (isAdding) {
      simulateNeteworkRequest().then(() => {
        setAdding(false);
      });
    }
  }, [isAdding]);

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)."
      });
      return;
    }
    if (Number(enteredAge) < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age > 0."
      });
      return;
    }

    console.log({ name: enteredName, age: enteredAge });
    props.onAddUser(enteredName, enteredAge);

    setAdding(true);
    setName("");
    setYear("");
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const ageHandler = (event) => {
    setYear(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={`${styles.input}`}>
        <form onSubmit={!isAdding ? addUserHandler : null}>
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            id="uname"
            name="uname"
            value={enteredName}
            onChange={nameHandler}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={enteredAge}
            onChange={ageHandler}
          ></input>
          <Button
            type="submit"
            // disabled={isAdding}
            // onClick={!isAdding ? handleClick : null}
          >
            {isAdding ? "Adding..." : "Add User"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
