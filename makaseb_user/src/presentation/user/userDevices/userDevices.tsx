import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { User } from "../../../models/user";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoadUsers,
  activateUser,
  deactivateUser,
  loadSingleUser,
} from "../../../application/load_users/load_users.slice";
import {
  selectDevices,
  load,
  loadUserDevices,
} from "../../../application/devices_admin/devices_slice";
import InfiniteScroll from "react-infinite-scroll-component";

import { UserCard } from "../../core/components/userCard/UserCard";
import { colors, createStyles, makeStyles, Theme } from "@material-ui/core";
import { DeviceCard } from "../../core/components/deviceCard/DeviceCard";
import { useHistory } from "react-router-dom";

interface IUserDevicesProps extends RouteComponentProps {
  user: User;
}

const UserDevices: React.FunctionComponent<IUserDevicesProps> = (props) => {
  const usersState = useSelector(selectLoadUsers);
  const devicesState = useSelector(selectDevices);

  const dispatch = useDispatch();
  const userId = props.match.params["id"];
  var user = usersState.users.find((user) => user.id == userId);
  const userIndex = usersState.users.findIndex((user) => user.id == userId)!;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        color: colors.blue[200],
      },
      userCard: {
        margin: 20,
        padding: 20,
      },
      devices: {},
      card: {
        margin: 10,
      },
    })
  );
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    if (!user) {
      dispatch(loadSingleUser(userId));
    }
    dispatch(loadUserDevices(userId));
  }, []);

  const devicesCards = devicesState.devices.map((device, index) => {
    console.log(device);
    return (
      <div className={classes.card} key={device.imei! + index.toString()}>
        <DeviceCard
          onClick={() => {
            history.push(`/device/${device.id}`);
          }}
          type={device.type!}
          tankLevel={device.tankLevel!}
          userName={
            device.user
              ? device.user!.firstName! + " " + device.user!.lastName!
              : undefined
          }
          deviceName={device.name!}
          address={device.address!}
          mobileNumber={device.user ? device.user!.phoneNumber! : undefined}
          imei={device.imei!}
          lastUpdated={device.updatedAt!}
          batteryLevel={device.batteryLevel!}
        ></DeviceCard>
      </div>
    );
  });

  const body = devicesState.isLoading ? (
    <p>loading...</p>
  ) : devicesState.isErrorLoading ? (
    <p>error...</p>
  ) : (
    <InfiniteScroll
      dataLength={devicesState.devices.length}
      next={() => false}
      hasMore={devicesState.hasMore}
      loader={<h4>Loading...</h4>}
    >
      {devicesCards}
    </InfiniteScroll>
  );

  const userCard = user ? (
    <UserCard
      userActive={user!.isActive}
      userName={user.firstName + " " + user.lastName}
      address={user.address}
      mobileNumber={user.phoneNumber}
      email={user.email}
      onActivityChange={(isActive) => {
        !isActive
          ? dispatch(activateUser(userIndex))
          : dispatch(deactivateUser(userIndex));
      }}
    ></UserCard>
  ) : (
    <div></div>
  );

  return (
    <div>
      <div className={classes.userCard}>{userCard}</div>
      <div className={classes.devices}>{devicesCards}</div>
    </div>
  );
};

export default withRouter(UserDevices);
