import React from "react";
import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";// Update this to your new data
import { useState, useEffect } from "react";

const BarChart = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barData, setBarData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const [countryYearIntensity, setCountryYearIntensity] = useState({});

  useEffect(() => {
    // Process data to get average intensity for each country by year
    const countryYearIntensityTemp = {};

    data.forEach((entry) => {
      const { country, intensity, published } = entry;
      if (!country || !intensity || !published) return;

      const year = new Date(published).getFullYear();
      if (!countryYearIntensityTemp[country]) {
        countryYearIntensityTemp[country] = {};
      }
      if (!countryYearIntensityTemp[country][year]) {
        countryYearIntensityTemp[country][year] = { sum: 0, count: 0 };
      }
      countryYearIntensityTemp[country][year].sum += intensity;
      countryYearIntensityTemp[country][year].count += 1;
    });

    // Set the countries for the dropdown and countryYearIntensity state
    setCountries(Object.keys(countryYearIntensityTemp));
    console.log(countries);
    setCountryYearIntensity(countryYearIntensityTemp);
  }, [data]);

  useEffect(() => {
    // Update barData when selectedCountry changes
    if (selectedCountry) {
      const processedData = Object.keys(
        countryYearIntensity[selectedCountry] || {}
      ).map((year) => ({
        year: year.toString(),
        intensity:
          countryYearIntensity[selectedCountry][year].sum /
          countryYearIntensity[selectedCountry][year].count,
      }));
      // console.log("Processed Data:", processedData);
      setBarData(processedData);
    } else {
      setBarData([]);
    }
  }, [selectedCountry, countryYearIntensity]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        style={{
          marginLeft: "1.5rem",
          height: "2rem",
          width: "17rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1.2rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          // paddingRight: "0.6rem"
        }}
      >
        <option value="" style={{ color: "white" }}>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country} style={{ color: "white" }}>
            {country}
          </option>
        ))}
      </select>
      {/* <h2>{selectedCountry}</h2> */}
      <ResponsiveBar
        data={barData}
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
        }}
        keys={["intensity"]} // Only "intensity" field is used
        indexBy="year" // Index by "year" field
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }} // Use color scheme or remove if using custom colors
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Year",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Intensity",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in year: " + e.indexValue;
        }}
      />
      <Typography color={colors.greenAccent[500]} sx={{mt: "0", ml: "2.5rem"}} >Note: The chart is only for those entries which contains following fields: - Country, Published and Intensity</Typography>
    </>
  );
};

export default BarChart;
