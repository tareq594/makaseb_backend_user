import React from "react";
import classes from "./titledElement.css"
import SizedBox from "../SizedBox/SizedBox";

const titledElement = ({ title, subtitle ,children}) => {
  return (
    <div className={classes.TitledItem}>
      <p className={classes.Title}>{`${title}:`}</p>
      <SizedBox width={10}></SizedBox>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default titledElement