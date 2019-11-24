import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import axios from "../../axios";
import classes from "./ItemSearch.css";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import RadioButton from "../../components/UI/RadioButton/RadioButton";
import Button from "../../components/UI/Buttons/SaveButton/SaveButton";
import MUIDataTable from "mui-datatables";
import TableSetting from "./TableSettings";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import qrGif from "../../assets/images/qrscan.gif";

const ItemSearch = props => {
  // var searchInputValue = "";
  var [searchInputValue, setsearchInputValue] = useState("");
  var typedText = "";
  const [selectedValue, setValue] = useState("p");

  const today = new Date();
  const dateToString = date => {
    const stringDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return stringDate;
  };

  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(dateToString(today));
  const [toDate, setToDate] = useState(dateToString(today));

  const handleQrScan = event => {
    if (event.keyCode === 13 && typedText.length >= 39) {
      var longString = typedText.substring(typedText.length - 39);
      var GTIN = longString.substring(2, 15);
      if (GTIN === "8033638950951") {
        handleChange("qr");
        handleSearch(longString, true);
      }
      typedText = "";
      return;
    }
    typedText = typedText + event.key;
  };
  useEventListener("keydown", handleQrScan);

  const handleSearchButton = event => {
    event.preventDefault();
    if (selectedValue === "d" || selectedValue === "e") {
      handleSearch();
    } else {
      handleSearch(searchInputValue);
    }
  };

  const handleChange = newVal => {
    switch (newVal) {
      case "p":
        setValue("p");
        break;
      case "qr":
        setValue("qr");
        break;
      case "a":
        setValue("a");
        break;
      case "b":
        setValue("b");
        break;
      case "c":
        setValue("c");
        break;
      case "d":
        setValue("d");
        break;
      case "e":
        setValue("e");
        break;
    }
  };
  var inputPlaceHolderString = () => {
    switch (selectedValue) {
      case "p":
        return "Bill number";
      case "qr":
        return "Scan qr code";
      case "a":
        return "Serial number";
      case "b":
        return "Lot number";
      case "c":
        return "Full item number";
      case "d":
        return "Selling date";
      case "e":
        return "Stock entry date";
    }
  };
  const inputKeyPressed = event => {
    if (event.keyCode === 13 && typedText.length >= 39) {
      var longString = typedText.substring(typedText.length - 39);
      var GTIN = longString.substring(2, 15);
      if (GTIN === "8033638950951" && selectedValue !== "c") {
        return;
      }
    }
    if (event.keyCode === 13) {
      handleSearch(event.target.value);
    }
  };
  const handleSearchBoxChange = event => {
    setsearchInputValue(event.target.value);
  };

  const fromDatePickerChangeHandler = event => {
    setFromDate(event.target.value);
  };
  const toDatePickerChangeHandler = event => {
    setToDate(event.target.value);
  };

  const handleSearch = (value, isQR) => {
    const apiSearch = uri => {
      axios
        .get(uri)
        .then(results => {
          console.log(results);
          const newData = results.data.map(result => {
            var object = {
              GTIN: result.GTIN,
              LOT: result.LOT,
              QR: result.QR,
              SN: result.SN,
              expDate: result.expDate,
              selldate: result.buyDate,
              customer: result.customer?result.customer.id.name:"",
              stockEntryDate: result.stockEntryDate,
              billNumber: result.billNumber
            };
            console.log(object);
            return object;
          });
          setData(newData);
        })
        .catch(err => console.log(err));
    };
    if (isQR) {
      apiSearch(`/search/QR?QR=${value}`);
      return;
    }

    switch (selectedValue) {
      case "p":
        apiSearch(`/search/billNumber?bn=${value}`);
        break;
      case "qr":
        apiSearch(`/search/QR?QR=${value}`);
        break;
      case "a":
        apiSearch(`/search/serialNumber?sn=${value}`);
        break;
      case "b":
        apiSearch(`/search/lotNumber?ln=${value}`);
        break;
      case "c":
        apiSearch(`/search/QR?QR=${value}`);
        break;
      case "d":
        apiSearch(`/search/sellingDate?from=${fromDate}&to=${toDate}`);
        break;
      case "e":
        apiSearch(`/search/stockEntryDate?from=${fromDate}&to=${toDate}`);
        break;
    }
  };

  let searchBox =
    selectedValue !== "d" && selectedValue !== "e" ? (
      <div className={classes.SearchInput}>
        <SearchInput
          className={classes.Search}
          placeholder={`Search by ${inputPlaceHolderString()}`}
          autoFocus={true}
          handleKeyDown={inputKeyPressed}
          handleSearchBoxChange={handleSearchBoxChange}
        />
      </div>
    ) : (
      <div></div>
    );

  let dateRangePickers =
    selectedValue === "d" || selectedValue === "e" ? (
      <div className={classes.DatePickers}>
        <DatePicker
          min="1899-01-01"
          max={toDate}
          text="From"
          onChange={fromDatePickerChangeHandler}
        />
        <DatePicker
          min={fromDate}
          max={dateToString(today)}
          text="To"
          onChange={toDatePickerChangeHandler}
        />
      </div>
    ) : (
      <div></div>
    );

  return (
    <div className={classes.Validator}>
      <h2>Scan QR or search by one of the followings</h2>
      <div className={classes.QR}>
        <img src={qrGif} alt="scan qr"></img>
      </div>
      <div className={classes.RadioButtonList}>
        <RadioButton
          checked={selectedValue === "p"}
          handleClick={() => handleChange("p")}
        >
          Bill number
        </RadioButton>
        <RadioButton
          checked={selectedValue === "a"}
          handleClick={() => handleChange("a")}
        >
          Serial number
        </RadioButton>
        <RadioButton
          checked={selectedValue === "b"}
          handleClick={() => handleChange("b")}
        >
          Lot number
        </RadioButton>

        <RadioButton
          checked={selectedValue === "c"}
          handleClick={() => handleChange("c")}
        >
          Full item number
        </RadioButton>

        <RadioButton
          checked={selectedValue === "d"}
          handleClick={() => handleChange("d")}
        >
          Selling date
        </RadioButton>
        <RadioButton
          checked={selectedValue === "e"}
          handleClick={() => handleChange("e")}
        >
          Stock entry date
        </RadioButton>
      </div>
      {searchBox}
      {dateRangePickers}
      <div className={classes.Button}>
        <Button
          text="Search"
          icon="searchIcon"
          backgroundColor="#01ACC1"
          color="#ffffff"
          width={200}
          height={50}
          fontSize={20}
          hoverBackground="#02C6DE"
          click={handleSearchButton}
        ></Button>
      </div>

      <MUIDataTable
        title={"Search results"}
        data={data}
        columns={TableSetting.columns}
        options={TableSetting.options}
        className={classes.Table}
      />
    </div>
  );
};

export default ItemSearch;
