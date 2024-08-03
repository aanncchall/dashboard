import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = ({ data, header }) => {
  return (
    <Box m="20px">
      <Header
        title="Pie Chart"
        subtitle="Country-wise Data Distribution Based on Reported Entries"
      />

      <Box height="75vh">
        <PieChart data={data} />
      </Box>
    </Box>
  );
};

export default Pie;
