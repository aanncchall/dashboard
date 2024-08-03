import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import MultiRingDonutChart from "../../components/MultiRingDonutChart";

const RingDounut = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header
        title="Ring Donut Chart"
        subtitle="Average Likelihood, Intensity and Relevancy based on County and Topic"
      />

      <Box
        gridColumn="span 4"
        gridRow="span 3"
        // backgroundColor={colors.primary[400]}
        padding="30px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        // Adjust height and width as needed
        height="40rem" // Example height
        width="100%" // Example width
        alignContent="center"
      >
        <Box height="100%" width="50%">
          <MultiRingDonutChart data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default RingDounut;
