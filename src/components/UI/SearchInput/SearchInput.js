import React from "react";
import classes from "./SearchInput.css";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";


const SearchInput = props => {
  return (
    <Paper className={classes.Paper}>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <Input
        placeholder={props.placeholder}
        className={classes.Input}
        inputProps={{
          "aria-label": "description",
          autoFocus: props.autoFocus
        }}
        onChange={props.handleSearchBoxChange}
        onKeyDown={props.handleKeyDown}
      />
    </Paper>
  );
};
export default SearchInput
