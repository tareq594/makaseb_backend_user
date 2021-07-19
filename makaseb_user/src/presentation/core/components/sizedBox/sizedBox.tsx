import { makeStyles } from "@material-ui/core";
import React from "react";

export interface SizedBoxProps {
  width?: number;
  height?: number;
}

export const SizedBox: React.FC<SizedBoxProps> = ({
  width = 0,
  height = 0,
}) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      height: height,
      width: width,
    },
  });
  const classes = useStyles();

  return <div className={classes.root}></div>;
};
