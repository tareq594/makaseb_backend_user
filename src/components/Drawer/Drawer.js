import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import cssClasses from "./Drawer.css";
import HeaderText from "./HeaderText/HeaderText";
import NavigationItems from "./NavigationItems/NavigationItems"

var logo = require("../../assets/images/logo.png");

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#242E3C",
    backgroundSize: "cover",
    zIndex: "3",
    position: "fixed",
    display: "block",
    backgroundPosition: "center center"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const ResponsiveDrawer = () => {
  // classes set up and used down
  const classes = useStyles();
  // theme gives general configs for theme
  const theme = useTheme();

  // react hooks for drawer state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  function handleNavigationItemClick(){
    setMobileOpen(false)
  }

  const drawer = (
    <div className={cssClasses.Drawer}>
      <div className={cssClasses.Toolbar}>
        <img src={logo} alt="logo" />
      </div>
      <hr />
      <NavigationItems click={handleNavigationItemClick}></NavigationItems>
      <Divider light={true} />
    </div>
  );

  return (
    <div className={cssClasses.Root}>
      <CssBaseline />
      <div className={cssClasses.AppBar}>
        <div className={cssClasses.Content}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <HeaderText />
          </Toolbar>
        </div>
      </div>
      {/* </AppBar> */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default ResponsiveDrawer;
