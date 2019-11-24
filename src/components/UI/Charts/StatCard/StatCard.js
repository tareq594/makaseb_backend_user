import React, { useState, useEffect } from "react";
import classes from "./StatCard.css";
import axios from "../../../../axios";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import StockIcon from "@material-ui/icons/Store";
import CustomerIcon from "@material-ui/icons/BusinessCenter";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import JODSVG from "../../../../assets/images/jod.svg"
import HashSVG from "../../../../assets/images/hash.svg"

const icons = {
  moneyIcon: MoneyIcon,
  stockIcon: StockIcon,
  customerIcon: CustomerIcon,
  dinarIcon: ()=>{ return(
    <img src={JODSVG} className={classes.IMG}></img>
  )},
  hashIcon: ()=>{ return(
    <img src={HashSVG} className={classes.IMG}></img>
  )}
};

const StatCard = ({ label, additional, icon, api, iconColor, fontSize }) => {
  var fontSizeStyle = {
    fontSize: fontSize
  };
  var colorStyle = {
    color: iconColor
  };
  const [value, setValue] = useState(0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(api)
      .then(res => {
        setLoading(false);
        setValue(res.data.value);
      })
      .catch(err => console.log(err));
  }, []);

  const Icon = icons[icon];

  return (
    <div className={classes.Card}>
      <div className={classes.Row}>
        <div className={classes.Column}>
          <p>{label}</p>
          <div className={classes.BelowRow}>
            <p
              className={[classes.Value, classes.Item].join(" ")}
              style={fontSizeStyle}
            >
              {value}
            </p>
            <p className={classes.Item}>{additional}</p>
          </div>
        </div>
        <Icon className={classes.Icon} style={colorStyle} />
      </div>
      <div className={classes.Spinner}>
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </div>
    </div>
  );
};

export default StatCard;
