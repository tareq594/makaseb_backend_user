import React, { useState } from "react";
import classes from "./Customers.css";
import MUIDataTable from "mui-datatables";
import axios from "../../axios";
import SearchInput from "../../components/UI/SearchInput/SearchInput";

import CreateButton from "../../components/UI/Buttons/SaveButton/SaveButton";

const Customers = props => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        setCellProps: value => {
          return {
            className: classes.Table
          };
        }
      }
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: true
      }
    },

    {
      name: "mobileNumber",
      label: "Mobile number",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "itemsSold",
      label: "#Items sold",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const handleCustomerCreateButton = () => {
    console.log(props.history.push("/customers/new"));
  };
  var timer = null;

  const action = val => {
    axios
      .get(`/customer/search?text=${val}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
    console.log("action triggered");
  };

  const handleSearchBoxChange = event => {
    const val = event.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => action(val), 400);
  };

  const handleRowSelect = (rowData, rowMeta) => {
    props.history.push(`/customers/${data[rowMeta.dataIndex][`_id`]}`);
  };

  const Customtoolbar = () => {
    return (
      <div className={classes.Customtoolbar}>
        <SearchInput
          placeholder="Search by name, email, or mobile number"
          autoFocus={true}
          handleSearchBoxChange={handleSearchBoxChange}
        />

      </div>
    );
  };

  const options = {
    fixedHeader: true,
    serverSide: true,
    customToolbar: Customtoolbar,
    responsive: "scroll",
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    selectableRows: "none",
    onRowClick: handleRowSelect,
    rowHover: true
  };

  return (
    <div className={classes.Customers}>
      <div className={classes.CreateButton}>
        <CreateButton
          click={handleCustomerCreateButton}
          text="New customer"
          icon="createIcon"
          backgroundColor="#01ACC1"
          color="#ffffff"
          width={200}
          height={50}
          fontSize={15}
          hoverBackground="#02C6DE"
        />
      </div>

      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
        className={classes.Table}
      />
    </div>
  );
};

export default Customers;
