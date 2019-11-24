import React from "react";
import classes from "./MutanabiButton.css";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import CircularProgress from "@material-ui/core/CircularProgress";

const MutanabiButton = ({ children, click ,isLoading,width,height,fontSize}) => {
  const content = isLoading?(<CircularProgress size={30} color="inherit" className={classes.Loading}></CircularProgress>):children

  return (
    <button
      className={[classes.ripple, classes.Button].join(" ")}
      onClick={click}
      style={{width:width?width:240,height:height?height:50,fontSize:fontSize?fontSize:20}}
    >
      {content}
    </button>
  );
};

export default MutanabiButton;
