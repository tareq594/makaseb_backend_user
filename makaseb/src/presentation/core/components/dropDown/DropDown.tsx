import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  MenuProps,
  Select,
  Theme,
} from "@material-ui/core";
import React from "react";
import { config } from "../../../../config";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export interface DropDownProps {
  label: string;
  labelColor: string;
  selectedColor: string;
  textColor: string;
  hoverColor: string;
  minWidth: number;
  id: string;
  defaultValue: any;
  options: any[];
  onChange: (value) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  label = "",
  id = "",
  minWidth = 120,
  labelColor,
  textColor,
  selectedColor,
  hoverColor,
  defaultValue,
  options,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue ?? "");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    onChange(event.target.value);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: minWidth,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      select: {
        minWidth: minWidth,
        background: "white",
        color: textColor ?? config.primaryColor,
        fontWeight: 200,
        borderStyle: "none",
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
      },
      label: {
        color: labelColor ?? config.primaryColor,

        "&.Mui-focused": {
          color: labelColor ?? config.primaryColor,
        },
      },
      paper: {
        borderRadius: 12,
        marginTop: 8,
      },
      list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: "white",
        "& li": {
          fontWeight: 200,
          paddingTop: 12,
          paddingBottom: 12,
        },
        "& li:hover": {
          background: hoverColor ?? config.primaryColor,
        },
        "& li.Mui-selected": {
          color: "white",
          background: selectedColor ?? config.primaryColor,
        },
        "& li.Mui-selected:hover": {
          background: selectedColor ?? config.primaryColor,
        },
      },
      icon: {
        color: textColor ?? config.primaryColor,
        right: 12,
        position: "absolute",
        userSelect: "none",
        pointerEvents: "none",
      },
    })
  );
  const classes = useStyles();

  const menuProps: Partial<MenuProps> = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return <ExpandMoreIcon className={classes.icon} />;
  };

  const menuItems = options ? (
    options.map((option) => {
      return (
        <MenuItem value={option} id={option.toString()}>
          {option.toString()}
        </MenuItem>
      );
    })
  ) : (
    <div></div>
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={id + "label"} className={classes.label}>
        {label}
      </InputLabel>
      <Select
        disableUnderline
        MenuProps={menuProps}
        IconComponent={iconComponent}
        labelId={id + "label"}
        id={id}
        value={value}
        onChange={handleChange}
        label={label}
        className={classes.select}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};
