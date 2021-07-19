import {
  makeStyles,
  Theme,
  createStyles,
  colors,
  Card,
  Typography,
  TextField,
  withStyles,
  Switch,
  SwitchClassKey,
  SwitchProps,
  Button,
} from "@material-ui/core";
import { Delete, Save, Widgets } from "@material-ui/icons";
import * as React from "react";
import { SearchField } from "../../core/components/searchField/SearchField";
import { SizedBox } from "../../core/components/sizedBox/sizedBox";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCreateUser,
  editFirstName,
  editLastName,
  editEmailAddress,
  editiSEmailNotification,
  editSelectedDevices,
  editiSSmsNotification,
  editPhoneNumber,
  editPhoneAlternativeNumber,
  editAddress,
  editPassword,
  addDevice,
  editDeviceSearchtext,
  save,
  removeDevices,
} from "../../../application/create_user/create_user_slice";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const columns: GridColDef[] = [
  { field: "imei", headerName: "imei", width: 200 },
];

export interface ICreateUserProps {}

export default function CreateUser(props: ICreateUserProps) {
  const createUserState = useSelector(selectCreateUser);
  const dispatch = useDispatch();

  var rows = createUserState.devicesImeis.map((imei, index) => {
    return { id: index, imei: imei };
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginInline: theme.spacing(6),
      },
      title: {
        /*         display: "flex",
        alignItems: "flex-start",
 */
      },
      card: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        paddingInline: "100px",
        margin: "auto",
        width: "100%",
      },
      textField: {
        minWidth: "220px",
      },
      row: {
        margin: 10,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
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
      switch: {
        display: "flex",
        alignItems: "center",
      },
      searchField: {
        display: "flex",
        justifyContent: "center",
      },
      button: {
        margin: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();

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

  const title = (
    <div className={classes.title}>
      <Typography variant="body2" color="inherit">
        User Data
      </Typography>
    </div>
  );

  const firstRow = (
    <div className={classes.row}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={createUserState.user.firstName}
          onChange={(event) => {
            dispatch(editFirstName({ name: event.target.value }));
          }}
          id="firstName"
          label="First Name"
          name="First Name"
          autoFocus
        />
      </div>
      <SizedBox width={50}></SizedBox>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="Last Name"
          value={createUserState.user.lastName}
          onChange={(event) => {
            dispatch(editLastName({ name: event.target.value }));
          }}
        />
      </div>
    </div>
  );

  const secondRow = (
    <div className={classes.row}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="emailAdress"
          label="Email Address"
          value={createUserState.user.email}
          onChange={(event) => {
            dispatch(editEmailAddress({ email: event.target.value }));
          }}
          name="Email"
        />
      </div>
      <SizedBox width={50}></SizedBox>
      <div className={classes.switch}>
        <IOSSwitch
          onChange={(val, checked) => {
            dispatch(
              editiSEmailNotification({
                isNotification: checked,
              })
            );
          }}
          checked={createUserState.user.isEmailNotification}
        ></IOSSwitch>
        <SizedBox width={10}></SizedBox>

        <Typography>Email Notifications</Typography>
      </div>
    </div>
  );

  const thirdRow = (
    <div className={classes.row}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="Phone Number"
          value={createUserState.user.phoneNumber}
          onChange={(event) => {
            dispatch(editPhoneNumber({ number: event.target.value }));
          }}
        />
      </div>
      <SizedBox width={50}></SizedBox>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="alternativePhoneNumber"
          label="Alternative Phone Number"
          name="Alternative Phone Number"
          value={createUserState.user.alternativePhoneNumber}
          onChange={(event) => {
            dispatch(
              editPhoneAlternativeNumber({ number: event.target.value })
            );
          }}
        />
      </div>
      <SizedBox width={50}></SizedBox>
      <div className={classes.switch}>
        <IOSSwitch
          onChange={(val, checked) => {
            dispatch(
              editiSSmsNotification({
                isNotification: checked,
              })
            );
          }}
          checked={createUserState.user.isSmsNotification}
        ></IOSSwitch>
        <SizedBox width={10}></SizedBox>
        <Typography>sms Notifications</Typography>
      </div>
    </div>
  );

  const fourthRow = (
    <div className={classes.row}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="Address"
          value={createUserState.user.address}
          onChange={(event) => {
            dispatch(editAddress({ address: event.target.value }));
          }}
        />
      </div>
    </div>
  );

  const fifthRow = (
    <div className={classes.row}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="Password"
          value={createUserState.user.password}
          onChange={(event) => {
            dispatch(editPassword({ password: event.target.value }));
          }}
        />
      </div>
    </div>
  );

  const handleRowSelection = (e) => {
    dispatch(editSelectedDevices({ devices: e.selectionModel }));
  };

  return (
    <div>
      <div className={classes.root}>
        <form>
          <Card className={classes.card}>
            {title}
            {firstRow}
            {secondRow}
            {thirdRow}
            {fourthRow}
            {fifthRow}
          </Card>
          <h4>Scan QR codes to add a device or search by the following</h4>
          <div className={classes.searchField}>
            <SearchField
              textvalue={createUserState.deviceSearchText}
              onChange={(text) => {
                dispatch(editDeviceSearchtext({ text: text }));
              }}
              onSubmit={(text) => {
                console.log(text);
                dispatch(addDevice(text));
              }}
            ></SearchField>
          </div>
          <SizedBox height={20}></SizedBox>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onSelectionModelChange={handleRowSelection}
            />
          </div>
          <SizedBox height={5}></SizedBox>
          <Button
            variant="contained"
            color="inherit"
            className={classes.button}
            startIcon={<Delete />}
            size="large"
            onClick={() => {
              dispatch(removeDevices());
            }}
          >
            Delete selected Devices
          </Button>
          <SizedBox height={10}></SizedBox>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<Save />}
            size="large"
            onClick={() => {
              dispatch(save());
            }}
          >
            Create user and save devices
          </Button>
        </form>
      </div>
    </div>
  );
}
