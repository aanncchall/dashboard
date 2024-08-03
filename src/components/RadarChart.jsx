import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const processData = (data) => {
    const sectors = [...new Set(data.map(item => item.sector))];
    const radarData = {
      labels: ['Relevance', 'Likelihood', 'Intensity'],
      datasets: sectors.map((sector, index) => {
        const sectorData = data.filter(item => item.sector === sector);
        const avgRelevance = sectorData.reduce((sum, item) => sum + item.relevance, 0) / sectorData.length;
        const avgLikelihood = sectorData.reduce((sum, item) => sum + item.likelihood, 0) / sectorData.length;
        const avgIntensity = sectorData.reduce((sum, item) => sum + item.intensity, 0) / sectorData.length;

        return {
          label: sector,
          data: [avgRelevance, avgLikelihood, avgIntensity],
          backgroundColor: `rgba(${index * 30}, 99, 132, 0.2)`,
          borderColor: `rgba(${index * 30}, 99, 132, 1)`,
          borderWidth: 1
        };
      })
    };

    return radarData;
  };

  const chartData = processData(data);

  return <Radar data={chartData} />;
};

export default RadarChart;
