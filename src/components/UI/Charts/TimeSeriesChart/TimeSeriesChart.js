import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classes from "./TimeSeriesChart.css"

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis
} from "recharts";



const TimeSeriesChart = ({ chartData,valueLabel,stroke }) => {

    const CustomTooltip = ({ label, payload, active}) => {
        var time = new Date(label);
        const nLabel = time.toLocaleDateString();
        const content = (active && payload!== null) ? (
          <div className={classes.Tooltip}>
            <p className={classes.Label}>{`${nLabel}`}</p>
            <p>{`${valueLabel} : ${payload[0].value}`}</p>
          </div>
        ) : null;
      
        return <div>{content} </div>;
      };




  return (
  <ResponsiveContainer width="95%" height={250}>
    <LineChart
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis
        dataKey="time"
        domain={["auto", "auto"]}
        name="Time"
        tickFormatter={unixTime => moment(unixTime).format("MM-DD-YYYY")}
        type="number"
      />
      <YAxis dataKey="value" name="Value" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={CustomTooltip} />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke={stroke}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  
  </ResponsiveContainer>
  )
};

TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired
};

export default TimeSeriesChart;
