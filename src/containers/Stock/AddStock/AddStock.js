import React, { useState } from "react";
import classes from "./AddStock.css";
import MUIDataTable from "mui-datatables";
import Card from "../../../components/UI/Card/Card";
import SizedBox from "../../../components/UI/SizedBox/SizedBox";
import Switch from "react-switch";
import SaveButton from "../../../components/UI/Buttons/SaveButton/SaveButton";
import sugar from "sugar";
import axios from "../../../axios";
// import UIfx from "uifx";
// import bellAudio from "/Users/tareqsanabra/Documents/react/mutanabi-qr/src/assets/sounds/error.mp3";
import AlertDialog from "../../../components/UI/Alert/Alert";
import TableSettings from "../../../tableSettings";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import useEventListener from "@use-it/event-listener";

const AddStock = () => {
  // this.handleSwitchChange = this.handleSwitchChange.bind(this);
  // this.handleRTSwitchChange = this.handleRTSwitchChange.bind(this);
  // this.handleSave = this.handleSave.bind(this);

  const [isLoading, setLoading] = useState(false);
  // const [isRT, setRt] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("false");
  const [alertContent, setAlertContent] = useState("false");
  const [isContent, setIsContent] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [data, setData] = useState([]);
  const options = TableSettings.options;
  const columns = TableSettings.columns;
  var typedText = "";

  const handleSave = () => {
    setLoading(true);
    axios
      .post("/stocksave", data)
      .then((result, error) => {
        setLoading(false);
        if (error) {
          return;
        }
        const writeErrors = result.data.result.writeErrors;
        if (writeErrors) {
          var serialDuplicates = [];
          serialDuplicates = writeErrors.map(item => {
            return item.op.SN.toString();
          });
          setAlertTitle(
            "Items added succefully to the stock. \n Please note that the items with the following serial numbers were added previously to the stock"
          );
          setAlertContent(serialDuplicates);
          setIsContent(true);
          setAlert(true);
          setData([]);
        } else {
          setAlertTitle("Items added succefully to the stock.");
          setIsContent(false);
          setAlert(true);
          setData([]);
        }
      })
      .catch(err => {
        setLoading(false);
        setAlertTitle("Error. something went wrong");
        setIsContent(false);
        setAlert(true);
        setData([]);
      });
  };

  const handleSwitchChange = isAdd => {
    setIsAdd(isAdd);
  };

  const handleAddButton = () => {
    setIsAdd(true);
  };
  const handleRemoveButton = () => {
    setIsAdd(false);
  };

  const handleRemoveItem = value => {
    const updatedData = [...data];
    sugar.Array.remove(updatedData, function(el) {
      return el.QR === value;
    });
    setData(updatedData);
  };

  const handleAddItem = value => {
    const sub = (st, en) => value.substring(st, en);
    var unique = true;
    data.forEach(el => {
      if (value === el.QR) {
        unique = false;
      }
    });
    if (!unique) {
      return;
    }
    const GTIN = sub(2, 15);
    const SN = sub(34, 39);
    const jetzt = new Date();

    const handleAddItem = () => {
      const extracted = {
        QR: value,
        GTIN: GTIN,
        LOT: sub(17, 24),
        expDate: ["20" + sub(26, 28), sub(28, 30), sub(30, 32)].join("-"),
        SN: SN
      };
      const updatedData = [...data];
      updatedData.push(extracted);
      setData(updatedData);
    };
    handleAddItem();
  };

  const handleKeypress = event => {
    // if enter pressed
    if (event.keyCode === 13 && typedText.length >= 39) {
      var longString = typedText.substring(typedText.length - 39);
      var GTIN = longString.substring(2, 15);
      if (GTIN === "8033638950951") {
        isAdd ? handleAddItem(longString) : handleRemoveItem(longString);
      }
      typedText = "";
      return;
    }
    typedText = typedText + event.key;
  };
  useEventListener("keydown", handleKeypress);

  var Alert = () => {
    return null;
  };
  if (isAlert) {
    Alert = () => {
      return (
        <AlertDialog
          close={() => setAlert(false)}
          title={alertTitle}
          content={alertContent}
          isContent={isContent}
        />
      );
    };
  }

  return (
    <div className={classes.AddStock}>
      <br />
      <h1>Add items to stock</h1>
      <div className={classes.Cards}>
        <div onClick={handleAddButton}>
          <Card backgroundColor={"#01ACC1"} icon={"Add"} size="medium" />
        </div>
        <SizedBox width={10} />
        <Switch
          height={28}
          width={56}
          offColor="#01ACC1"
          onColor="#C10134"
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={handleSwitchChange}
          checked={!isAdd}
        />
        <SizedBox width={10} />
        <div onClick={handleRemoveButton}>
          <Card backgroundColor={"#C10134"} icon={"Remove"} size="medium" />
        </div>
      </div>
      {/* <div className={classes.RTswitch}>
          <p>Realtime validation enabled</p>
          <SizedBox width={10} />
          <Switch
            height={20}
            width={40}
            offColor="#888"
            onColor="#01ACC1"
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={this.handleRTSwitchChange}
            checked={this.state.isRT}
          />
        </div> */}
      <br />
      <MUIDataTable
        title={"Items to add"}
        data={data}
        columns={columns}
        options={options}
        className={classes.Table}
      />
      <SaveButton
        text="Save"
        click={handleSave}
        icon="saveIcon"
        backgroundColor="#01ACC1"
        color="#ffffff"
        width={200}
        height={50}
        fontSize={25}
        hoverBackground="#02C6DE"
      />
      <Alert />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default AddStock;
