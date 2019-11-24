import React, { useState } from "react";
import classes from "./UpdateInvoiceStatus.css";
import WhiteCard from "../../../components/UI/WhiteCard/WhiteCard";
import Card from "../../../components/UI/Card/Card";
import Switch from "react-switch";
import SizedBox from "../../../components/UI/SizedBox/SizedBox";
import RadioButton from "../../../components/UI/RadioButton/RadioButton";
import Divider from "../../../components/UI/Divider/Divider";
import emptyBox from "../../../assets/images/emptyBox.svg";
import useEventListener from "@use-it/event-listener";
import axios from "../../../axios";
import InvoceCard from "../InvoiceCard/InvoiceCard";
import MutanabiButton from "../../../components/UI/MutanabiButton/MutanabiButton";

const UpdateInvoiceStatus = () => {
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
  var typedText = "";
  const [statusMethod, setStatusMethod] = useState("issued");
  const [isAdd, setIsAdd] = useState(true);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    console.log(items);
    axios.post("invoices/save", items).then(result => {
      console.log(result);
      setIsLoading(false);
      if (result.data.success) {
        alert("invoices saved successfully");
        setItems([]);
      } else {
        alert("Error occured please check internet connection and try again");
      }
    });
  };

  const handleAddItem = invoiceId => {
    const found = items.find(item => item.invoiceId == invoiceId);
    if (found) {
      return;
    }

    const newItem = {
      invoiceNumber: "",
      invoiceId: invoiceId,
      status: statusMethod,
      paymentMethod: "",
      invoiceSystem: invoiceId.substring(0, 6) == "105318" ? "ct" : "mersal",
      customer: {},
      amount: "",
      IssuanceDate: "",
      text: ""
    };
    const newItems = [...items];
    newItems.push(newItem);
    setItems(newItems);
    console.log(items);
    console.log(newItems);
  };
  const handleRemoveItem = invoiceId => {
    const found = items.findIndex(item => item.invoiceId == invoiceId);
    if (found == -1) {
      return;
    }
    const newitems = [...items];
    newitems.splice(found, 1);
    setItems(newitems);
  };

  const handleKeypress = event => {
    // console.log(event.key)
    // if enter pressed
    if (event.keyCode === 13 && typedText.includes("^")) {
      var stringArray = typedText.split("^");
      if (isAdd) {
        handleAddItem(stringArray[stringArray.length - 1]);
      } else {
        handleRemoveItem(stringArray[stringArray.length - 1]);
      }
      typedText = "";
    }
    if (event.key == "Shift") {
      return;
    }
    typedText = typedText + event.key;
  };
  useEventListener("keydown", handleKeypress);

  const handlecustomerText = (text, index) => {
    const nItems = [...items];
    nItems[index].text = text;
    setItems(nItems);
  };
  const handlePaymentMethodChange = (event, index) => {
    const nItems = [...items];
    nItems[index].paymentMethod = event.target.value;
    setItems(nItems);
  };
  const handleStatusMethodChange = (event, index) => {
    const nItems = [...items];
    nItems[index].status = event.target.value;
    setItems(nItems);
  };

  const handleSwitchChange = isAdd => {
    setIsAdd(!isAdd);
  };
  const handleAddButton = () => {
    setIsAdd(true);
  };
  const handleRemoveButton = () => {
    setIsAdd(false);
  };

  const handleInvoiceNumberChange = (event, index) => {
    const nItems = [...items];
    nItems[index].invoiceNumber = event.target.value;
    setItems(nItems);
  };
  const handleCustomerSelection = (customer, index) => {
    const nItems = [...items];
    nItems[index].customer = customer;
    setItems(nItems);
  };
  const handleAmountChange = (event, index) => {
    const nItems = [...items];
    nItems[index].amount = event.target.value;
    setItems(nItems);
  };

  const statusOptions = (
    <div className={classes.statusOptions}>
      <Divider color="black" />
      <h2>Default status</h2>
      <div className={classes.RadioButtonList}>
        <RadioButton
          checked={statusMethod === "issued"}
          handleClick={() => {
            setStatusMethod("issued");
          }}
        >
          Issued
        </RadioButton>
        <RadioButton
          checked={statusMethod === "ofd"}
          handleClick={() => {
            setStatusMethod("ofd");
          }}
        >
          Out for delivery
        </RadioButton>
        <RadioButton
          checked={statusMethod === "delivered"}
          handleClick={() => {
            setStatusMethod("delivered");
          }}
        >
          Delivered
        </RadioButton>
        <RadioButton
          checked={statusMethod === "returned"}
          handleClick={() => {
            setStatusMethod("returned");
          }}
        >
          Returned
        </RadioButton>
      </div>
      <Divider color="black" />
    </div>
  );

  const emptyState = (
    <div className={classes.emptyState}>
      <img src={emptyBox} alt="empty state" title="empty state" />
      <h2>Start adding invoices</h2>
      <p>
        Start adding invoices by scanning the QR or Barcodes of the invoices
      </p>
    </div>
  );

  const motanabiButton =
    items.length < 1 ? (
      <div></div>
    ) : (
      <div className={classes.Button}>
        <MutanabiButton isLoading={isLoading} click={handleSave}>
          Save
        </MutanabiButton>
      </div>
    );

  const ItemsComponent =
    items.length < 1 ? (
      emptyState
    ) : (
      <div className={classes.InvoicesCards}>
        <h2>Invoices</h2>
        <ul>
          {items.map((item, index) => {
            return (
              <InvoceCard
                key={item.invoiceId}
                item={item}
                index={index}
                handleInvoiceNumberChange={handleInvoiceNumberChange}
                handleCustomerSelection={handleCustomerSelection}
                handlecustomerText={handlecustomerText}
                handleAmountChange={handleAmountChange}
                handlePaymentMethodChange={handlePaymentMethodChange}
                paymentMethods={paymentMethods}
                handleStatusMethodChange={handleStatusMethodChange}
                statusMethods={statusMethods}
                items={items}
                setItems={setItems}
              ></InvoceCard>
            );
          })}
        </ul>
      </div>
    );

  return (
    <div>
      <WhiteCard key={"mathhgkjnlbvghc"}>
        <h1>Update invoices</h1>
        <br></br>
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
        <br></br>
        {statusOptions}
        {ItemsComponent}
        <br></br>
        {motanabiButton}
      </WhiteCard>
    </div>
  );
};

export default UpdateInvoiceStatus;
