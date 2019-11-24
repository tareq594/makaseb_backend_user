import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Routes from "../../../routes"

class HeaderText extends Component {
  routes = {
    "/dashboard": "Dashboard",
    "/home": "Home",
    "/":"Home"
  };
  state = {
    header: "/dashboard"
  };
  componentDidMount() {
    this.setState({
      ...this.state,
      header: this.props.location.pathname
    });
    this.props.history.listen((location, action) => {
      this.setState({
        ...this.state,
        header: location.pathname
      });
    });
  }
  render() {
      var path = "dashboard"
      if(this.state.header.split("/")[1]){
          path = this.state.header.split("/")[1]
      }

    return (
      <Typography variant="h6" noWrap>
        {Routes[path]["name"]}
      </Typography>
    );
  }
}

export default withRouter(HeaderText);
