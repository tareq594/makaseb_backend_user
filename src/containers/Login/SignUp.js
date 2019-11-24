import React, { useState,useEffect } from "react";
import classes from "./Login.css";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SaveButton from "../../components/UI/Buttons/SaveButton/SaveButton";
import { registerUser,resetErrors } from "../../actions/authentication";
var logo = require("../../assets/images/logo.png");

const SignUp = ({ registerUser,resetErrors, history }) => {
  const errors = useSelector(state => state.errors);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    errors: {}
  });

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirm: data.password_confirm
    };
    registerUser(user, history);
  };
  const handleInputChange = e => {
    var updatedData = { ...data };
    updatedData[e.target.name] = e.target.value;
    setData(updatedData);
  };

  //   componentWillReceiveProps(nextProps) {
  //     if(nextProps.errors) {
  //         this.setState({
  //             errors: nextProps.errors
  //         });
  //     }
  // }

  useEffect(() => {
    resetErrors()
  }, []);


  const ErrorMessage = type => {
    return errors[type] ? (
      <p className={classes.Invalid}>{errors[type]}</p>
    ) : (
      <div />
    );
  };

  return (
    <div className={classes.Login}>
      <form onSubmit={handleSubmit} className={classes.Form}>
        <h1>SignUp</h1>
        <img src={logo} alt="logo" />
        <Paper className={classes.Paper}>
          <TextField
            required
            id="standard-required"
            name="name"
            label="Name"
            className={classes.SubTextField}
            onChange={handleInputChange}
            type="text"
          />
          {ErrorMessage("name")}
        </Paper>
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
        </Paper>
        {ErrorMessage("email")}
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
        </Paper>
        {ErrorMessage("password")}
        <Paper className={classes.Paper}>
          <TextField
            required
            id="standard-required"
            name="password_confirm"
            label="Confirm password"
            className={classes.SubTextField}
            onChange={handleInputChange}
            type="password"
          />
        </Paper>
        {ErrorMessage("password_confirm")}

        <br />
        <div className={classes.Button}>
          <button onClick={() => {}}>
            <SaveButton
              text="SignUp"
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
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser,resetErrors }
)(withRouter(SignUp));

// export default SignUp;
