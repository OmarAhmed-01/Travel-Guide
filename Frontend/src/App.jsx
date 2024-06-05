import React from 'react'
import NavbarOne from './components/NavbarOne/NavbarOne'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import Destinations from './Pages/Destinations/Destinations'
import Nation from './Pages/Nations/Nation'
import Cities from './Pages/Cities/Cities'

const App = () => {
  return (
    <div className='app'>
      <NavbarOne/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/destinations' element={<Destinations/>}/>
        <Route path='/destinations/:nation' element={<Nation/>}/>
        <Route path='/destination/:country/:city' element={<Cities/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App