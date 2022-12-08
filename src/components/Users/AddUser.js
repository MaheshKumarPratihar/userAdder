import { useState, useRef } from "react";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AddUser.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function simulateNeteworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
const AddUser = (props) => {
  // helps in connecting the ref with html element
  // which can help us in not using the onChange for input
  // instead we can use ref object returned by useRef()
  // connected to the html element
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredName, setName] = useState("");
  // const [enteredAge, setYear] = useState("");
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

    console.log(nameInputRef.current.value);
    console.log(ageInputRef.current.value);

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values)."
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age > 0."
      });
      return;
    }

    props.onAddUser(enteredName, enteredAge);

    setAdding(true);
    // rarely do this below code
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    /** we don't these states as we are taking the values
     * from refs
     */
    // setName("");
    // setYear("");
  };

  // const nameHandler = (event) => {
  //   setName(event.target.value);
  // };

  // const ageHandler = (event) => {
  //   setYear(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  // if (error) {
  //   return (
  //     <ErrorModal
  //       onConfirm={errorHandler}
  //       title={error.title}
  //       message={error.message}
  //     />
  //   );
  // }

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
            // value={enteredName}
            // onChange={nameHandler}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            name="age"
            // value={enteredAge}
            // onChange={ageHandler}
            ref={ageInputRef}
          ></input>
          <Button
            type="submit"
            disabled={isAdding}
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
