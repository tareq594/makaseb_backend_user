import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(),
    color:"#01ACC1",
  }
}));

const LoadingSpinner = props => {
  const classes = useStyles();
  if (props.isLoading) {
    return (
      <div>
        <CircularProgress className={classes.progress}/>
      </div>
    );
  } else {
    return <div />;
  }
};
export default LoadingSpinner
