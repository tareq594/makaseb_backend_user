import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import logo from "../../../assets/images/logo.png";

export interface LogoProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
}

export const Logo: React.FC<LogoProps> = ({
  size = "medium",
  backgroundColor,
}) => {
  const width = size == "small" ? 100 : size == "medium" ? 150 : 400;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "block",
      },
      img: {
        width: width,
        backgroundColor: backgroundColor ?? "transparent",
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={logo} className={classes.img} alt="logo" />
    </div>
  );
};
