import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const PieChart = ({ data}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieData, setPieData] = useState([]);
  const [unknownsCount, setUnknownsCount] = useState(0);

  useEffect(() => {
    const countryCount = {};
    let unknowns = 0;

    data.forEach((entry) => {
      const country = entry.country;
      if (country) {
        if (countryCount[country]) {
          countryCount[country]++;
        } else {
          countryCount[country] = 1;
        }
      } else {
        unknowns++;
      }
    });

    const pieDataFormatted = Object.keys(countryCount).map((country) => ({
      id: country,
      label: country,
      value: countryCount[country],
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, // Random color for the pie chart
    }));

    setPieData(pieDataFormatted);
    setUnknownsCount(unknowns);
    // console.log(pieDataFormatted);
  }, [data]);
  return (
    <>
      <ResponsivePie
        data={pieData}
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
                strokeWidth: 50,
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
        }}
        margin={{ top: 10, right: 200, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={1}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        // arcLabel={(d) => `${d.id}`}
        // arcLinkLabel={(d)=> `${d.id}`}
        enableArcLabels={true}
        // enableArcLinkLabels = {true}

        arcLabelsRadiusOffset={0.6}
        arcLabelsSkipAngle={3}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 200,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default PieChart;
