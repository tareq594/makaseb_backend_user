import React, { useState, useEffect } from "react";
import classes from "./Login.css";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SaveButton from "../../components/UI/Buttons/SaveButton/SaveButton";
import { loginUser, resetErrors } from "../../actions/authentication";
var logo = require("../../assets/images/logo.png");

const Login = ({ loginUser, resetErrors, history,auth }) => {
  const errors = useSelector(state => state.errors);
  const {isAuthenticated} = auth;

  const [data, setData] = useState({
    name: "",
    email: "",
    errors: {}
  });

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: data.email,
      password: data.password
    };
    loginUser(user,history);
  };
  const handleInputChange = e => {
    var updatedData = { ...data };
    updatedData[e.target.name] = e.target.value;
    setData(updatedData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    resetErrors();
  }, []);

  const ErrorMessage = type => {
    console.log(errors);
    return errors[type] ? (
      <p className={classes.Invalid}>{errors[type]}</p>
    ) : (
      <div />
    );
  };

  return (
    <div className={classes.Login}>
      <form onSubmit={handleSubmit} className={classes.Form}>
        <h1>Login</h1>
        <img src={logo} alt="logo" />
        <Paper className={classes.Paper}>
          <TextField
            required
            id="standard-required"
            name="email"
            label="Email"
            className={classes.SubTextField}
            onChange={handleInputChange}
            type="email"
          />
          {ErrorMessage("email")}
        </Paper>
        <Paper className={classes.Paper}>
          <TextField
            required
            id="standard-required"
            name="password"
            label="Password"
            className={classes.SubTextField}
            onChange={handleInputChange}
            type="password"
          />
          {ErrorMessage("password")}
        </Paper>
        <br />
        <div className={classes.Button}>
          <button onClick={() => {}}>
            <SaveButton
              text="Login"
              // icon="null"
              backgroundColor="#01ACC1"
              color="#ffffff"
              width={200}
              height={50}
              fontSize={25}
              hoverBackground="#02C6DE"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser, resetErrors }
)(Login);
