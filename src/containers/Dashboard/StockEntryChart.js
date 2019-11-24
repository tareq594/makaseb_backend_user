import React, { useState, useEffect } from "react";
import axios from "../../axios";
import classes from "./Dashboard.css";
import TimeSeriesChart from "../../components/UI/Charts/TimeSeriesChart/TimeSeriesChart";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner"

const StockEntryChart = props => {
  const [timeChartData, setTimeChartData] = useState([]);
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    axios.get("/dashboard/stockLastThreeMonths").then(res => {
      const dateValueMap = [];
      res.data.forEach(element => {
        var found = false;
        var ltime = new Date(element.stockEntryDate)
        ltime.setHours(0);
        ltime.setMinutes(0);
        ltime.setSeconds(0);
        ltime.setMilliseconds(0)
        var ntime = ltime.getTime()
  
        for (var i = 0; i < dateValueMap.length; i++) {
          if (dateValueMap[i].time === ntime) {
            dateValueMap[i].value += 1;
            found = true;
            break;
          }
        }
        if (!found) {
          dateValueMap.push({ value: 1, time: ntime });
        }
      });
      dateValueMap.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)); 
      setIsLoading(false)
      setTimeChartData(dateValueMap);
    });
  }, []);

  return (
    <div className={classes.Chart}>
    <p className={classes.Title}>Stock entry items during the past 3 months </p>
      <TimeSeriesChart chartData={timeChartData} valueLabel={"Entered items"} stroke={"#C81C1C"}></TimeSeriesChart>
      <div className={classes.Spinner}>
      <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      </div>

    </div>
  );
};

export default StockEntryChart;
