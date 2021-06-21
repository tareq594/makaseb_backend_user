import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import {
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/Inbox";
import { Logo } from "../logo/Logo";
import { config } from "../../../config";
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text} className={classes.ListItem}>
            <ListItemIcon className={classes.ListItem}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text} className={classes.ListItem}>
            <ListItemIcon className={classes.ListItem}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
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
    </div>
  );
};
