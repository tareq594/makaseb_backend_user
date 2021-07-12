import {
  Card,
  colors,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { config } from "../../../config";
import InfiniteScroll from "react-infinite-scroll-component";

import { UserCard } from "../../core/components/userCard/UserCard";
import { DropDown } from "../../core/components/dropDown/DropDown";
import { SearchField } from "../../core/components/searchField/SearchField";
import { SizedBox } from "../../core/components/sizedBox/sizedBox";
import { useSelector, useDispatch } from "react-redux";
export interface IManagedUsersProps {}

export const ManageUsers: React.FunctionComponent<IManagedUsersProps> = (
  props
) => {
  useEffect(() => {
    /*     dispatch(load());
     */
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

  const devicesCards = [
    {
      id: "koko",
      isActive: true,
      tankLevel: 10,
      userName: "tareq",
      deviceName: "tareq device",
      address: "amman jordan",
      mobileNumber: "0798487414",
      email: "tareq.sanabra@gmail.com",
    },
  ].map((user, index) => {
    return (
      <div className={classes.card} key={user.id!}>
        <UserCard
          userActive={user.isActive}
          tankLevel={user.tankLevel}
          userName={user.userName}
          address={user.address}
          mobileNumber={user.mobileNumber}
          email={user.email}
        ></UserCard>
      </div>
    );
  });

  const searchBar = (
    <div className={classes.searchField}>
      <SearchField
        placeHolder="search User...."
        onChange={(text) => {
          console.log("text");
          /*           dispatch(updateSearchText(text));
           */
        }}
      ></SearchField>
    </div>
  );

  const body = (
    /* devicesState.isLoading ? (
    <p>loading...</p>
  ) : devicesState.isErrorLoading ? (
    <p>error...</p>
  ) : */
    <InfiniteScroll
      dataLength={devicesCards.length}
      next={() => {}}
      hasMore={false}
      loader={<h4>Loading...</h4>}
    >
      {devicesCards}
    </InfiniteScroll>
  );

  return (
    <div>
      {searchBar}
      <div className={classes.cards}>{body}</div>
    </div>
  );
};
