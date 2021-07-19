import {
  Card,
  colors,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { config } from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";

import { DeviceCard } from "../core/components/deviceCard/DeviceCard";
import { DropDown } from "../core/components/dropDown/DropDown";
import { SearchField } from "../core/components/searchField/SearchField";
import { SizedBox } from "../core/components/sizedBox/sizedBox";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDevices,
  load,
  loadMore,
  sortBy,
  sortByDirection,
  updateSearchText,
} from "../../application/devices_admin/devices_slice";
import { DeviceSort } from "../../models/device";
import { Sort } from "../../models/sort";
import { useHistory } from "react-router-dom";

export interface IDashboardProps {}

export const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const devicesState = useSelector(selectDevices);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(load());
  }, []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        color: colors.blue[200],
      },
      sortBar: {
        background: config.appBarColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: theme.spacing(2.0),
      },
      searchField: {
        display: "flex",
        margin: theme.spacing(3),
        justifyContent: "center",
      },
      cards: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
        margin: 20,
        padding: 20,
      },
      card: {
        margin: 10,
      },
    })
  );

  const classes = useStyles();
  const options: string[] = [];
  for (let item in DeviceSort) {
    options.push(item);
  }
  const optionsSortByhow: string[] = [];
  for (let item in Sort) {
    optionsSortByhow.push(item);
  }
  const sortBar = (
    <div>
      <Card>
        <div className={classes.sortBar}>
          <Typography color="textSecondary" variant="subtitle1">
            Sort by
          </Typography>
          <SizedBox width={20}></SizedBox>
          <DropDown
            key="sortByDropdDown"
            id="sortBy"
            defaultValue={devicesState.sortBy}
            options={options}
            textColor={colors.grey[600]}
            onChange={(val) => {
              var l: DeviceSort = DeviceSort[val as keyof typeof DeviceSort];
              dispatch(sortBy(l));
            }}
          ></DropDown>
          <SizedBox width={20}></SizedBox>

          <DropDown
            key={"sortByhow"}
            id="sortByhow"
            defaultValue={devicesState.sortDirection}
            options={optionsSortByhow}
            textColor={colors.grey[600]}
            onChange={(val) => {
              var l: Sort = Sort[val as keyof typeof Sort];
              dispatch(sortByDirection(l));
            }}
          ></DropDown>
        </div>
      </Card>
    </div>
  );

  const searchBar = (
    <div className={classes.searchField}>
      <SearchField
        placeHolder="User,Device,Phone,Address,IMEI ...."
        onChange={(text) => {
          console.log("text");
          dispatch(updateSearchText(text));
        }}
      ></SearchField>
    </div>
  );

  const devicesCards = devicesState.devices.map((device, index) => {
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
      next={() => dispatch(loadMore())}
      hasMore={devicesState.hasMore}
      loader={<h4>Loading...</h4>}
    >
      {devicesCards}
    </InfiniteScroll>
  );

  return (
    <div>
      {sortBar}
      {searchBar}
      <div className={classes.cards}>{body}</div>
    </div>
  );
};
