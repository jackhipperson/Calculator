import React from "react";
import styles from "./BoxContainer.module.css";

const BoxContainer = (props) => {

  return (
    <div className={styles.boxContainer}>
{props.children}
    </div>
  );
};

export default BoxContainer;
