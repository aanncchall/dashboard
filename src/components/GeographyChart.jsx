import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { scaleQuantize } from "d3-scale";

// Mapping of country names to country codes
const countryCodeMap = {
  "United States of America": "USA",
  Nigeria: "NGA",
  Lebanon: "LBN",
  Russia: "RUS",
  Angola: "AGO",
  Egypt: "EGY",
  Mexico: "MEX",
  "Saudi Arabia": "SAU",
  Ukraine: "UKR",
  "South Africa": "ZAF",
  India: "IND",
  Azerbaijan: "AZE",
  China: "CHN",
  Colombia: "COL",
  Niger: "NER",
  Libya: "LBY",
  Brazil: "BRA",
  Mali: "MLI",
  Indonesia: "IDN",
  Iran: "IRN",
  Iraq: "IRQ",
  Venezuela: "VEN",
  "Burkina Faso": "BFA",
  "South Sudan": "SSD",
  Germany: "DEU",
  "United Kingdom": "GBR",
  Kuwait: "KWT",
  Canada: "CAN",
  Argentina: "ARG",
  Japan: "JPN",
  Austria: "AUT",
  Estonia: "EST",
  Spain: "ESP",
  Hungary: "HUN",
  Australia: "AUS",
  Morocco: "MAR",
  Greece: "GRC",
  Qatar: "QAT",
  Oman: "OMN",
  Liberia: "LBR",
  Denmark: "DNK",
  Malaysia: "MYS",
  Syria: "SYR",
  Ethiopia: "ETH",
  Norway: "NOR",
  Ghana: "GHA",
  Kazakhstan: "KAZ",
  "United Arab Emirates": "ARE",
  Jordan: "JOR",
  Algeria: "DZA",
  Turkey: "TUR",
  Cyprus: "CYP",
  Belize: "BLZ",
  Poland: "POL",
};

const GeographyChart = ({ isDashboard = false, data1 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedTopic, setSelectedTopic] = useState("oil");
  const [topics, setTopics] = useState([]);
  const [data, setData] = useState([]);

  // Extract unique topics for dropdown
  useEffect(() => {
    const uniqueTopics = [
      ...new Set(data1.map((item) => item.topic).filter((topic) => topic)),
    ];
    setTopics(uniqueTopics);
  }, [data1]);

  // Calculate average intensity for the selected topic
  useEffect(() => {
    if (selectedTopic) {
      // Filter data based on selected topic
      const filteredData = data1.filter(
        (item) =>
          item.topic === selectedTopic &&
          item.intensity != null &&
          item.intensity !== ""
      );
      console.log(filteredData);

      // Calculate average intensity for each country
      const countryIntensityMap = filteredData.reduce((map, item) => {
        const countryCode = countryCodeMap[item.country];
        if (countryCode) {
          if (map[countryCode]) {
            map[countryCode].intensity += item.intensity;
            map[countryCode].count += 1;
          } else {
            map[countryCode] = { intensity: item.intensity, count: 1 };
          }
        }
        return map;
      }, {});
      console.log(countryIntensityMap);
      console.log(data);

      // Update dataset with average intensity values
      const updatedData = Object.keys(countryIntensityMap).map(
        (countryCode) => {
          const { intensity, count } = countryIntensityMap[countryCode];
          return {
            id: countryCode,
            value: intensity / count,
          };
        }
      );

      setData(updatedData);
      console.log(updatedData);
    } else {
      // Reset data if no topic is selected
      setData([]);
    }
  }, [selectedTopic, data1]);

  const Tooltip = ({ id, value }) => (
    <div
      style={{
        background: colors.grey[900],
        color: colors.grey[100],
        padding: "12px",
        borderRadius: "4px",
      }}
    >
      <strong>{id}</strong>: {value}
    </div>
  );
  return (
    <>
      <select
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        style={{
          // marginLeft: "1.5rem",
          height: "2rem",
          width: "17rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1.2rem",
          fontWeight: "bold",
          padding: "0.3rem",
          // paddingRight: "0.6rem"
          marginBottom: "2rem"
        }}
      >
        <option value="">Select Topic</option>
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <ResponsiveChoropleth
        data={data}
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
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[0, 40]}
        // colors={d => colorScale(d.value)}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isDashboard ? 40 : 150}
        projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={1.5}
        borderColor="#ffffff"
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-left",
                  direction: "column",
                  justify: true,
                  translateX: 20,
                  translateY: -100,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: "left-to-right",
                  itemTextColor: colors.grey[100],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#ffffff",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    </>
  );
};

export default GeographyChart;
