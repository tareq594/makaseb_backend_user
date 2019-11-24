import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CreateIcon from "@material-ui/icons/Create"
import SearchIcon from "@material-ui/icons/Search";


const icons = {
  "saveIcon":SaveIcon,
  "createIcon":CreateIcon,
  "searchIcon":SearchIcon,
  // "null":nill
}

const SaveButton = (props) => {

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: props.backgroundColor,
      color: props.color,
      width: props.width,
      height: props.height,
      fontSize: props.fontSize,
      fontWeight: "bold",
      "&:hover": {
        background: props.hoverBackground
      }
    },
    leftIcon: {
      marginRight: theme.spacing(1),
      fontSize: props.fontSize*1.15
    }
  }));
  var Icon = icons[props.icon];
  var RIcon = props.icon?<Icon/>:<div></div>
  const classes = useStyles();
  return (
    <Button onClick={props.click} onKeyDown={(event)=>{event.preventDefault()}} variant="contained" className={classes.button}>
      {RIcon}
      {props.text}
    </Button>
  );
};

export default SaveButton;
