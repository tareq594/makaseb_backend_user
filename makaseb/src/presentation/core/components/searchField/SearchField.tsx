import {
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { ChangeEvent } from "react";

export interface SearchFieldProps {
  placeHolder: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeHolder = "",
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue ?? "");

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
    })
  );

  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log(event.target.value);
    if (event.currentTarget.onkeyup) {
      console.log("enter");
    }
  };

  return (
    <div>
      <Paper
        component="form"
        className={classes.root}
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <InputBase
          className={classes.input}
          placeholder={placeHolder}
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => {
            console.log("prevent");
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
