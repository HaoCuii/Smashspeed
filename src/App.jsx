import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar   from './components/NavBar';
import Home     from './components/Home';
import Contact  from './components/Contact';
import FAQ      from './components/FAQ';
import TOS      from './components/TOS';
import Privacy  from './components/Privacy';
import Background from './components/Background';
import { Analytics } from '@vercel/analytics/react';

// "One-page" content wrapped in Background
const MainPage = () => (
  <Background>
    <Navbar />
    <Home />
    <Contact />
    <FAQ />
  </Background>
);

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </Fragment>
  );
}

export default App;
