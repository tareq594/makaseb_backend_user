import React, { useState, useEffect } from "react";
import useEventListener from '@use-it/event-listener';
import axios from "../../../axios";
import sugar from "sugar";
import AlertDialog from "../../../components/UI/Alert/Alert";
import classes from "./CustomerRemoveStock.css"
import Card from "../../../components/UI/Card/Card"
import SizedBox from "../../../components/UI/SizedBox/SizedBox"
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import SaveButton from "../../../components/UI/Buttons/SaveButton/SaveButton";
import Switch from "react-switch";
import MUIDataTable from "mui-datatables";
import TableSetting from "../../../tableSettings"

const CustomerRemoveStock = props => {
  const [contactData, setContactdata] = useState([]);
  const [data,setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  var typedText = "";
  const id = props.history.location.pathname.split("/")[2];

  const handleLoadingSpinner = loading => {
    setLoading(loading);
  };
  const handleSwitchChange = (isAdd) => {
    setIsAdd(!isAdd)
}     
  const handleAddButton = () => {
    setIsAdd(true)
  };
  const handleRemoveButton = () => {
    setIsAdd(false)
  };

  const handleRemoveItem =(value)=>{
    const updatedData = [...data];
    sugar.Array.remove(updatedData, function(el) {
      return el.QR === value;
    });
    setData(updatedData)
  }

  const handleAddItem = (value)=>{
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
    // to do  ...
    const GTIN = sub(2, 15);
    const SN = sub(34, 39);
    const AddItem = () => {
      const extracted = {
        QR: value,
        GTIN: GTIN,
        LOT: sub(17, 24),
        expDate: ["20" + sub(26, 28), sub(28, 30), sub(30, 32)].join("-"),
        SN: SN
      };
      const updatedData = [...data];
      updatedData.push(extracted);
      setData(updatedData)
    };
    AddItem()
  }



  const handleSave = () => {
    console.log("save pressed");
    handleLoadingSpinner(true);
    axios
      .post(`/customer/:${id}/stockremove`, data)
      .then((result, error) => {
        handleLoadingSpinner(false);
        if (error) {
          return;
        }
        console.log(result);
        setAlertTitle("Items removed succefully from the customer's stock.")
        setIsContent(false)
        setData([])
        setIsAlert(true)
      })
      .catch(err => {
        setAlertTitle("Error. something went wrong")
        setIsContent(false)
        setIsAlert(true)
      });
  };

  const handleKeypress =(event)=>{
    // if enter pressed
    if (event.keyCode === 13 && typedText.length >= 39) {
      var longString = typedText.substring(typedText.length - 39);
      var GTIN = longString.substring(2, 15);
      if (GTIN === "8033638950951") {
        isAdd
          ? handleAddItem(longString)
          : handleRemoveItem(longString);
      }
      typedText = "";
      return;
    }
   typedText = typedText + event.key;
  }

  useEventListener("keydown",handleKeypress)
  useEffect(() => {
    console.log(id);
    axios.get(`/customer/${id}`).then(res => setContactdata(res.data));
  }, []);

  var Alert = () => {
    return null;
  };
  if (isAlert) {
    Alert = () => {
      return (
        <AlertDialog
          close={() => setIsAlert(false)}
          title={alertTitle}
          content={alertContent}
          isContent={isContent}
        />
      );
    };
  }

  return (
    
    <div className={classes.AddStock}>
        <h1>Remove items from {contactData.name ? `${contactData.name}'s` : "....."} stock</h1>
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
        <br />
        <MUIDataTable
          title={"Items to remove"}
          data={data}
          columns={TableSetting.columns}
          options={TableSetting.options}
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
export default CustomerRemoveStock;
