import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Services from './Services';
import Appointments from './Appointments';
import Account from './Account';
import axios from 'axios';
axios.defaults.withCredentials = true;

function App() {
  const [authenticated, setAuthenticated ] = useState(false);
  const [admin, setAdmin ] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_AUTHCHECK}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setAuthenticated(true);
        console.log('Auth confirmed:', response.data);
      } catch (error) {
          console.error('Error checking auth:', error);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_AUTHCHECK}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setAdmin(true);
        console.log('Admin confirmed:', response.data);
      } catch (error) {
          console.error('Error checking auth:', error);
      }
    }
    checkAdmin();
  }, []);

  return (
    <Router>
      <NavBar authenticated={authenticated}/>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Routes>
          <Route path="/" exact="true" element={<Home authenticated={authenticated} setAuthenticated={setAuthenticated} admin={admin}/>} />
          <Route path="/services" element={<Services authenticated={authenticated} setAuthenticated={setAuthenticated} admin={admin}/>} />
          <Route path="/account" element={<Account authenticated={authenticated} setAuthenticated={setAuthenticated} admin={admin}/>} />
          {authenticated && (
            <>
              <Route path="/appointments" element={<Appointments authenticated={authenticated} setAuthenticated={setAuthenticated} admin={admin}/>} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;