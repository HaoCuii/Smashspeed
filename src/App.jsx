// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar  from './components/NavBar'
import Home    from './components/Home'
import Contact from './components/Contact'
import FAQ     from './components/FAQ'
import TOS   from './components/TOS'
import Privacy from './components/Privacy'
import Background from './components/Background'

// This is the “one‐page” content
const MainPage = () => (
  <Background>
    <Navbar />
    <Home />
    <Contact />
    <FAQ />
  </Background>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/terms-of-service" element={<TOS />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
