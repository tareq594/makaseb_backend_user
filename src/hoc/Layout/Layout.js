import React from "react";
import classes from "./Layout.css";
import Drawer from "../../components/Drawer/Drawer";
import Footer from "../../components/Footer/Footer";

const Layout = props => {
  return (
    <div className={classes.Layout}>

      <Drawer />
      <div className={classes.Content}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
