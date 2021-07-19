import {
  Card,
  Icon,
  IconButton,
  makeStyles,
  Typography,
  colors,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { SizedBox } from "../sizedBox/sizedBox";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BatteryChargingFullOutlinedIcon from "@material-ui/icons/BatteryChargingFullOutlined";
import OpacityIcon from "@material-ui/icons/Opacity";
import { IconedText } from "../iconedText/IconedText";
import { DeviceType } from "../../../../models/device";
import { Gavel } from "@material-ui/icons";

export interface DeviceCardProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  avatarRadius?: number;
  tankLevel: number;
  type: DeviceType;
  userName?: string;
  deviceName: string;
  address: string;
  mobileNumber?: string;
  imei: string;
  lastUpdated: string;
  batteryLevel: number;
  onEdit?: () => {};
  onClick?: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  width = 350,
  height = 150,
  borderRadius = 20,
  avatarRadius = 100,
  tankLevel = 0,
  onEdit,
  userName,
  deviceName,
  address,
  type,
  mobileNumber,
  imei,
  onClick = () => {},
  lastUpdated = new Date().toLocaleDateString,
  batteryLevel = 100,
}) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      width: width,
      /*       height: height,
       */ backgroundColor: "white",
      borderRadius: borderRadius,
      /*       position: "absolute",
       */ marginTop: avatarRadius / 2,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      marginTop: avatarRadius / 2 - (onEdit == undefined ? 0 : 45),
      paddingInline: 12,
    },
    avatar: {
      display: "flex",
      position: "absolute",
      borderRadius: avatarRadius,
      width: avatarRadius,
      height: avatarRadius,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
    editButton: {
      display: "flex",
      flexDirection: "row-reverse",
      paddingInline: 12,
    },
    userName: {
      display: "flex",
      justifyContent: "center",
    },
    deviceName: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "red",
    },
    row: {
      display: "flex",
      justifyContent: "space-around",
    },
    footer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      backgroundColor: colors.green[500],
      color: "white",
      fontSize: 55,
    },
    battery: {
      transform: "rotate(90deg)",
    },
  });
  const classes = useStyles();

  const editButton =
    onEdit == undefined ? (
      <div></div>
    ) : (
      <div className={classes.editButton}>
        <IconButton aria-label="edit" size="medium" color="primary">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </div>
    );

  const userNameSection = (
    <div className={classes.userName}>
      <Typography variant="h6" gutterBottom color="primary">
        {userName ?? "not assigned"}
      </Typography>
    </div>
  );

  const deviceIcon =
    type == DeviceType.Ultrasound ? (
      <Icon color="inherit">
        <VolumeUpIcon fontSize="inherit" />
      </Icon>
    ) : (
      <Icon color="inherit">
        <Gavel fontSize="inherit" />
      </Icon>
    );
  const deviceNameSection = (
    <div className={classes.deviceName}>
      {deviceIcon}
      <SizedBox width={8}></SizedBox>
      <Typography variant="h6" gutterBottom color="textSecondary">
        {deviceName}
      </Typography>
    </div>
  );

  const adressRow = address ? (
    <div>
      <IconedText text={address} iconColor="pink">
        <HomeIcon />
      </IconedText>
    </div>
  ) : (
    <div></div>
  );

  const mobileRow = mobileNumber ? (
    <div>
      <IconedText text={mobileNumber}>
        <CallIcon />
      </IconedText>
    </div>
  ) : (
    <div></div>
  );

  const firstRow = (
    <div className={classes.row}>
      {adressRow}
      {mobileRow}
    </div>
  );

  const secondRow = (
    <div className={classes.row}>
      <IconedText text={imei} iconColor="blue">
        <Typography variant="subtitle2" gutterBottom color="inherit">
          IMEI:
        </Typography>
      </IconedText>
      <IconedText
        iconColor="green"
        text={lastUpdated.toString()}
        /* {
          lastUpdated.getDay().toString() +
          "/" +
          lastUpdated.getMonth().toString() +
          "/" +
          lastUpdated.getFullYear().toString() +
          "-" +
          lastUpdated.getHours().toString() +
          ":" +
          lastUpdated.getMinutes().toString()
        } */
      >
        <ScheduleIcon />
      </IconedText>
    </div>
  );

  const footer = (
    <div className={classes.footer}>
      <Icon color="inherit" fontSize="inherit">
        <BatteryChargingFullOutlinedIcon
          fontSize="inherit"
          className={classes.battery}
        />
      </Icon>
      <SizedBox width={8}></SizedBox>
      <Typography variant="h5" gutterBottom color="inherit">
        {batteryLevel + "%"}
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {editButton}
        <div className={classes.content} onClick={onClick}>
          {userNameSection}
          {deviceNameSection}
          {firstRow}
          <SizedBox height={4}></SizedBox>
          {secondRow}
          <SizedBox height={14}></SizedBox>
        </div>
        {footer}
      </Card>
      <div className={classes.avatar} onClick={onClick}>
        <Icon color="inherit" fontSize="large">
          <OpacityIcon fontSize="inherit" />
        </Icon>
        <SizedBox width={2}></SizedBox>
        <Typography variant="h6" gutterBottom color="inherit">
          {tankLevel + "%"}
        </Typography>
      </div>
    </div>
  );
};
