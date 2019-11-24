import React from "react";
import classes from "./Footer.css";
import { NavLink } from "react-router-dom";
import Routes from "../../routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Footer = ({ auth }) => {
  const navItems = auth.isAuthenticated ? (
    Object.keys(Routes).map(function(route, index) {
      if (Routes[route].name !== "Login" && Routes[route].name !== "Signup") {
        const navItem = (
          <NavLink
            to={Routes[route].path}
            activeClassName={classes.active}
            key={Routes[route].name}
          >
            {Routes[route].name}
          </NavLink>
        );
        return navItem;
      } else {
        return <div key={`emptyDiv${Routes[route].name}`}></div>;
      }
    })
  ) : (
    <div></div>
  );

  return (
    <div className={classes.Footer}>
      <div className={classes.Left}>
        <ul>{navItems}</ul>
      </div>
      <div className={classes.Right}>
        <h4>© 2019 Cyborgs Technology</h4>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Footer));
