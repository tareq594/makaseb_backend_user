import React, { Component } from "react";
import classes from "./CustomersCreate.css";
import TextField from "@material-ui/core/TextField";
import SaveButton from "../../../components/UI/Buttons/SaveButton/SaveButton";
import axios from "../../../axios";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";

class CustomersCreate extends Component {


  state = {
    validName: true,
    isLoading: false
  };
  formDataReset = {
    name: "",
    city: "",
    address: "",
    mobileNumber: "",
    email: ""
  };
  formData = {
    name: "",
    city: "",
    address: "",
    mobileNumber: "",
    email: ""
  };
  name = "";
  timer = null;

  handleCityInput = event => {
    this.formData.city = event.target.value;
  };
  handleAdressInput = event => {
    this.formData.address = event.target.value;
  };
  handleEmailInput = event => {
    this.formData.email = event.target.value;
  };
  handleMobileNumberInput = event => {
    this.formData.mobileNumber = event.target.value;
  };

  handleNameInput = event => {
    clearTimeout(this.timer);
    this.formData.name = event.target.value;
    const action = () => {
      axios.get(`/customer/validate?name=${this.formData.name}`).then(res => {
        this.setState({ validName: !res.data.isFound });
      });
      console.log("action triggered");
    };
    this.timer = setTimeout(action, 200);
  };

  mySubmitHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    setTimeout(() => {
      if (this.state.validName) {
        axios
          .post("/customer/create", this.formData)
          .then(res => {
            this.setState({ isLoading: false });
            alert("Customer created successfully");
            this.props.history.push("/customers");
          })
          .catch(err => {
            alert("something went wrong");
            this.setState({ isLoading: false });
          });
        console.log("submit");
      }
    }, 500);
  };

  render() {
    const NameError = () => {
      return this.state.validName ? (
        <div />
      ) : (
        <p className={classes.Invalid}>This Customer is already existed</p>
      );
    };

    return (
      <form onSubmit={this.mySubmitHandler} className={classes.FormBox}>
        <h1>Create new customer</h1>
        {/* <SizedBox height={10} /> */}
        <TextField
          required
          id="standard-name"
          label="Customer name"
          className={classes.TextField}
          margin="normal"
          onChange={this.handleNameInput}
          error={!this.state.validName}
          //   onInvalid={handleNameInput}
        />
        <NameError />
        <div className={classes.MultiInput}>
          <TextField
            id="standard-required"
            label="City"
            margin="normal"
            type="address"
            className={classes.SubTextField}
            onChange={this.handleCityInput}
          />
          <TextField
            id="standard-required"
            label="Address"
            margin="normal"
            className={classes.SubTextField}
            onChange={this.handleAdressInput}
            type="address"
          />
        </div>
        <div className={classes.MultiInput}>
          <TextField
            id="standard-required"
            label="Mobile Number"
            margin="normal"
            className={classes.SubTextField}
            onChange={this.handleMobileNumberInput}
            type="number"
          />
          <TextField
            id="standard-required"
            label="Email"
            margin="normal"
            className={classes.SubTextField}
            onChange={this.handleEmailInput}
            type="email"
          />
        </div>
        <div className={classes.Button}>
          <button onClick={() => {}}>
            <SaveButton
              // click={handleCustomerCreateButton}
              text="Save"
              icon="saveIcon"
              backgroundColor="#01ACC1"
              color="#ffffff"
              width={200}
              height={50}
              fontSize={20}
              hoverBackground="#02C6DE"
              type="submit"
            />
          </button>
          <div className={classes.Spinner}>
            <LoadingSpinner isLoading={this.state.isLoading} />
          </div>
        </div>
      </form>
    );
  }
}

export default CustomersCreate;
