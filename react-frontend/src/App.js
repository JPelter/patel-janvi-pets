import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Services from './Services';
import Appointments from './Appointments';
import Chat from './Chat';
// import Login from './Login';

function App() {
  const [ Authenticated, setAuthenticated ] = useState(false);

  useEffect(() => {
    // Simulated authentication check on app load
    // Replace this with your actual API call to check authentication
    async function checkAuth() {
      try {
        const response = await fetch(process.env.REACT_APP_AUTH_API);
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    }
    checkAuth();
  }, [setAuthenticated]);

  return (
    <Router>
      <NavBar Authenticated={Authenticated} setAuthenticated={setAuthenticated}/>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          {Authenticated ? (
            <>
              <Route path="/appointments" component={Appointments} />
              <Route path="/chat" component={Chat} />
            </>
          ) : (
            <Route path="/login" component={Chat} />
          )}
        </Routes>
    </Router>
  );
}

export default App;