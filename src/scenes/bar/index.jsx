import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = ({data}) => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Average Intensity by Country" />
      <Box height="75vh">
        <BarChart data={data} />
      </Box>
    </Box>
  );
};

export default Bar;
