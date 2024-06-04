import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import SessionCard from "../components/SessionCard"

function SessionList() {
  const [sessionList, setSessionList] = useState(null);

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    getSessionData();
  }, []);

  //🔗 GET "/api/session" => listar sesiones
  const getSessionData = async () => {
    try {
      const response = await service.get("/session");
      setSessionList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(sessionList);

  if (sessionList === null) {
    return <CircularProgress />;
  }

  return (
    <Box className="containerBorder" sx={{ width: "100%" }}>
      <h2>Tus sesiones</h2>
      <Button
        sx={{ borderRadius: "100px", boxShadow: "none" }}
        type="submit"
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/add-session"
      >
        + Añadir sesión
      </Button>
      {sessionList.map((eachSession) => {
        return <SessionCard key={eachSession._id} eachSession={eachSession} getSessionData={getSessionData} />
      })}
    </Box>
  );
}

export default SessionList;
