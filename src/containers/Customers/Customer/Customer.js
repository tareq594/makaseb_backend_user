import React, { useState, useEffect } from "react";
import classes from "./Customer.css";
import ContactElement from "../../../components/UI/ContactElement/ContactElement";
import axios from "../../../axios";
import PersonIcon from "@material-ui/icons/Person";
import CityIcon from "@material-ui/icons/LocationCity"
import LocationIcon from "@material-ui/icons/LocationOn"
import PhoneIcon from "@material-ui/icons/Phone"
import EmailIcon from "@material-ui/icons/Email"
import NumberIcon from "@material-ui/icons/Equalizer"
import Card from "../../../components/UI/Card/Card"




const Customer = props => {
  const [data, setData] = useState([]);
  const id = props.history.location.pathname.split("/")[2];
  useEffect(() => {
    axios.get(`/customer/${id}`).then(res => setData(res.data));
  }, []);

  return (
    <React.Fragment>
    <h1 className={classes.H1}>{data ? data.name : "loading.."}</h1>
    <div className={classes.Customer}>
      <div className={classes.Row}>
        <ContactElement
          title={"Name : "}
          value={data ? data.name : "loading.."}
        >
          <PersonIcon />
        </ContactElement>
        <ContactElement
          title={"City : "}
          value={data ? data.city : "loading.."}
        >
          <CityIcon />
        </ContactElement>
      </div>
      <div className={classes.Row}>
        <ContactElement
          title={"Address : "}
          value={data ? data.address : "loading.."}
        >
          <LocationIcon />
        </ContactElement>
        <ContactElement
          title={"Mobile number : "}
          value={data ? data.mobileNumber : "loading.."}
        >
          <PhoneIcon />
        </ContactElement>
      </div>
      <div className={classes.Row}>
        <ContactElement
          title={"Email : "}
          value={data ? data.email : "loading.."}
        >
          <EmailIcon />
        </ContactElement>
        {/* <ContactElement
          title={"Items sold : "}
          value={data.itemsSold ? data.itemsSold : 0}
        >
          <NumberIcon />
        </ContactElement> */}
      </div>
    </div>
    <div className={classes.Cards}>
    <Card path={`/customers/${id}/add`} backgroundColor={"#01ACC1"} size="xmedium" icon={"Add"}>
        Add to Stock
      </Card>
      <Card path={`/customers/${id}/remove`} backgroundColor={"#C10134"} size="xmedium" icon={"Remove"}>
        Remove from Stock
      </Card>
      </div>
    </React.Fragment>

  );
};

export default Customer;
