import React, { useContext } from 'react'
import DogOwnerHome from './DogOwnerHome'
import { AuthContext } from '../context/auth.context'
import DogTrainerHome from './DogTrainerHome'

function Home() {
  // 🌐 context
  const {isDogOwner, isDogTrainer}  =  useContext(AuthContext)
  
  return (
    <div>
      {isDogOwner === true && <DogOwnerHome />}
      {isDogTrainer === true && <DogTrainerHome />}
    </div>
  )
}

export default Home