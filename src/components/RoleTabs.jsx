//* ⤵️ IMPORTS
import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth.context";

function RoleTabs() {
 
  // 🌐 context
  const { tabsValue, setTabsValue } = useContext(AuthContext)

  // 🕹️ funciones de control
  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  return (
    <Box sx={{ bgcolor: 'background.paper', display: "flex", justifyContent: "center" }}>
      <Tabs
        value={tabsValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Busco educador" />
        <Tab label="Soy educador canino" />
      </Tabs>
    </Box>
  )
}

//* ⤴️ EXPORTS
export default RoleTabs;
