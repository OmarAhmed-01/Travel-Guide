import React from 'react'
import NavbarOne from './components/NavbarOne/NavbarOne'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <NavbarOne/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App