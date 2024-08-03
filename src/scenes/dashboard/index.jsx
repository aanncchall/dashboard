import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PropaneIcon from "@mui/icons-material/Propane";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import StoreIcon from "@mui/icons-material/Store";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import Pie from "../pie";
import PieChart from "../../components/PieChart";
import RadarChart from "../../components/RadarChart";
import MultiRingDonutChart from "../../components/MultiRingDonutChart";
import { Loader } from "rsuite";
import { BeatLoader } from "react-spinners";
// import GeographyChart from "../../components/GeographyChart";

const Dashboard = ({ data, mngreload }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gasCount, setGasCount] = useState(0);
  // const [energyCount, setEnergyCount] = useState(0);
  const [oilCount, setOilCount] = useState(0);
  const [marketCount, setmarketCount] = useState(0);
  const [consumptionCount, setconsumptionCount] = useState(0);
  const [enery, setEnery] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [power, setPower] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastTenEntries, setLastTenEntries] = useState();

  const countTopics = (data) => {
    let gasCount = 0;
    let oilCount = 0;
    let marketCount = 0;
    let consumptionCount = 0;
    let energyCount = 0;
    let growthCount = 0;
    let powerCount = 0;
    // Add more variables for other topics as needed

    data.forEach((item) => {
      if (item.topic === "gas") gasCount++;
      if (item.topic === "oil") oilCount++;
      if (item.topic === "market") marketCount++;
      if (item.topic === "consumption") consumptionCount++;
      if (item.topic === "energy") energyCount++;
      if (item.topic === "growth") growthCount++;
      if (item.topic === "power") powerCount++;

      // Add more conditions for other topics as needed
    });

    // Set state with the counts
    setGasCount(gasCount);
    setOilCount(oilCount);
    setmarketCount(marketCount);
    setconsumptionCount(consumptionCount);
    setEnery(energyCount);
    setGrowth(growthCount);
    setPower(powerCount);
    // Set state for other topics as needed
  };

  useEffect(() => {
    if (data) {
      countTopics(data);
      setLoading(false);
      setLastTenEntries(data.slice(-10).reverse());
    }
    // console.log(data);
  }, [data]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <h2>Topics Count</h2>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={gasCount}
            subtitle="Gas"
            progress="0.75"
            increase="+14%"
            icon={
              <PropaneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={oilCount}
            subtitle="Oil"
            progress="0.50"
            increase="+21%"
            icon={
              <LocalGasStationIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={consumptionCount}
            subtitle="Consumption"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={marketCount}
            subtitle="Market"
            progress="0.80"
            increase="+43%"
            icon={
              <StoreIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={enery}
            subtitle="Energy"
            progress="0.20"
            increase="+15%"
            icon={
              <ElectricBoltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={growth}
            subtitle="Growth"
            progress="0.40"
            increase="+30%"
            icon={
              <ShowChartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={power}
            subtitle="Power"
            progress="0.10"
            increase="+3%"
            icon={
              <BatteryStdIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* Revenue Generation */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Comparison Chart
              </Typography>
              <Typography
                variant="h5"
                fontWeight="normal"
                color={colors.greenAccent[500]}
                sx={{ mt: "1rem" }}
              >
                This is the Comaprison of three sectors and there average
                intensity over years
              </Typography>
            </Box>
          </Box>
          {/* <Loader center content="loading" /> */}
          {!loading ? (
            <Box height="280px" m="-20px 0 0 0">
              <LineChart isDashboard={true} data={data} />
            </Box>
          ) : (
            <Box height="280px" padding="7rem 5rem 5rem 20rem">
              <BeatLoader color="#52aca3" />
            </Box>
          )}
        </Box>
        {/* RingDounut */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Average Likelihood, Intensity and Relevancy based on County and
            Topic
          </Typography>
          {!loading ? (
            <Box height="200px">
              {/* <RadarChart data={data}/> */}
              <MultiRingDonutChart data={data} />
            </Box>
          ) : (
            <Box height="280px" padding="7rem 5rem 5rem 7rem">
              <BeatLoader color="#52aca3" />
            </Box>
          )}
        </Box>

        {/* Bar Chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 30px 0 30px", marginBottom: "3rem" }}
          >
            Average Intensity by Country
          </Typography>
          {!loading ? (
            <Box height="500px" mt="-40px">
              <BarChart isDashboard={true} data={data} />
            </Box>
          ) : (
            <Box height="280px" padding="7rem 5rem 5rem 20rem">
              <BeatLoader color="#52aca3" />
            </Box>
          )}
        </Box>

        {/* list data  */}
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Entries
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h4"
                fontWeight="600"
              >
                Sector
              </Typography>
              <Typography color={colors.grey[100]} variant="h5">
                Topic
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              {" "}
              <Typography variant="h5">Region</Typography>{" "}
            </Box>
            <Box p="5px 10px">
              <Typography variant="h5">Impact</Typography>
            </Box>
          </Box>
          {!loading ? (
            lastTenEntries.map((transaction, i) => (
              <Box
                key={`${transaction._id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.sector}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.topic}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.region}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {transaction.impact}
                </Box>
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="1000" marginBottom="5rem">
            Country-wise Data Distribution Based on Reported Entries
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
            height="75vh"
            paddingLeft="0rem"
            paddingRight="0rem"
          >
            {/* <ProgressCircle size="125" /> */}
            {/* <Pie data={data} head={false}/> */}
            {!loading ? (
              <PieChart data={data} />
            ) : (
              <Box height="280px">
                <BeatLoader color="#52aca3" />
              </Box>
            )}

            {/* <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography> */}
          </Box>
        </Box>

        {/* Geography chart  */}
        <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="1000" marginBottom="5rem">
          World Map: Average Intensity by Selected Topic
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
            height="75vh"
            paddingLeft="0rem"
            paddingRight="0rem"
          >
            {/* <ProgressCircle size="125" /> */}
            {/* <Pie data={data} head={false}/> */}
            {!loading ? (
              <GeographyChart data1={data}/>
            ) : (
              <Box height="280px">
                <BeatLoader color="#52aca3" />
              </Box>
            )}

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
