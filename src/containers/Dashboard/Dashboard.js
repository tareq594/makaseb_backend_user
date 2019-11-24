import React from "react";
import classes from "./Dashboard.css";
import SellingTimeChart from "./SellingTimeChart";
import StockEntryChart from "./StockEntryChart";
import StatCard from "../../components/UI/Charts/StatCard/StatCard";
import LeaderBoard from "./LeaderBoard"

const Dashboard = () => {
  return (
    <div className={classes.Dashboard}>
      <h1>Dashboard</h1>
      <div className={classes.StatCards}>
        <StatCard
          api="/dashboard/lastMonthSales"
          label="Last month items sold"
          icon="hashIcon"
          iconColor="#22c037fe"
          fontSize={35}
        ></StatCard>
         <StatCard
          api="/dashboard/lastMonthRevenue"
          label="Last month income"
          icon="dinarIcon"
          iconColor="#22c037fe"
          fontSize={35}
        ></StatCard>
        <StatCard
          api="/dashboard/lastMonthStockEntry"
          label="Last month stock entry"
          icon="stockIcon"
          iconColor="#ec5b0dfe"
          fontSize={35}
        ></StatCard>
        <StatCard
          api="/dashboard/allTimeTopCustomer"
          label="All time top customer"
          icon="customerIcon"
          iconColor="#ec0d50fe"
          fontSize={16}
        ></StatCard>
      </div>
      <LeaderBoard></LeaderBoard>
        <SellingTimeChart></SellingTimeChart>
        <StockEntryChart></StockEntryChart>
    </div>
  );
};

export default Dashboard;
