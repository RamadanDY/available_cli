import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();

  const Gohome = () => {
    navigate('/')
  }
  return (
    <>
     <div>Success got to work on the design for this </div>
     <button className="gohome" onClick={Gohome}>Home</button></>
  )
}

export default Success


// after 5 sec it goes back home 