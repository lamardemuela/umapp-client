//* ⤵️ IMPORTS
import React, { useContext, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

function RoleTabs({setRole}) {
  const navigate = useNavigate()

  const params = useParams()
  console.log(params.tab)

  // 🌐 context
  // const { isDogOwner, isDogTrainer } = useContext(AuthContext)
  const [selectedTab, setSelectedTab] = useState(Number(params.tab))


  // 🕹️ funciones de control
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setSelectedTab(0)
      setRole("dogOwner")
      navigate("/signup/0")
    } else {
      setSelectedTab(1)
      setRole("dogTrainer")
      navigate("/signup/1")
    }
    // navigate(`/signup/${newValue}`)
  };

  

  return (
    <Box sx={{ bgcolor: 'background.paper', display: "flex", justifyContent: "center" }}>
      <Tabs
        value={selectedTab}
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
