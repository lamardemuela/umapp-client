import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
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
