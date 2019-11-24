import React, { useState, useEffect } from "react";
import classes from "./InvoiceCard.css";
import WhiteCard from "../../../components/UI/WhiteCard/WhiteCard";
import TitledElement from "../../../components/UI/titledElement/titledElement";
import TextField from "@material-ui/core/TextField";
import SuggestionBox from "../../../components/UI/SuggestionBox/SuggestionBox";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "../../../axios";

const InvoiceCard = ({
  item,
  index,
  handleInvoiceNumberChange,
  handleCustomerSelection,
  handlecustomerText,
  handleAmountChange,
  handlePaymentMethodChange,
  paymentMethods,
  handleStatusMethodChange,
  statusMethods,
  items,
  setItems
}) => {
  useEffect(() => {
    axios.get(`/invoices/invoice?invoiceId=${item.invoiceId}`).then(result => {
      console.log(result);
      console.log(items);
      if (result.data.notFound == 1) {
        return;
      }

      var updatedItems = [...items];
      var foundIndex;
      console.log(updatedItems);
      updatedItems.forEach((item, index) => {
        //
        console.log("next");
        console.log(item.invoiceId);
        console.log(result.data.result.invoiceId);
        if (item.invoiceId === result.data.result.invoiceId) {
          foundIndex = index;
          return;
        }
      });
      console.log(result.data.result);
      const updatedItem = {
        invoiceNumber: result.data.result.invoiceNumber?result.data.result.invoiceNumber:"",
        invoiceId: item.invoiceId,
        status: updatedItems[foundIndex].status,
        paymentMethod: result.data.result.paymentMethod?result.data.result.paymentMethod:"",
        invoiceSystem:
          item.invoiceId.substring(0, 6) == "105318" ? "ct" : "mersal",
        customer: result.data.result.customer,
        amount: result.data.result.amount?result.data.result.amount:"",
        IssuanceDate: result.data.result.IssuanceDate?result.data.result.IssuanceDate:new Date(),
        text: result.data.result.customer?result.data.result.customer.name:""
      };
      updatedItems[foundIndex] = updatedItem;
      setItems(updatedItems);
    });
  }, []);

  return (
    <div>
      <WhiteCard>
        <div className={classes.InvoicesCard}>
          <div className={classes.number}>
            <p>{index + 1}</p>
          </div>
          <TitledElement title="ID" subtitle={item.invoiceId}></TitledElement>
          <TitledElement title="Invoice no">
            <TextField
              id="standard-required"
              label="Invoice number"
              margin="normal"
              type="number"
              required
              autoComplete="off"
              value={item.invoiceNumber}
              onChange={event => handleInvoiceNumberChange(event, index)}
            />
          </TitledElement>

          <TitledElement title="Customer">
            <SuggestionBox
            id={`box${item.invoiceId}`}
              onCustomerSelection={customer =>
                handleCustomerSelection(customer, index)
              }
              text={item.text}
              setText={text => handlecustomerText(text, index)}
            ></SuggestionBox>
          </TitledElement>

          <TitledElement title="Amount">
            <TextField
              id="standard-required-Amount"
              label="Amount"
              margin="normal"
              className={classes.SubTextField}
              onChange={event => handleAmountChange(event, index)}
              value={item.amount}
              type="number"
              autoComplete="off"
            />
          </TitledElement>
          <TitledElement title="Payment method">
            <TextField
              id="standard-required-Payment"
              select
              label="Payment method"
              margin="normal"
              type="text"
              className={classes.SubTextField}
              required
              value={item.paymentMethod}
              onChange={event => handlePaymentMethodChange(event, index)}
              helperText="Please select payment method"
              //   onChange={handleCityInput}
            >
              {paymentMethods.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </TitledElement>

          <TitledElement title="Invoice status">
            <TextField
              id="standard-required"
              select
              label="Invoice status"
              margin="normal"
              type="number"
              className={classes.SubTextField}
            //   required
              value={item.status}
              onChange={event => handleStatusMethodChange(event, index)}
              helperText="Please select invoice status"
              //   onChange={handleCityInput}
            >
              {statusMethods.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </TitledElement>
        </div>
      </WhiteCard>
    </div>
  );
};

export default InvoiceCard;
