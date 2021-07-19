import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Add, Save } from "@material-ui/icons";
import * as React from "react";
import { SizedBox } from "../../core/components/sizedBox/sizedBox";
import CreateDeviceForm from "./components/createDeviceForm";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCreateDevice,
  addDevice,
  editDeviceName,
  editDeviceIMEI,
  save,
  editDeviceType,
  editTankDepth,
} from "../../../application/create_device/create_device_slice";
import { DeviceType } from "../../../models/device";

interface ICreateDeviceProps {}

const CreateDevice: React.FunctionComponent<ICreateDeviceProps> = (props) => {
  const createDevicesState = useSelector(selectCreateDevice);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      title: {
        display: "flex",
        margin: 18,
      },
      button: {
        margin: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();
  const title = (
    <div className={classes.title}>
      <Typography variant="h5" color="primary">
        Create New Device
      </Typography>
    </div>
  );

  const devices = createDevicesState.devices.map((device, index) => {
    return (
      <CreateDeviceForm
        key={device.id}
        onDeviceNameChange={(name) => {
          dispatch(editDeviceName({ name, index }));
        }}
        onIMEIChange={(imei) => {
          dispatch(editDeviceIMEI({ imei, index }));
        }}
        onDeviceTypeToggle={(toggle) => {
          var type = toggle ? DeviceType.Floating : DeviceType.Ultrasound;
          dispatch(editDeviceType({ type, index }));
        }}
        onDepthChange={(depth) => {
          dispatch(editTankDepth({ depth, index }));
        }}
      ></CreateDeviceForm>
    );
  });

  return (
    <div>
      {title}
      {devices}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<Add />}
        size="large"
        onClick={() => {
          dispatch(addDevice());
        }}
      >
        New Device
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
        Save
      </Button>
    </div>
  );
};

export default CreateDevice;
