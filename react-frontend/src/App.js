import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';
import HomeMain from './Home/HomeMain';
import AppointmentMain from './Appointment/AppointmentMain';
import AccountMain from './/Account/AccountMain';
import axios from 'axios';
axios.defaults.withCredentials = true;

function App() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [authenticated, setAuthenticated ] = useState(false);
  const [admin, setAdmin ] = useState(false);
  const props = { authenticated, setAuthenticated, admin, setAdmin, checkedAuth, setCheckedAuth };

  useEffect(() => {
    async function checkAuth() {
      try {
        const authResponse = await axios.get(`${process.env.REACT_APP_API_AUTHCHECK}`, {}, {headers: {'Content-Type': 'application/json'}});
        setAuthenticated(true);
        console.log('Auth confirmed:', authResponse.data);
        
        // CHECK IF ADMIN NOW!
        const adminResponse = await axios.get(`${process.env.REACT_APP_API_ADMINCHECK}`, {}, {headers: {'Content-Type': 'application/json'}});
        setAdmin(true);
        console.log('Admin confirmed:', adminResponse.data);

      } catch (error) {
          console.error('Error checking auth or admin:', error);
      } finally {
        setCheckedAuth(true);
      }
    }
    checkAuth();
  }, []);

  console.log('App props:', props);
  return (
    <Router>
      <NavBar authenticated={authenticated}/>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Routes>
          <Route path="/" exact="true" element={<HomeMain {...props}/>} />
          <Route path="/account" element={<AccountMain {...props}/>} />
          {authenticated && (
            <>
              <Route path="/appointments" element={<AppointmentMain {...props}/>} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;