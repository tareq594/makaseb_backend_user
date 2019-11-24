import React from "react";
import classes from "./Stock.css";
import Card from "../../components/UI/Card/Card";

const Stock = () => {
  return (
    <div>
    <h1 className={classes.H1}>Stock</h1>
    <div className={classes.Stock}>
      <Card path="/stock/add" backgroundColor={"#01ACC1"} size="large" icon={"Add"}>
        Add to Stock
      </Card>
      <Card path="/stock/remove" backgroundColor={"#C10134"} size="large" icon={"Remove"}>
        Remove from Stock
      </Card>
    </div>
    </div>
  );
};

export default Stock;
