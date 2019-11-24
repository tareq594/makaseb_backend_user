import React from "react";
import classes from "./DatePicker.css";

const DatePicker = props => {
  return (
    <div className={classes.DatePicker}>
      <p>{props.text}</p>
      <input type="date" min={props.min} max={props.max} onChange={props.onChange} />
    </div>
  );
};

export default DatePicker
