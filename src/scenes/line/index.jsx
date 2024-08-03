import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = ({data}) => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle=" This is the Comaprison of three sectors and there average intensity over years" />
      <Box height="75vh">
        <LineChart data={data}/>
      </Box>
    </Box>
  );
};

export default Line;
