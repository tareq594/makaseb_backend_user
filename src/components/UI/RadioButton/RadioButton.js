import React from "react";
import classes from "./RadioButton.css";

const RadioButton = (props) => {
  return (
    <label className={classes.RadioContainer}>
      <p>{props.children}</p>
      <input
        type="checkbox"
        checked={props.checked}
        onClick={props.handleClick}
        readOnly
      />
      <span className={classes.Checkmark}>
        <span className={classes.Node}></span>
      </span>
    </label>
  );
};

export default RadioButton