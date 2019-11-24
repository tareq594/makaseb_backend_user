import React, { useState, useEffect } from "react";
import axios from "../../axios";
import dashClasses from "./Dashboard.css";
import {
  VictoryZoomContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory";

const Victory = () => {
  var d = new Date();
  d.setMonth(d.getMonth() - 3);

  const [zoomDomain, setZoomDomain] = useState({
    x: [d, new Date()]
  });
  const [timeChartData, setTimeChartData] = useState([]);
  const handleZoom = domain => {
    setZoomDomain(domain);
  };

  useEffect(() => {
    console.log("ji");
    axios.get("/dashboard/lastThreeMonths").then(res => {
      const dateValueMap = [];

      res.data.forEach(item => {
        const ndate = new Date(item.customer.buyDate);
        const ndateString =
          ndate.getFullYear() +
          "," +
          (" " + (ndate.getMonth() + 1)).slice(-2) +
          "," +
          (" " + ndate.getDate()).slice(-2);
        const exactDate = new Date(ndateString);

        // dateValueMap[exactDate] = (dateValueMap[exactDate]+1) || 1

        var found = false;
        for (var i = 0; i < dateValueMap.length; i++) {
          if (dateValueMap[i].a.getTime() == exactDate.getTime()) {
            dateValueMap[i].b += 1;
            found = true;
            break;
          }
        }
        if (!found) {
          dateValueMap.push({ a: exactDate, b: 1 });
        }
      });

      var myData = [
        { a: new Date(2019, 8, 20), b: 100 },
        { a: new Date(2019, 8, 20), b: 100 },
        { a: new Date(2019, 8, 20), b: 100 },
        { a: new Date(2019, 8, 22), b: 100 }
      ];

      setTimeChartData(dateValueMap);
      console.log(myData);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className={dashClasses.Chart}>
        <VictoryChart
          // height={200}
          theme={VictoryTheme.material}
          responsive={true}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
            theme={VictoryTheme.material}
              responsive={true}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
            />
          }
        >
          <VictoryLine
                    theme={VictoryTheme.material}
            style={{
              data: {
                stroke: "#c43a31"
                // strokeWidth: 10.9
              },
              labels: {},
              parent: { border: "1px solid #ccc" }
            }}
            data={timeChartData}
            x="a"
            y="b"
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default Victory;
