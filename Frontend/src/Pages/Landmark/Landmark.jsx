import React from 'react'
import './landmark.css'
import { useParams } from 'react-router-dom'

const Landmark = () => {

  const { landmark } = useParams();

  return (
    <div>Landmark</div>
  )
}

export default Landmark