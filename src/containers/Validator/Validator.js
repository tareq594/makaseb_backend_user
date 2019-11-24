import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import axios from "../../axios";
import classes from "./Validator.css";
import qrGif from "../../assets/images/qrscan.gif";
import lnsnPNG from "../../assets/images/lnsn.png";
import TableSetting from "../Validator/TableSettings";
import AdminTableSetting from "../ItemSearch/TableSettings";

import MUIDataTable from "mui-datatables";
// import SearchInput from "../../components/UI/SearchInput/SearchInput";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MutanabiButton from "../../components/UI/MutanabiButton/MutanabiButton";

const Validator = ({ auth }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([
    { content: "", style: classes.Original }
  ]);
  // var [searchInputValue, setsearchInputValue] = useState("");
  const [lotValue, setLotValue] = useState("");
  const [serialValue, setSerialValue] = useState("");

  var typedText = "";

  const handleQrScan = event => {
    if (event.keyCode === 13 && typedText.length >= 39) {
      var longString = typedText.substring(typedText.length - 39);
      var GTIN = longString.substring(2, 15);
      if (GTIN === "8033638950951") {
        handleSearch(longString, true);
      }
      typedText = "";
      return;
    }
    typedText = typedText + event.key;
  };
  // const handleSearchBoxChange = event => {
  //   setsearchInputValue(event.target.value);
  // };

  // const inputKeyPressed = event => {
  //   if (event.keyCode === 13 && typedText.length >= 39) {
  //     var longString = typedText.substring(typedText.length - 39);
  //     var GTIN = longString.substring(2, 15);
  //     if (GTIN === "8033638950951") {
  //       return;
  //     }
  //   }
  //   if (event.keyCode === 13) {
  //     console.log(typedText);
  //     if (event.target.value === "8033638950951") {
  //       alert(
  //         "You have entered the GTIN number. Please enter the serial number as shown in the picture above"
  //       );
  //       return;
  //     }
  //     handleSearch(event.target.value, false);
  //   }
  // };

  const handleSearch = (value, isQR) => {
    const apiSearch = uri => {
      axios
        .get(uri)
        .then(results => {
          console.log(results.data);
          if (results.data.error) {
            setStatus({
              content: "The item has never been sold by Al-Mutanabi store",
              style: classes.Fake
            });
            return;
          }
          const newData = results.data.map(result => {
            var object = {
              GTIN: result.GTIN,
              LOT: result.LOT,
              QR: result.QR,
              SN: result.SN,
              expDate: result.expDate,
              selldate: result.buyDate,
              customer: result.customer ? result.customer.id.name : "",
              stockEntryDate: result.stockEntryDate,
              billNumber: result.billNumber
            };
            return object;
          });
          setData(newData);
          if (results.data.length < 1) {
            setStatus({
              content: "The item has never been sold by Al-Mutanabi store",
              style: classes.Fake
            });
          } else {
            setStatus({
              content: "The item is sold by Al-Mutanabi store",
              style: classes.Original
            });
          }
        })
        .catch(err => console.log(err));
    };
    if (isQR) {
      apiSearch(`/search/QR?QR=${value}`);
      return;
    }
    if (value.includes("8033638950951")) {
      setStatus({
        content:
          "You have entered the GTIN number. Please enter the lot and serial number as shown in the picture above",
        style: classes.Fake
      });
      return;
    }
    apiSearch(`/search/lotSerialNumber?ln=${value[0]}&sn=${value[1]}`);
  };

  useEventListener("keydown", handleQrScan);

  const handleLotInput = event => {
    setLotValue(event.target.value);
  };
  const handleSerialInput = event => {
    setSerialValue(event.target.value);
  };

  return (
    <div className={classes.Validator}>
      <h2>Scan QR to validate the item</h2>
      <div className={classes.QR}>
        <img src={qrGif} alt="scan qr"></img>
      </div>
      <h2>Or search by the Lot and Serial numbers</h2>
      <img src={lnsnPNG} alt="lnsn"></img>
      <form
        className={classes.Form}
        onSubmit={event => {
          handleSearch([lotValue, serialValue], false);
          event.preventDefault();
        }}
      >
        <h1 className={classes.H1}>
          Please Enter the Lot and Serial numbers as shown above
        </h1>
        <TextField
          required
          id="standard-required"
          label="Lot number"
          className={classes.TextField}
          margin="normal"
          onChange={handleLotInput}
          // error={!this.state.validName}
        />
        <TextField
          required
          id="standard-required"
          label="Serial number"
          className={classes.TextField}
          margin="normal"
          onChange={handleSerialInput}
          // error={!this.state.validName}
        />
        {/* <button className={classes.ripple}>Search</button> */}
        <MutanabiButton></MutanabiButton>
      </form>
      <p className={status.style}>{status.content}</p>
      <MUIDataTable
        title={"Search results"}
        data={data}
        columns={
          auth.isAuthenticated
            ? AdminTableSetting.columns
            : TableSetting.columns
        }
        options={
          auth.isAuthenticated
            ? AdminTableSetting.options
            : TableSetting.options
        }
        className={classes.Table}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Validator));
