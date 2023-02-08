import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Item from './components/Item'
import Navbar from './components/NavBar'

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className='item-section'>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        
      
      </div>
      <Footer />
    </div>
  )
}

export default App
