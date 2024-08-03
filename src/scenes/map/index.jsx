import React from 'react'
import { Box } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from '../../components/GeographyChart';

const GeoMap = ({data}) => {
  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="World Map: Average Intensity by Selected Topic" />
      <Box height="75vh">
        <GeographyChart isDashboard={false} data1={data} />
      </Box>
    </Box>
  )
}

export default GeoMap