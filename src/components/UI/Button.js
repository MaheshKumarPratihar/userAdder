import styles from "./Button.module.css";

const Button = (props) => {
  return (
    // button using react-bootstrap
    // <Btn
    //   className={styles["custom-btn"]}
    //   type={props.type || "button"}
    //   disabled={props.disabled}
    //   onClick={props.onClick}
    // >
    //   {props.children}
    // </Btn>
    <button
      className={styles.button}
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
