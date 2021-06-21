import { makeStyles, SvgIconTypeMap, Typography,colors } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import { SizedBox } from "../sizedBox/sizedBox";

export interface IconedTextProps {
  text: string;
  textColor?: string;
  iconColor?: string;
}

export const IconedText: React.FC<IconedTextProps> = ({
  text,
  textColor = colors.grey[700],
  iconColor = "black",
  ...props
}) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      color: iconColor,
    },
    text: {
      color: textColor ,
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.children}
      <SizedBox width={8} />
      <Typography
        variant="subtitle2"
        gutterBottom
        color="inherit"
        className={classes.text}
      >
        {text}
      </Typography>
    </div>
  );
};
