import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const MultiRingDonutChart = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const [selectedTopic, setSelectedTopic] = useState("interest rate");

  // Extract unique countries and topics
  const uniqueCountries = [...new Set(data.map((item) => item.country))];
  const uniqueTopics = [...new Set(data.map((item) => item.topic))];

  // Calculate average values based on selected filters
  const getFilteredData = (country, topic) => {
    if (!country || !topic)
      return { likelihood: 0, intensity: 0, relevance: 0 };

    const filtered = data.filter(
      (item) => item.country === country && item.topic === topic
    );

    const average = (field) =>
      filtered.reduce((acc, item) => acc + (item[field] || 0), 0) /
      filtered.length;

    return {
      likelihood: average("likelihood"),
      intensity: average("intensity"),
      relevance: average("relevance"),
    };
  };

  const filteredData = getFilteredData(selectedCountry, selectedTopic);
  const hasData =
    filteredData.likelihood || filteredData.intensity || filteredData.relevance;

  // Prepare data for the chart
  const chartData = {
    labels: ["Likelihood", "Intensity", "Relevance"],
    datasets: [
      {
        label: "Likelihood",
        data: [filteredData.likelihood, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        cutout: "70%",
        circumference: 180,
        rotation: -90,
      },
      {
        label: "Intensity",
        data: [0, filteredData.intensity, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        cutout: "50%",
        circumference: 180,
        rotation: -90,
      },
      {
        label: "Relevance",
        data: [0, 0, filteredData.relevance],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        cutout: "30%",
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
      datalabels: {
        color: "#fff",
        display: true,
        formatter: (value, context) => {
          // Display value if it's greater than 0
          return value > 0 ? value.toFixed(1) : "";
        },
        anchor: "end",
        align: "start",
        offset: 10,
      },
    },
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
        style={{
          marginLeft: "0rem",
          height: "2rem",
          width: "11.5rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          // paddingRight: "0.6rem"
        }}
      >
        <option value="">Select Country</option>
        {uniqueCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setSelectedTopic(e.target.value)}
        value={selectedTopic}
        style={{
          marginLeft: "2rem",
          height: "2rem",
          width: "7rem",
          backgroundColor: "#1F2A55",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          paddingLeft: "0.3rem",
          marginBottom: "1.5rem",
          // paddingRight: "0.6rem"
        }}
      >
        <option value="">Select Topic</option>
        {uniqueTopics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      {hasData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p>Sorry, no data available for the selected filters.</p>
      )}
    </div>
  );
};

export default MultiRingDonutChart;
