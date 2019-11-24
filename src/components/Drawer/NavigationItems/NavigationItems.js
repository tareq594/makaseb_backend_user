import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import Routes from "../../../routes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import classes from "./NavigationItems.css";
import DashIcon from "@material-ui/icons/Dashboard";
import StoreIcon from "@material-ui/icons/Store";
import CustomersIcon from "@material-ui/icons/Business";
import ItemSearchIcon from "@material-ui/icons/Search";
import ValidatorIcon from "@material-ui/icons/CheckCircle";
import SignInIcon from "@material-ui/icons/Input";
import SettingsIcon from "@material-ui/icons/SettingsApplications";
import ReportsIcon from "@material-ui/icons/Poll";
import StatusIcon from "@material-ui/icons/Cached";
import PrintIcon from "@material-ui/icons/Print";

import Divider from "../../UI/Divider/Divider";

import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authentication";
import { withRouter } from "react-router-dom";
import SizedBox from "../../UI/SizedBox/SizedBox";

const NavigationItems = props => {
  const onLogout = e => {
    e.preventDefault();
    props.logoutUser(props.history);
  };
  const { isAuthenticated, user } = props.auth;

  const authenticatedRoutes = isAuthenticated ? (
    <div>
      <h1 className={classes.H1}>{user.name}</h1>
      <div className={classes.Avatar}>
        <img src={user.avatar} alt={user.name} title={user.name} />
      </div>
      <br></br>
      <p className={classes.header}>QR tracking system</p>
      <Divider color="white" />
      <br></br>
      <NavigationItem
        key={Routes.dashboard.name}
        path={Routes.dashboard.path}
        name={Routes.dashboard.name}
        click={props.click}
      >
        <DashIcon />
      </NavigationItem>
      <NavigationItem
        key={Routes.stock.name}
        path={Routes.stock.path}
        name={Routes.stock.name}
        click={props.click}
      >
        <StoreIcon />
      </NavigationItem>
      <NavigationItem
        key={Routes.customers.name}
        path={Routes.customers.path}
        name={Routes.customers.name}
        click={props.click}
      >
        <CustomersIcon />
      </NavigationItem>
      <NavigationItem
        key={Routes.itemSearch.name}
        path={Routes.itemSearch.path}
        name={Routes.itemSearch.name}
        click={props.click}
      >
        <ItemSearchIcon />
      </NavigationItem>
    </div>
  ) : (
    <div></div>
  );
  const SignIn = !isAuthenticated ? (
    <NavigationItem
      key={Routes.login.name}
      path={Routes.login.path}
      name={Routes.login.name}
      click={props.click}
    >
      <SignInIcon />
    </NavigationItem>
  ) : (
    <div></div>
  );

  const Settings = isAuthenticated ? (
    <NavigationItem
      key={Routes.settings.name}
      path={Routes.settings.path}
      name={Routes.settings.name}
      click={props.click}
    >
      <SettingsIcon />
    </NavigationItem>
  ) : (
    <div></div>
  );

  const Logout = isAuthenticated ? (
    <div className={classes.ListItem}>
      <ListItem button={true} key="logout" onClick={onLogout}>
        <ListItemIcon style={{ color: "#ffffff" }}>
          <SignInIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  ) : (
    <div></div>
  );

  const invoicesItems = isAuthenticated ? (
    <div>
    <br></br>
      <p className={classes.header}>Invoice tracking system</p>
      <SizedBox height={5}></SizedBox>
      <Divider color="white" />
      <SizedBox height={10}></SizedBox>

      <NavigationItem
        key={Routes.labelsGenerator.name}
        path={Routes.labelsGenerator.path}
        name={Routes.labelsGenerator.name}
        click={props.click}
      >
        <PrintIcon />
      </NavigationItem>
      <NavigationItem
        key={Routes.updateInvoiceStatus.name}
        path={Routes.updateInvoiceStatus.path}
        name={Routes.updateInvoiceStatus.name}
        click={props.click}
      >
        <StatusIcon />
      </NavigationItem>
      <NavigationItem
        key={Routes.invoicesReports.name}
        path={Routes.invoicesReports.path}
        name={Routes.invoicesReports.name}
        click={props.click}
      >
        <ReportsIcon />
      </NavigationItem>

      <div className={classes.ListItem}></div>
      <Divider color="white" />
    </div>
  ) : (
    <div></div>
  );

  return (
    <List>
      {authenticatedRoutes}
      {SignIn}
      <NavigationItem
        key={Routes.validator.name}
        path={Routes.validator.path}
        name={Routes.validator.name}
        click={props.click}
      >
        <ValidatorIcon />
      </NavigationItem>
      {Settings}
      {invoicesItems}
      {Logout}
    </List>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavigationItems));

// export default NavigationItems;
