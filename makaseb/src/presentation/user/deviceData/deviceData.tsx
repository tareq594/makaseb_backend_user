import {
  Card,
  colors,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { config } from "../../../config";
import { DeviceCard } from "../../core/components/deviceCard/DeviceCard";
import Paper from "@material-ui/core/Paper";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoadDevice,
  load,
} from "../../../application/load_device/load_device";

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Title, ValueScale } from "@devexpress/dx-react-chart";
import { SizedBox } from "../../core/components/sizedBox/sizedBox";
import { Animation } from "@devexpress/dx-react-chart";
import { DeviceType } from "../../../models/device";
import { Log } from "../../../models/logs";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IDataItem {
  month: string;
  total: number;
}

const format = () => (tick) => tick;

const columns: GridColDef[] = [
  { field: "createdAt", headerName: "createdAt", width: 400 },
  { field: "batteryLevel", headerName: "Battery level", width: 200 },
  { field: "tankLevel", headerName: "Tank level", width: 200 },
  { field: "type", headerName: "Device type", width: 200 },
];

/* const chartData: Log[] = [
  {
    batteryLevel: 30,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-18",
  },
  {
    batteryLevel: 90,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-19",
  },
  {
    batteryLevel: 30,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-20",
  },
  {
    batteryLevel: 90,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-21",
  },
  {
    batteryLevel: 60,
    tankLevel: 20,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-21",
  },
  {
    batteryLevel: 10,
    tankLevel: 10,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-21",
  },
  {
    batteryLevel: 30,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-22",
  },
  {
    batteryLevel: 90,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-23",
  },
  {
    batteryLevel: 30,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-24",
  },
  {
    batteryLevel: 90,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-25",
  },

  {
    batteryLevel: 30,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-26",
  },
  {
    batteryLevel: 90,
    tankLevel: 50,
    type: DeviceType.Ultrasound,
    createdAt: "2021-07-27",
  },
]; */

export interface IDeviceDataPropsProps extends RouteComponentProps {}

const DeviceData: React.FunctionComponent<IDeviceDataPropsProps> = (props) => {
  const deviceState = useSelector(selectLoadDevice);
  const dispatch = useDispatch();
  const deviceId = props.match.params["id"];

  const chartData: Log[] = deviceState.logs;

  var rows = chartData.map((log, index) => {
    return {
      id: index,
      createdAt: log.createdAt,
      batteryLevel: log.batteryLevel,
      tankLevel: log.tankLevel,
      type: log.type,
    };
  });

  useEffect(() => {
    dispatch(load(deviceId));
  }, []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: 18,
        padding: 20,
        paddingBottom: 40,
      },
      sortBar: {
        background: config.appBarColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: theme.spacing(2.0),
      },
      searchField: {
        display: "flex",
        margin: theme.spacing(3),
        justifyContent: "center",
      },
      cards: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
        margin: 20,
        padding: 20,
      },
      card: {
        margin: 10,
      },
      chart: {
        padding: 20,
      },
    })
  );

  const classes = useStyles();

  const tankLevelText = () => <h3>Past three months Tank Level</h3>;
  const batteryLevelText = () => <h3>Past three months Battery Level</h3>;

  const deviceCard = deviceState.device ? (
    <DeviceCard
      type={deviceState.device.type!}
      tankLevel={deviceState.device.tankLevel!}
      userName={deviceState.device.user?.firstName}
      address={deviceState.device.address!}
      mobileNumber={deviceState.device.user?.phoneNumber}
      deviceName={deviceState.device.name!}
      imei={deviceState.device.imei!}
      lastUpdated={deviceState.device.updatedAt!}
      batteryLevel={deviceState.device.batteryLevel!}
    ></DeviceCard>
  ) : (
    <div></div>
  );

  return (
    <div className={classes.root}>
      {deviceCard}
      <SizedBox height={30}></SizedBox>
      <Paper>
        <div className={classes.chart}>
          <Chart data={chartData}>
            <ValueScale name="tankLevel" />

            <ArgumentAxis tickFormat={format} />

            <ValueAxis
              scaleName="tankLevel"
              showGrid={true}
              showLine={true}
              showTicks={true}
            />

            <LineSeries
              name="Total Transactions"
              valueField="tankLevel"
              argumentField="createdAt"
              scaleName="tankLevel"
            />
            <Title text={``} textComponent={tankLevelText} />
            <Animation />
          </Chart>
        </div>
      </Paper>
      <SizedBox height={20}></SizedBox>
      <Paper>
        <div className={classes.chart}>
          <Chart data={chartData}>
            <ValueScale name="batteryLevel" />

            <ArgumentAxis tickFormat={format} />

            <ValueAxis
              scaleName="batteryLevel"
              showGrid={true}
              showLine={true}
              showTicks={true}
            />

            <LineSeries
              name="Total Transactions"
              valueField="batteryLevel"
              argumentField="createdAt"
              scaleName="batteryLevel"
            />
            <Title text={``} textComponent={batteryLevelText} />
            <Animation />
          </Chart>
        </div>
      </Paper>
      <SizedBox height={40}></SizedBox>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default withRouter(DeviceData);
