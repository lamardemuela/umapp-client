//* ⤵️ IMPORTS
import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth.context";

function RoleTabs() {
 
  // 🌐 context
  const { tabsValue, setTabsValue, isDogOwner, isDogTrainer } = useContext(AuthContext)

  // 🕹️ funciones de control
  const handleChange = (event, newValue) => {
    console.log(tabsValue);
    if(isDogOwner === true) {
      newValue === 0
      setTabsValue(newValue)
    }else if(isDogTrainer === true){
      newValue === 1
      setTabsValue(newValue)
    }
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
