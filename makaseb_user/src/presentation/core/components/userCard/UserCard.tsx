import {
  Card,
  Icon,
  IconButton,
  makeStyles,
  Typography,
  colors,
  Avatar,
  Switch,
  withStyles,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { SizedBox } from "../sizedBox/sizedBox";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";

import BatteryChargingFullOutlinedIcon from "@material-ui/icons/BatteryChargingFullOutlined";
import { IconedText } from "../iconedText/IconedText";
import { purple } from "@material-ui/core/colors";
import { white } from "color-name";

export interface UserCardProps {
  width?: number;
  height?: number;
  userActive?: boolean;
  image?: string;
  borderRadius?: number;
  avatarRadius?: number;
  userName: string;
  address: string;
  mobileNumber: string;
  email: string;
  onEdit?: () => {};
  onActivityChange?: (isActive: boolean) => void;
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  width = 350,
  height = 150,
  onEdit,
  userActive = true,
  image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  borderRadius = 20,
  avatarRadius = 100,
  userName = "user name",
  address = "address amman test",
  email = "email test",
  mobileNumber = "0798487414",
  onActivityChange = () => {},
  onClick = () => {},
}) => {
  const [isActive, setisActive] = React.useState(userActive);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: "hsla(9, 100%, 50%, 1)",
      "&$checked": {
        color: colors.green[500],
      },
      "&$checked + $track": {
        backgroundColor: "white",
      },
      "& + $track": {
        backgroundColor: "white",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      /*       width: width,
       */ /*       height: height,
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
    img: {
      width: avatarRadius,
      height: avatarRadius,
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
      backgroundColor: isActive ? colors.green[500] : "hsla(9, 100%, 50%, 1)",
      color: "white",
      fontSize: 55,
    },
    battery: {
      transform: "rotate(90deg)",
    },
    switch: {
      width: 60,
      height: 39,
      margin: 5,
    },
  });
  const classes = useStyles();

  const handleUserActiveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setisActive(event.target.checked);
    onActivityChange(isActive);
  };

  const editButton =
    onEdit == undefined ? (
      <div></div>
    ) : (
      <div className={classes.editButton}>
        <IconButton
          aria-label="edit"
          size="medium"
          color="primary"
          onClick={() => onEdit()}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </div>
    );

  const userNameSection = (
    <div className={classes.userName}>
      <Typography variant="h6" gutterBottom color="primary">
        {userName}
      </Typography>
    </div>
  );

  const firstRow = (
    <div className={classes.row}>
      <IconedText text={address} iconColor="pink">
        <HomeIcon />
      </IconedText>
      <IconedText text={mobileNumber}>
        <CallIcon />
      </IconedText>
    </div>
  );

  const secondRow = (
    <div className={classes.row}>
      <IconedText text={email} iconColor="hsla(195, 86%, 46%, 1)">
        <EmailIcon />
      </IconedText>
      <IconedText text={mobileNumber}>
        <CallIcon />
      </IconedText>
    </div>
  );

  const footer =
    userActive == undefined ? (
      <div></div>
    ) : (
      <div className={classes.footer}>
        <PurpleSwitch checked={isActive} onChange={handleUserActiveChange} />
        <SizedBox width={8}></SizedBox>
        <Typography variant="h6" gutterBottom color="inherit">
          {isActive ? "Active" : "Suspended"}
        </Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      <Card className={classes.card} >
        {editButton}
        <div className={classes.content} onClick={() => onClick()}>
          {userNameSection}
          {firstRow}
          <SizedBox height={4}></SizedBox>
          {secondRow}
          <SizedBox height={14}></SizedBox>
        </div>
        {footer}
      </Card>
      <div className={classes.avatar} onClick={() => onClick()}>
        <Avatar className={classes.img} alt="makaseb user" src={image} />
      </div>
    </div>
  );
};
