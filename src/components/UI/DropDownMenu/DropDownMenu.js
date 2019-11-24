import React, { useState } from "react";
import classes from "./DropDownMenu.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

const options = [
  { value: "chocolate", label: "Chocolate", index: 0 },
  { value: "strawberry", label: "Strawberry", index: 1 },
  { value: "vanilla", label: "Vanilla", index: 2 }
];

const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

// const classes = useStyles();

const DropDownMenu = () => {
  const [selectedOption, setOption] = useState(null);

//   const handleChange = selectedOption => {
//     console.log(selectedOption);
//     setOption(selectedOption);
//   };
const [currency, setCurrency] = useState("EUR");

const handleChange = event => {
  setCurrency(event.target.value);
};


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected || state.isFocused ? "white" : "black",
      padding: 20
    })
  };
  return (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        className={classes.DropDownMenu}
        value={currency}
        onChange={handleChange}
        helperText="Please select your currency"
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default DropDownMenu;
