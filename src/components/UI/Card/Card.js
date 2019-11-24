import React from "react";
import classes from "./Card.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { NavLink, withRouter } from "react-router-dom";

const Card = props => {
  const backgroundColor = props.backgroundColor;
  const style = {
    color: "white"
  };
  const icons = {
    Add: AddIcon,
    Remove: RemoveIcon
  };

  const propClasses = {
    large: {
      card: [classes.card, classes.cardLarge].join(" "),
      cardTitle: [classes.cardTitle, classes.cardTitleLarge].join(" "),
      Icon: classes.IconLarge
    },
    xmedium: {
      card: [classes.card, classes.cardXMedium].join(" "),
      cardTitle: [classes.cardTitle, classes.cardTitleXMedium].join(" "),
      Icon: classes.IconXMedium
    },
    medium: {
      card: [classes.card, classes.cardMedium].join(" "),
      cardTitle: [classes.cardTitle, classes.cardTitleMedium].join(" "),
      Icon: classes.IconMedium
    }
  };
  const size = props.size;
  const customClass = propClasses[size];
  const Myicon = icons[props.icon];

  var Component = () => {
    return (
      <div
        className={customClass.card}
        style={{
          backgroundColor: backgroundColor
        }}
      >
        <Myicon className={customClass.Icon} style={style} />
        <div className={customClass.cardTitle}>
          <p>{props.children}</p>
        </div>
      </div>
    );
  };
  var Rendered = Component
  if (props.path) {
    console.log("rerender") 
    Rendered = () => {
      return (
        <NavLink to={props.path} activeClassName={customClass.cardTitle}>
          <Component />
        </NavLink>
      );
    };
  }
  console.log("rerender")

  return (
    // <NavLink to={props.path} activeClassName={customClass.cardTitle} onClick={props.click}>
    // </NavLink>
    <Rendered/>
  );
};

export default withRouter(Card);
