import React from 'react'
import NavbarOne from './components/NavbarOne/NavbarOne'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import Destinations from './Pages/Destinations/Destinations'

const App = () => {
  return (
    <div className='app'>
      <NavbarOne/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/destinations' element={<Destinations/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App