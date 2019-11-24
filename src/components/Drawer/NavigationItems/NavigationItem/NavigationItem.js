
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink,LinkProps } from "react-router-dom";
import classes from "./Navigationitem.css";


const NavigationItem = props => {
  const AdapterLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);
  
  return (
    <div className={classes.ListItem}>
      <ListItem
        button = {true}
        key={props.name}
        component={AdapterLink}
        activeClassName={classes.active}
        to={props.path}
        onClick={props.click}
      >
        <ListItemIcon style={{ color: "#ffffff" }}>
          {props.children}
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    </div>
  );
};

export default NavigationItem;
