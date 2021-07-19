import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import {
  colors,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";
import { categoriesRoutes } from "../../../routes";
import { useSelector, useDispatch } from "react-redux";
import {
  AuthenticationState,
  selectAuthenticate,
  signOut,
} from "../../../application/authentication/authentication_slice";

export interface SidemenuProps {
  width: number;
  backgroundColor: string;
  mobileOpen: boolean;
  toolBarColor?: string;
  menuItemColor?: string;
  handleDrawerToggle: VoidFunction;
}

export const Sidemenu: React.FC<SidemenuProps> = ({
  width = 240,
  backgroundColor = "blue",
  toolBarColor,
  menuItemColor = "white",
  mobileOpen = false,
  handleDrawerToggle,
}) => {
  const authentication = useSelector(selectAuthenticate);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        [theme.breakpoints.up("sm")]: {
          width: width,
          flexShrink: 0,
        },
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: toolBarColor ?? backgroundColor,
      },
      drawerPaper: {
        width: width,
        backgroundColor: backgroundColor,
      },
      ListItem: {
        color: menuItemColor,
      },
      category: {
        color: colors.grey.A400,
        fontWeight: "bolder",
      },
    })
  );

  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={[classes.toolbar, classes.logo].join(" ")}>
        <Logo size="medium"></Logo>
      </div>

      <Divider />
      <List>
        {categoriesRoutes.map((catRout, index) => {
          var routes = catRout.routes.map((rout, index) => {
            var icon = rout.icon ? <rout.icon></rout.icon> : <div></div>;
            return (
              <Link to={rout.path} key={rout.name + "link"}>
                <ListItem button className={classes.ListItem}>
                  <ListItemIcon className={classes.ListItem}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={rout.name} />
                </ListItem>
              </Link>
            );
          });
          var cat = (
            <div key={catRout.name + "div"}>
              <ListItem className={classes.ListItem}>
                <ListItemText
                  primary={catRout.name}
                  className={classes.category}
                />
              </ListItem>
              {routes}
            </div>
          );
          return cat;
        })}
      </List>
      <Divider />
      <button onClick={() => dispatch(signOut())}>press</button>
    </div>
  );

  const content =
    authentication == AuthenticationState.Authenticated ? (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    ) : (
      <div></div>
    );

  return <div>{content}</div>;
};
