import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hoc/Layout/Layout";
import Dshboard from "./containers/Dashboard/Dashboard";
import Stock from "./containers/Stock/Stock";
import AddStock from "./containers/Stock/AddStock/AddStock";
import RemoveStock from "./containers/Stock/RemoveStock/RemoveStock";
import Customers from "./containers/Customers/Customers";
import CustomersCreate from "./containers/Customers/CustomersCreate/CustomersCreate";
import Customer from "./containers/Customers/Customer/Customer";
import CustomerAddStock from "./containers/Customers/CustomerAddStock/CustomerAddStock";
import CustomerRemoveStock from "./containers/Customers/CustomerRemoveStock/CustomerRemoveStock";
import ItemSearch from "./containers/ItemSearch/ItemSearch";
import Validator from "./containers/Validator/Validator";
import Login from "./containers/Login/Login.js";
import SignUp from "./containers/Login/SignUp.js";
import Settings from "./containers/Settings/Settings.js"
import LabelsGenerator from "./containers/InvoiceSystem/LabelsGenerator/LabelsGenerator"
import UpdateInvoiceStatus from "./containers/InvoiceSystem/UpdateInvoiceStatus/UpdateInvoiceStatus"
import InvoicesReports from "./containers/InvoiceSystem/InvoiceReports/InvoiceReports"

import { Offline} from "react-detect-offline";
import classes from "./App.css";
import ProtectedRoute from "./ProtectedRoute"
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authentication';




if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dshboard} />
        <ProtectedRoute path="/stock/add" component={AddStock} />
        <ProtectedRoute path="/stock/remove" component={RemoveStock} />
        <ProtectedRoute path="/stock" component={Stock} />
        <ProtectedRoute path="/customers/new" component={CustomersCreate} />
        <ProtectedRoute path="/customers/:id/add" component={CustomerAddStock} />
        <ProtectedRoute path="/customers/:id/remove" component={CustomerRemoveStock} />
        <ProtectedRoute path="/customers/:id" component={Customer} />
        <ProtectedRoute path="/customers" component={Customers} />
        <ProtectedRoute path="/itemSearch" component={ItemSearch} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/labelsGenerator" component={LabelsGenerator} />
        <ProtectedRoute path="/invoicesReports" component={InvoicesReports} />
        <ProtectedRoute path="/updateInvoiceStatus" component={UpdateInvoiceStatus} />
        <Route path="/validator" component={Validator} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/signup" component={SignUp} />
        {/* <Route path="/" exact component={Dshboard} /> */}
        <Redirect from="/" to="/dashboard" />
        {/* <Redirect to="/"  */}
        />
      </Switch>
    );

    return (
      <Provider store={store}>
        <div>
          <Layout>
            {/* <Offline>
              <div className={classes.Content}>
                <div className={classes.OfflineModal}>
                  <div className={classes.ModalContent}>
                    <p className={classes.Title}>No internet connection</p>
                    <p className={classes.Paragraph}>
                      No internet connection detected. This service can be only
                      used when you are online. The box will disappear
                      automatically when internet connection is restored. If the
                      problem persists reload the page
                    </p>
                  </div>
                </div>
              </div>
            </Offline> */}
            {routes}
          </Layout>
        </div>
      </Provider>
    );
  }
}

export default App;
