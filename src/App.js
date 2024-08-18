import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import RingDounut from "./scenes/donut";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import getData from "./api/serviceapi";
import GeoMap from "./scenes/map";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
    if (isFirstRender.current) {
      alert("It may take few seconds to fetch updated data, Please wait :)");
      isFirstRender.current = false;
  }
    setReload(false);
    // console.log(data);
  }, [reload]);

  const manageReLoad = () => {
    setReload(true);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route
                path="/"
                element={<Dashboard data={data} mngreload={manageReLoad} />}
              />
              <Route path="/team" element={<Team data={data} />} />
              <Route path="/form" element={<Form mngreload={manageReLoad} />} />
              <Route path="/bar" element={<Bar data={data} />} />
              <Route path="/pie" element={<Pie data={data} />} />
              <Route path="/line" element={<Line data={data} />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/donut" element={<RingDounut data={data} />} />
              <Route path="/map" element={<GeoMap data={data} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
