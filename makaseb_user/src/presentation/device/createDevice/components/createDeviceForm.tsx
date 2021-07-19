import {
  Card,
  colors,
  createStyles,
  Icon,
  makeStyles,
  Switch,
  SwitchClassKey,
  SwitchProps,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { Gavel, VolumeUp } from "@material-ui/icons";
import * as React from "react";
import { ChangeEvent } from "react";

interface ICreateDeviceFormProps {
  onIMEIChange?: (text: string) => void;
  onDeviceNameChange?: (text: string) => void;
  onDeviceTypeToggle?: (toggle: boolean) => void;
  onDepthChange?: (text) => void;
}
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

export const CreateDeviceForm: React.FunctionComponent<ICreateDeviceFormProps> = ({
  onIMEIChange = () => {},
  onDeviceNameChange = () => {},
  onDeviceTypeToggle = () => {},
  onDepthChange = () => {},
  ...props
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: 10,
        marginInline: theme.spacing(6),
      },
      card: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
      },
      field: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
      },
      textField: {
        minWidth: "220px",
      },
      row: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      },
      icon: {
        fontSize: 50,
      },
      awameh: {
        color: colors.blue[700],
      },
      ultrasonic: {
        color: colors.red[700],
      },
    })
  );
  const classes = useStyles();

  const handleIMEIChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log("change");
    onIMEIChange(event.target.value);
  };

  const handleNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    onDeviceNameChange(event.target.value);
  };

  const handleDepthChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    onDepthChange(event.target.value);
  };

  const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        "&$checked": {
          transform: "translateX(16px)",
          color: theme.palette.common.white,
          "& + $track": {
            backgroundColor: "#52d869",
            opacity: 1,
            border: "none",
          },
        },
        "&$focusVisible $thumb": {
          color: "#52d869",
          border: "6px solid #fff",
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
      },
      checked: {},
      focusVisible: {},
    })
  )(({ classes, ...props }: Props) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const fields = (
    <div className={classes.field}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="imei"
          label="IMEI"
          name="imei"
          onChange={handleIMEIChange}
        />
      </div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="deviceName"
        label="Device Name"
        name="Device Name"
        onChange={handleNameChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="deviceDepth"
        label="Tank depth"
        name="Tank depth"
        onChange={handleDepthChange}
      />
    </div>
  );

  const switchFields = (
    <div className={classes.row}>
      <div className={classes.ultrasonic}>
        <Icon color="inherit" className={classes.icon}>
          <VolumeUp fontSize="inherit" />
        </Icon>
      </div>
      <IOSSwitch
        onChange={(event) => {
          onDeviceTypeToggle(event.target.checked);
        }}
      ></IOSSwitch>
      <div className={classes.awameh} color="red">
        <Icon color="inherit" className={classes.icon}>
          <Gavel fontSize="inherit" />
        </Icon>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <form>
        <Card className={classes.card}>
          {fields}
          {switchFields}
        </Card>
      </form>
    </div>
  );
};

export default CreateDeviceForm;
