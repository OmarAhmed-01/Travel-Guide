import React from 'react'
import Header from '../../components/Header/Header'
import Explore from '../../components/Explore/Explore'
import Visit from '../../components/Visit/Visit'
import Celebrate from '../../components/Celebrate/Celebrate'
import Hotspot from '../../components/Hotspot/Hotspot'

const Home = () => {
  return (
    <div>
        <Header/>
        <Explore/>
        <Visit/>
        <Hotspot/>
        <Celebrate/>
    </div>
  )
}

export default Home