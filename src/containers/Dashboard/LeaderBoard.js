import React, { useState, useEffect } from "react";
import classes from "./Dashboard.css";
import axios from "../../axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const LeaderBoard = () => {
  const tabs = [
    { id: "tab1", label: "Last month", count: 1 },
    { id: "tab2", label: "Last 3 months", count: 3 },
    { id: "tab3", label: "Last 6 months", count: 6 },
    { id: "tab4", label: "Last 12 months", count: 12 },
    { id: "tab5", label: "All time", count: 100 }
  ];
  const [selectedTab, SetTab] = useState(tabs[0]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState([]);

  const tabsButtons = tabs.map(tab => {
    const activeStyle = selectedTab.id === tab.id ? classes.TabActive : "";
    return (
      <button
        key={tab.id}
        className={[classes.Tab, activeStyle].join(" ")}
        id={tab.id}
        onClick={() => {
          handleApiRequest(tab.count);
          setLoading(true);
          handleTabClick(tab.id);
          SetTab(tab);
        }}
      >
        {tab.label}
      </button>
    );
  });

  const handleApiRequest = count => {
    axios
      .get(`/dashboard/topLastMonths?months=${count}`)
      .then(res => {
        setLoading(false);
        setValue(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleTabClick = id => {
    tabs.forEach(tab => {
      const tabElement = document.getElementById(tab.id);
      tab.id === id
        ? tabElement.classList.add(classes.TabActive)
        : tabElement.classList.remove(classes.TabActive);
    });
  };

  useEffect(() => {
    console.log("use effect");
    axios
      .get("/dashboard/topLastMonths?months=1")
      .then(res => {
        setLoading(false);
        setValue(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const columns = value ? (
    value.map(column => {
      return (
        <tr key={column.id}>
          <td>{column.name}</td>
          <td>{column.city}</td>
          <td>{column.address}</td>
          <td>{column.email}</td>
          <td>{column.count}</td>
          <td>{column.itemsSold}</td>
        </tr>
      );
    })
  ) : (
    <tr></tr>
  );

  return (
    <div className={classes.Chart}>
      <p className={classes.Title}>Top customers</p>
      <div className={classes.Tabs}>{tabsButtons}</div>
      <div className={classes.Table} style={{ overflowX: "auto" }}>
        <table>
          <tbody>
            <tr>
              <th>Customer name</th>
              <th>City</th>
              <th>Address</th>
              <th>Email</th>
              <th>{`Items sold during ${selectedTab.label}`}</th>
              <th>All time items sold</th>
            </tr>
            {columns}
          </tbody>
        </table>
      </div>
      <div className={classes.Spinner}>
        <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </div>
    </div>
  );
};

export default LeaderBoard;
