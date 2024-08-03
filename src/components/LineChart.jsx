import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

// Sample data
const rdata = [
  // ... Your data objects
];

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorsArray = ["#e8a838", "#97e3d5", "#f47560", "#F1C40F"];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [sector1, setSector1] = useState("Energy");
  const [sector2, setSector2] = useState("Financial services");
  const [sector3, setSector3] = useState("Government");

  const sectors = [
    ...new Set(data.map((item) => item.sector).filter((sec) => sec)),
  ];

  const filterData = (data, sector1, sector2, sector3) => {
    // Filter data based on sectors
    const filteredData = data.filter(
      (item) =>
        (sector1 ? item.sector === sector1 : true) ||
        (sector2 ? item.sector === sector2 : true) ||
        (sector3 ? item.sector === sector3 : true)
    );

    // Group data by year and sector and calculate the average intensity
    const groupedData = filteredData.reduce((acc, item) => {
      const year = new Date(item.published).getFullYear();
      if (isNaN(year)) return acc;

      const key = `${item.sector}-${year}`;

      if (!acc[key]) {
        acc[key] = { sector: item.sector, year, intensities: [] };
      }

      acc[key].intensities.push(item.intensity);

      return acc;
    }, {});

    // Calculate average intensity for each sector and year
    const transformedData = Object.values(groupedData).map(
      ({ sector, year, intensities }) => {
        const averageIntensity =
          intensities.reduce((sum, val) => sum + val, 0) / intensities.length;

        return {
          x: year.toString(), // Ensure x is a string for Nivo's point scale
          y: averageIntensity,
          sector,
        };
      }
    );

    // Group by sector for the line chart
    const chartData = transformedData.reduce((acc, { x, y, sector }) => {
      const sectorData = acc.find((d) => d.id === sector);

      if (sectorData) {
        sectorData.data.push({ x, y });
      } else {
        acc.push({
          id: sector,
          color: colorsArray[acc.length % colorsArray.length], // Customize colors as needed
          data: [{ x, y }],
        });
      }

      return acc;
    }, []);

    return chartData;
  };

  const filteredData = filterData(data, sector1, sector2, sector3);
  // console.log(filteredData);

  return (
    <>
      <select
        value={sector1}
        onChange={(e) => setSector1(e.target.value)}
        style={{
          marginLeft: "2rem",
          height: "2rem",
          width: "12rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          // paddingRight: "0.6rem"
          marginTop: "3rem",
        }}
      >
        <option value="">Select Sector 1</option>
        {sectors.map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
      </select>

      <select
        value={sector3}
        onChange={(e) => setSector3(e.target.value)}
        style={{
          marginLeft: "2rem",
          height: "2rem",
          width: "12rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          // paddingRight: "0.6rem"
        }}
      >
        <option value="">Select Sector 3</option>
        {sectors.map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
      </select>

      <select
        value={sector2}
        onChange={(e) => setSector2(e.target.value)}
        style={{
          marginLeft: "2rem",
          height: "2rem",
          width: "12rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          // paddingRight: "0.6rem"
        }}
      >
        <option value="">Select Sector 2</option>
        {sectors.map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
      </select>

      <ResponsiveLine
        data={filteredData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={{ datum: "color" }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Average Intensity",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 75,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default LineChart;
