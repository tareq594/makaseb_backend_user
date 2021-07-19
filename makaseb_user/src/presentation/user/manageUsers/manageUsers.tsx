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
import {
  selectLoadUsers,
  load,
  activateUser,
  deactivateUser,
  updateSearchText,
} from "../../../application/load_users/load_users.slice";
import { useHistory } from "react-router-dom";

export interface IManagedUsersProps {}

export const ManageUsers: React.FunctionComponent<IManagedUsersProps> = (
  props
) => {
  const devicesState = useSelector(selectLoadUsers);
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
        margin: 20,
        padding: 20,
      },
      card: {
        marginBottom: 30,
      },
    })
  );

  const classes = useStyles();




  const userCards = devicesState.users.map((user, index) => {

    return (
      <div className={classes.card} key={user.email}>
        <UserCard
        onClick={()=>{
          history.push(`/user/${user.id}/devices`)
        }}
          userActive={user.isActive}
          userName={user.firstName + " " + user.lastName}
          address={user.address}
          mobileNumber={user.phoneNumber}
          email={user.email}
          onActivityChange={(isActive) => {
            console.log("isActive")
            console.log(!isActive)
            !isActive
              ? dispatch(activateUser(index))
              : dispatch(deactivateUser(index));
          }}
        ></UserCard>
      </div>
    );
  });

  const searchBar = (
    <div className={classes.searchField}>
      <SearchField
        placeHolder="search User...."
        onChange={(text) => {
          dispatch(updateSearchText(text));
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
      dataLength={userCards.length}
      next={() => {}}
      hasMore={false}
      loader={<h4>Loading...</h4>}
    >
      {userCards}
    </InfiniteScroll>
  );

  return (
    <div>
      {searchBar}
      <div className={classes.cards}>{body}</div>
    </div>
  );
};
