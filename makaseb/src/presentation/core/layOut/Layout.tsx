import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { MyAppBar } from "../appBar/MyAppBar";
import { Sidemenu } from "../sidemenu/Sidemenu";
import { config } from "../../../config";

export interface LayoutProps {
  drawerWidth?: number;
  primaryColor?: string;
  menuItemColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  drawerWidth = config.drawerWidth,
  primaryColor = config.primaryColor,
  menuItemColor = config.menuItemColor,
  ...props
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
    })
  );
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root} {...props}>
        <CssBaseline />
        <MyAppBar
          backgroundColor={primaryColor}
          width={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        ></MyAppBar>

        <Sidemenu
          width={drawerWidth}
          backgroundColor={primaryColor}
          menuItemColor={menuItemColor}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        ></Sidemenu>
      </div>
      {props.children}
    </div>
  );
};
