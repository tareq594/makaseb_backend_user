import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export interface MyAppBarProps {
  backgroundColor: string;
  width: number;
  handleDrawerToggle: VoidFunction;
}

export const MyAppBar: React.FC<MyAppBarProps> = ({
  backgroundColor,
  width,
  handleDrawerToggle,
}) => {

  console.log(backgroundColor)

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        [theme.breakpoints.up("sm")]: {
          width: `calc(100% - ${width}px)`,
          marginLeft: width,
        },
        backgroundColor: backgroundColor,
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      },
      toolbar: theme.mixins.toolbar,
    })
  );

  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
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
          <Typography variant="h6" noWrap>
            Makaseb
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
