import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import DogTrainerSessionCard from "../components/DogTrainerSessionCard"
import { AuthContext } from "../context/auth.context";
import DogOwnerSessionCard from "../components/DogOwnerSessionCard";

function SessionList() {

  // 🌐 Context
  const {isDogTrainer, isDogOwner, loggedUserId } = useContext(AuthContext)

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
    <Box className="containerBorder" sx={{ width: "100%", paddingLef:"0", paddingRight:"0" }}>
      <h2>Tus sesiones</h2>
      {isDogTrainer === true && (
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
      )}

      {isDogTrainer === true && (
        sessionList.map((eachSession) => {
          return <DogTrainerSessionCard key={eachSession._id} eachSession={eachSession} getSessionData={getSessionData} />
        })
      )}
      {isDogOwner === true && (
        sessionList.filter((eachSession) =>  {
          return loggedUserId === eachSession.dogOwner._id
        })
        .map((eachSession) => {
          return <DogOwnerSessionCard key={eachSession._id} eachSession={eachSession} />
        })
      )}
    </Box>
  );
}

export default SessionList;
