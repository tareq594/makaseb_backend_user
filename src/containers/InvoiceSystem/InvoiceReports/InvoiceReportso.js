import React, { useState, useEffect } from "react";
import classes from "./InvoiceReports.css";
import WhiteCard from "../../../components/UI/WhiteCard/WhiteCard";
import RadioButton from "../../../components/UI/RadioButton/RadioButton";
import Divider from "../../../components/UI/Divider/Divider";
import SearchInput from "../../../components/UI/SearchInput/SearchInput";
import emptyBox from "../../../assets/images/emptyBox.svg";
import qrGif from "../../../assets/images/qrscan.gif";
import MutanabiButton from "../../../components/UI/MutanabiButton/MutanabiButton";
import useEventListener from "@use-it/event-listener";
import MUIDataTable from "mui-datatables";
import TableSetting from "./TableSettings";
import axios from "../../../axios";

const InvoiceReportso = () => {
  var [searchInputValue, setsearchInputValue] = useState("");
  var typedText = "";
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

  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("cash");
  const [statusMethod, setStatusMethod] = useState("issued");
  const [selectedStatusMethods, setSelectedStatusMethods] = useState([]);
  const [selectedSystems, setselectedSystems] = useState([]);
  const [selectedPaymentMethods, setselectedPaymentMethods] = useState([]);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([
    {
      invoiceNumber: 19
    }
  ]);

  const tableData = [
    {
      invoiceNumber: 19
    }
  ];

  useEffect(() => {
    console.log(data);
  }, []);

  const handleKeypress = event => {
    if (event.keyCode === 13 && typedText.includes("^")) {
      var stringArray = typedText.split("^");
      typedText = "";
    }
    if (event.key == "Shift") {
      return;
    }
    typedText = typedText + event.key;
  };
  useEventListener("keydown", handleKeypress);

  const handlePaymentMethodChange = event => {
    setpaymentMethod(event.target.value);
  };
  const handleStatusMethodChange = event => {
    setStatusMethod(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchText);
    if (searchText !== "") {
      console.log("SHO");
      axios.get(`/invoices/search/text?text=${searchText}`).then(results => {
        console.log("NOO");
        console.log(results);
        const newData = {
          invoiceNumber: results.data.invoiceNumber
        };
        setItems([newData]);
        console.log(items);
      });
    }
  };

  const handleSearchButton = event => {
    event.preventDefault();
    setData(1);

    console.log(data);
    console.log(searchText);
    if (searchText !== "") {
      console.log("SHO");
      axios.get(`/invoices/search/text?text=${searchText}`).then(results => {
        console.log("NOO");
        console.log(results);

        const tableData = [
          {
            invoiceNumber: 25
          }
        ];
        setData(tableData)
      
        // setItems([{ OK: 1 }]);
        console.log(items);
      });
    }
    // handleSearch()
  };

  const inputKeyPressed = event => {
    if (event.keyCode === 13 && typedText.includes("^")) {
      return;
    }
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearchBoxChange = event => {
    setSearchText(event.target.value);
  };

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
      <div className={classes.RadioButtonList}>
        <RadioButton
          checked={selectedSystems.includes("mersal")}
          handleClick={() => handleSystemRadioSelection("mersal")}
        >
          Mersal
        </RadioButton>
        <RadioButton
          checked={selectedSystems.includes("ct")}
          handleClick={() => handleSystemRadioSelection("ct")}
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
      <div className={classes.RadioButtonList}>
        {paymentMethods.map(method => (
          <RadioButton
            key={method.value}
            checked={selectedPaymentMethods.includes(method.value)}
            handleClick={() => handlePaymentMethodRadioSelection(method.value)}
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
  );

  const searchTable =
    items.length != "KOKO" ? (
      <MUIDataTable
        title={"Search results"}
        data={tableData}
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
        <form onSubmit={handleSearchButton}>
          <div>
            <div className={classes.SearchInput}>
              <SearchInput
                className={classes.Search}
                placeholder={`search by invoice number or id`}
                autoFocus={true}
                handleKeyDown={inputKeyPressed}
                handleSearchBoxChange={handleSearchBoxChange}
              />
            </div>
          </div>
          <div className={classes.Reset}>
            <MutanabiButton>Search</MutanabiButton>
          </div>
        </form>
        {searchTable}
      </WhiteCard>
    </div>
  );
};

export default InvoiceReportso;
