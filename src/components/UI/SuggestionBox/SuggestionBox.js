import React, { useState } from "react";
import classes from "./SuggestionBox.css";
import TextField from "@material-ui/core/TextField";
import axios from "../../../axios";

const SuggestionBox = ({ onCustomerSelection, text, setText, disabled ,id}) => {
  const [customers, setCustomers] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  var timer = null;
  const action = val => {
    setIsLoading(true);
    axios
      .get(`/customer/search?text=${val}`)
      .then(res => {
        setIsLoading(false);
        setCustomers(res.data.slice(0, 5));
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleSearchBoxChange = event => {
    const val = event.target.value;
    setText(val);
    setIsEmpty(val == "");
    clearTimeout(timer);
    timer = setTimeout(() => action(val), 400);
  };

  const onFocus = () => {
    const box = document.getElementById(id);
    box.classList.add(classes.isOpen);
  };
  const onDisFocus = () => {
    setIsLoading(false);
    setTimeout(() => {
      const box = document.getElementById(id);
      box.classList.remove(classes.isOpen);
    }, 300);
  };

  const handleCustomerClick = customer => {
    setTimeout(() => {
      setText(customer.name);
      onCustomerSelection(customer);
    }, 10);
  };
  var customersList = [];
  customersList = isLoading ? (
    <p>Loading...</p>
  ) : isEmpty ? (
    <p>Search by name, city, or mobile number</p>
  ) : customers.length == 0 ? (
    <p>No results</p>
  ) : (
    customers.map(customer => {
      return (
        <li key={customer.id}>
          <a
            className={classes.Option}
            onClick={() => handleCustomerClick(customer)}
          >
            {customer.name}
          </a>
        </li>
      );
    })
  );
  return (
    <div className={classes.SuggestionsBox}>
      <TextField
        disabled={disabled}
        value={text}
        onFocus={onFocus}
        onBlur={onDisFocus}
        id="standard-required"
        label="Customer"
        margin="normal"
        className={classes.SuggestionsBoxTextField}
        autoComplete="off"
        onChange={handleSearchBoxChange}
        type="text"
      />
      <div id={id} className={classes.Box}>
        <ul>{customersList}</ul>
      </div>
    </div>
  );
};

export default SuggestionBox;
