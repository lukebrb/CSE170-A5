import React from "react"

import Loadable from "react-loadable"
import ReactApexChart from "react-apexcharts"

const LoadableChart = Loadable({
  loader: () => import("react-apexcharts"),
  loading() {
    return <div>Loading...</div>
  },
})

const Card = props => (
  <div
    style={{
      height: "150px",
      margin: "2%",
      border: "solid",
      borderRadius: "20px",
      backgroundColor: "#fcf9d4",
      display: "flex",
    }}
  >
    {/* Left side color */}
    <div
      style={{
        height: "100%",
        width: "40px",
        backgroundColor: props.color,
        borderRadius: "20px 0 0 20px",
      }}
    />

    {/* Main details on the card */}
    <div
      style={{
        padding: "3% 4%",
        lineHeight: "5px",
      }}
    >
      <h3>{props.id}</h3>
      <p>Today's Time Slots</p>
      <ul>
        <li>Total: {props.totalSlots}</li>
        <li>Available: {props.availSlots}</li>
      </ul>
    </div>

    {/*Pie Chart */}
    <div
      style={{
        position: "absolute",
        right: "0",
      }}
    >
      <LoadableChart
        options={pieData.options}
        series={[
          parseInt(props.availSlots) / parseInt(props.totalSlots),
          (parseInt(props.totalSlots) - parseInt(props.availSlots)) /
            parseInt(props.totalSlots),
        ]}
        type="donut"
      />
    </div>
  </div>
)

const pieData = {
  options: {
    labels: ["Available", "Taken"],
    colors: ["#00eeff", "#e60008"],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
      formatter: (val, opt) => {
        return val
      },
    },
  },
}

export default Card
