import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
const addSequentialIds = (data) => {
  if (data) {
    console.log("in");
    return data.map((item, index) => ({
      ...item,
      id: index + 1, // Sequential IDs starting from 1
    }));
  }
};

const Team = ({ data }) => {
  const [storeData, setStoredData] = useState();
  useEffect(() => {
    const transformedData = addSequentialIds(data);
    setStoredData(transformedData);
    console.log("I am transformed data");
    console.log(transformedData);
  }, [data]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "intensity",
      headerName: "Intensity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "published",
      headerName: "Published on",
      flex: 1,
    },
    
  ];

  return (
    <Box m="20px">
      <Header title="DATA" subtitle="Entire Stored Data" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {storeData ? (
          <DataGrid
            checkboxSelection
            rows={storeData}
            columns={columns}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Team;
