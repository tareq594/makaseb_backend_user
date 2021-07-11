import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";

import {
  selectAuthenticate,
  AuthenticationState,
} from "../../../application/authentication/authentication_slice";
import { useSelector } from "react-redux";

export type IProtectedRouteProps = {
  authenticationPath?: string;
} & RouteProps;

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  authenticationPath = "/login",
  ...routeProps
}) => {
  const authentication = useSelector(selectAuthenticate);

  if (authentication == AuthenticationState.Authenticated) {
    console.log("isauth");
    return <Route {...routeProps} />;
  } else {
    console.log("isNotauth");
    console.log(authentication);

    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};
