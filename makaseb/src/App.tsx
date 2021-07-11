import React from "react";
import "./App.css";
import "@fontsource/roboto";
import { Layout } from "./presentation/core/layOut/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { categoriesRoutes, Rout } from "./routes";
import { SignIn } from "./presentation/login/login";
import { ProtectedRoute } from "./core/util/protectedRoute/protectedRoute";
import { useEffect } from "react";
import { autoSignIn } from "./application/authentication/authentication_slice";

import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignIn());
    /* autoAuth(); */
  });

  var pages: Rout[] = [];
  categoriesRoutes.forEach((cat) => {
    cat.routes.forEach((rout) => {
      pages.push(rout);
    });
  });

  const routes = pages.map((page) => {
    return (
      <ProtectedRoute path={page.path} exact key={page.name}>
        <page.component />
      </ProtectedRoute>
    );
  });

  return (
      <div className="App">
        <Router>
          <Layout>
            <Switch>
              {routes}
              <Route path="/login" exact>
                <SignIn />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </div>
  );
}

export default App;
