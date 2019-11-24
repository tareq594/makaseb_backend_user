import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import axios from "../../../axios";
import classes from "./InvoiceReports.css";
import qrGif from "../../../assets/images/qrscan.gif";
import TableSetting from "./TableSettings";
import WhiteCard from "../../../components/UI/WhiteCard/WhiteCard";

import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MutanabiButton from "../../../components/UI/MutanabiButton/MutanabiButton";
import RadioButton from "../../../components/UI/RadioButton/RadioButton";
import SearchInput from "../../../components/UI/SearchInput/SearchInput";

const InvoiceReports = ({ auth }) => {
  const statusMethods = [
    {
      value: "issued",
      label: "Issued"
    },
    {
      value: "ofd",
      label: "Out for delivery"
    },
    {
      value: "delivered",
      label: "Delivered"
    },
    {
      value: "returned",
      label: "Returned"
    }
  ];
  const paymentMethods = [
    {
      value: "inAccount",
      label: "بالحساب"
    },
    {
      value: "cashOnDelivery",
      label: "نقداً عند التسليم"
    },
    {
      value: "chx",
      label: "شيك"
    }
  ];

  const [selectedStatusMethods, setSelectedStatusMethods] = useState([]);
  const [selectedSystems, setselectedSystems] = useState([]);
  const [selectedPaymentMethods, setselectedPaymentMethods] = useState([]);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isInit, setIsInit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  var typedText = "";
  const handleSearchBoxChange = event => {
    setSearchText(event.target.value);
  };

  const handleQrScan = event => {
    if (event.keyCode === 13 && typedText.includes("^")) {
      var stringArray = typedText.split("^");
      handleSearch(true, stringArray[stringArray.length - 1]);
    }
    typedText = typedText + event.key;
  };

  const handleSearch = (isQR, value) => {
    setIsLoading(true);
    if (isInit) {
      setIsInit(false);
    }
    const apiSearch = uri => {
      axios
        .get(uri)
        .then(results => {
          if (results.data.error) {
            setIsLoading(false);
            return;
          }
          setIsLoading(false);
          if (results.data[0]) {
            const newData = results.data.map(result => {
              const status = statusMethods.find(
                method => method.value == result.status
              );
              const payment = paymentMethods.find(
                method => method.value == result.paymentMethod
              );
              var object = {
                invoiceNumber: result.invoiceNumber,
                invoiceId: result.invoiceId,
                status: status ? status.label : "",
                paymentMethod: payment ? payment.label : "",
                invoiceSystem: result.invoiceSystem,
                customer: result.customer ? result.customer.name : "",
                amount: result.amount ? result.amount : "",
                IssuanceDate: result.IssuanceDate
              };
              return object;
            });
            setData(newData);
          } else {
            setData([]);
          }
        })
        .catch(err => console.log(err));
    };

    
    if (isQR) {
      apiSearch(`/invoices/search/text?text=${value}`);
      return;
    }
    if (searchText != "") {
      apiSearch(`/invoices/search/text?text=${searchText}`);
    } else {
      var queryData = {
        statuses: selectedStatusMethods,
        systems: selectedSystems,
        paymentMethods: selectedPaymentMethods
      };
      axios
        .post("/invoices/search/combined", queryData)
        .then(results => {
          if (results.data.error) {
            setIsLoading(false);
            return;
          }
          setIsLoading(false);
          if (results.data[0]) {
            const newData = results.data.map(result => {
              const status = statusMethods.find(
                method => method.value == result.status
              );
              const payment = paymentMethods.find(
                method => method.value == result.paymentMethod
              );

              var object = {
                invoiceNumber: result.invoiceNumber,
                invoiceId: result.invoiceId,
                status: status ? status.label : "",
                paymentMethod: payment ? payment.label : "",
                invoiceSystem: result.invoiceSystem,
                customer: result.customer ? result.customer.name : "",
                amount: result.amount ? result.amount : "",
                IssuanceDate: result.IssuanceDate
              };
              return object;
            });
            setData(newData);
          } else {
            setData([]);
          }
        })
        .catch(err => console.log(err));
    }
  };
  useEventListener("keydown", handleQrScan);


  const handleMethodRadioSelection = value => {
    if (selectedStatusMethods.includes(value)) {
      const index = selectedStatusMethods.findIndex(item => item == value);
      const updatedlist = [...selectedStatusMethods];
      updatedlist.splice(index, 1);
      setSelectedStatusMethods(updatedlist);
    } else {
      const updatedlist = [...selectedStatusMethods];
      updatedlist.push(value);
      setSelectedStatusMethods(updatedlist);
    }
  };
  const statusOptions = (
    <div className={classes.statusOptions}>
      <h2>Status</h2>
      <div className={classes.RadioContainer}>
        <div className={classes.RadioButtonList}>
          {statusMethods.map(method => (
            <RadioButton
              key={method.value}
              checked={selectedStatusMethods.includes(method.value)}
              handleClick={() => handleMethodRadioSelection(method.value)}
            >
              {method.label}
            </RadioButton>
          ))}
        </div>
        <div className={classes.Reset}>
          <MutanabiButton
            width={100}
            height={40}
            fontSize={14}
            click={() => setSelectedStatusMethods([])}
          >
            reset
          </MutanabiButton>
        </div>
      </div>
    </div>
  );

  const handleSystemRadioSelection = value => {
    if (selectedSystems.includes(value)) {
      const index = selectedSystems.findIndex(item => item == value);
      const updatedlist = [...selectedSystems];
      updatedlist.splice(index, 1);
      setselectedSystems(updatedlist);
    } else {
      const updatedlist = [...selectedSystems];
      updatedlist.push(value);
      setselectedSystems(updatedlist);
    }
  };

  const systemOptions = (
    <div className={classes.statusOptions}>
      <h2>System</h2>
      <div className={classes.RadioContainer}>
        <div className={classes.RadioButtonList}>
          <RadioButton
            checked={selectedSystems.includes("mersal")}
            handleClick={() => handleSystemRadioSelection("mersal")}
          >
            Mersal
          </RadioButton>
          <RadioButton
            checked={selectedSystems.includes("CT")}
            handleClick={() => handleSystemRadioSelection("CT")}
          >
            Cyborgs technology
          </RadioButton>
        </div>
        <div className={classes.Reset}>
          <MutanabiButton
            width={100}
            height={40}
            fontSize={14}
            click={() => setselectedSystems([])}
          >
            reset
          </MutanabiButton>
        </div>
      </div>
    </div>
  );

  const handlePaymentMethodRadioSelection = value => {
    if (selectedPaymentMethods.includes(value)) {
      const index = selectedPaymentMethods.findIndex(item => item == value);
      const updatedlist = [...selectedPaymentMethods];
      updatedlist.splice(index, 1);
      setselectedPaymentMethods(updatedlist);
    } else {
      const updatedlist = [...selectedPaymentMethods];
      updatedlist.push(value);
      setselectedPaymentMethods(updatedlist);
    }
  };
  const paymentOptions = (
    <div className={classes.statusOptions}>
      <h2>Payment method</h2>
      <div className={classes.RadioContainer}>
        <div className={classes.RadioButtonList}>
          {paymentMethods.map(method => (
            <RadioButton
              key={method.value}
              checked={selectedPaymentMethods.includes(method.value)}
              handleClick={() =>
                handlePaymentMethodRadioSelection(method.value)
              }
            >
              {method.label}
            </RadioButton>
          ))}
        </div>
        <div className={classes.Reset}>
          <MutanabiButton
            width={100}
            height={40}
            fontSize={14}
            click={() => setselectedPaymentMethods([])}
          >
            reset
          </MutanabiButton>
        </div>
      </div>
    </div>
  );

  const searchTable = !isInit ? (
    <MUIDataTable
      title={"Search results"}
      data={data}
      columns={TableSetting.columns}
      options={TableSetting.options}
      className={classes.Table}
    />
  ) : (
    <div className={classes.emptyState}>
      <img src={qrGif} alt="empty state" title="empty state" />
      <h2>Start searching invoices</h2>
      <p>
        Start searching invoices by above parameters, number, id, or scanning
        the QR or Barcodes of the invoices
      </p>
    </div>
  );

  return (
    <div>
      <WhiteCard>
        <h1>invoices reports</h1>
        {statusOptions}
        {systemOptions}
        {paymentOptions}
        <form
          className={classes.Form}
          onSubmit={event => {
            handleSearch();
            event.preventDefault();
          }}
        >
          <div>
            <div className={classes.SearchInput}>
              <SearchInput
                className={classes.Search}
                placeholder={`search by invoice number or id`}
                autoFocus={true}
                // handleKeyDown={inputKeyPressed}
                handleSearchBoxChange={handleSearchBoxChange}
              />
            </div>
          </div>
          <div className={classes.Reset}>
            <MutanabiButton isLoading={isLoading}>Search</MutanabiButton>
          </div>
        </form>
        {searchTable}
      </WhiteCard>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(withRouter(InvoiceReports));
