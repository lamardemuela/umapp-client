import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import service from "../services/config.services";
import DogCard from "../components/DogCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EditDOwnerProfile from "../components/EditDOwnerProfile";
import EditDTrainerProfile from "../components/EditDTrainerProfile";

function MyProfile() {
  // 🌐 context
  const { isDogOwner, isDogTrainer } = useContext(AuthContext);

  return (
    <>
      { isDogOwner === true && <EditDOwnerProfile /> }
      { isDogTrainer === true && <EditDTrainerProfile /> }
    
    </>
  );
}

export default MyProfile;
