import React from "react";
import styles from "./Box.module.css";

const Box = (props) => {
  const clearCalc = () => {
    props.clearCalc();
  };

  const newValue = (event) => {
    props.newValue(event.target.textContent);
  };

  return (
    <div
      onClick={
        props.val === "C"
          ? clearCalc
          : props.val === "="
          ? props.calculateResult
          : props.val === "←"
          ? props.backspace
          : props.val === "."
          ? props.handleDecimal
          : props.val === "+/-"
          ? props.plusMinus
          : newValue
      }
      className={
        props.className === "utility"
          ? `${styles.utility}`
          : props.className === "equals"
          ? `${styles.equals}`
          : `${styles.box}`
      }
    >
      <p>{props.val}</p>
    </div>
  );
};

export default Box;
