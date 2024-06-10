import React from 'react'
import NavbarOne from './components/NavbarOne/NavbarOne'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import Destinations from './Pages/Destinations/Destinations'
import Nation from './Pages/Nations/Nation'
import Cities from './Pages/Cities/Cities'
import Landmarks from './Pages/Landmarks/Landmarks'
import Landmark from './Pages/Landmark/Landmark'
import Plantrip from './Pages/PlanTrip/Plantrip'

const App = () => {
  return (
    <div className='app'>
      <NavbarOne/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/destinations' element={<Destinations/>}/>
        <Route path='/destinations/:nation' element={<Nation/>}/>
        <Route path='/destinations/:country/:city' element={<Cities/>}/>
        <Route path='/landmarks' element={<Landmarks/>}/>
        <Route path='/landmarks/:country/:city/:landmark' element={<Landmark/>}/>
        <Route path='/plan-your-trip' element={<Plantrip/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App