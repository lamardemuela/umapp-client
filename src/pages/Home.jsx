import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import HomePublic from '../components/HomePublic'
import DogTrainerHome from './DogTrainerHome'
import DogOwnerHome from './DogOwnerHome'

function Home() {

  const { isLoggedIn, isDogTrainer, isDogOwner } = useContext(AuthContext)
  
  return (
    
    <>
      {isLoggedIn === false && <HomePublic />}

      {isLoggedIn===true && isDogTrainer === true && <DogTrainerHome />}

      {isLoggedIn===true && isDogOwner === true && <DogOwnerHome /> }
    </>
    
  )
}

export default Home