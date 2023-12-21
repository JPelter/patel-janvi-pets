import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Services from './Services';
import Appointments from './Appointments';
import Chat from './Chat';
import Account from './Account';

function App() {
  const [authenticated, setAuthenticated ] = useState(false);
  // const [width, height] = [window.screen.width, window.screen.height];
  // const isMobile = Math.min(width, height) < 768;
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_AUTHCHECK}`);
        if (response.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
        // NADA!
      }
    }
    checkAuth();
  }, []);

  return (
    <Router>
      <NavBar authenticated={authenticated}/>
      <Routes>
        <Route path="/" exact="true" element={<Home/>} /> f
        <Route path="/services" element={<Services/>} />
        <Route path="/account" element={<Account authenticated={authenticated}/>} />
        {authenticated && (
          <>
            <Route path="/appointments" element={<Appointments/>} />
            <Route path="/chat" element={<Chat/>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;