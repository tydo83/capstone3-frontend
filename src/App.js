import React, { useEffect, useState } from 'react'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { BrowserRouter as Router } from 'react-router-dom'

import MainRouter from './MainRouter'
import Spinner from './components/Spinner/Spinner'
import jwtDecode from 'jwt-decode'

import useInputHooks from './hooks/useInputHooks'

//toastify 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00a000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFF5EE",
      contrastText: "black",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  const [username, setUsername] = useState("")

  const handleUserLogin = (user) => {
    setUsername(username)
  }
  
  const handleUserLogout = () => {
    localStorage.removeItem('jwtToken')
    setUsername(null)
  }

  useEffect(() => {
    let getJWToken = localStorage.getItem('jwtToken')
    if (getJWToken) {
      const currentTime = Date.now() / 1000;
      let decodedJWToken = jwtDecode(getJWToken)
      if (decodedJWToken.exp < currentTime) {
        handleUserLogout();
      } else {
        handleUserLogin(decodedJWToken)
      }
    }
  }, [])
  
  return (
    <>
    <ToastContainer />
    <ThemeProvider theme={theme}>
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <MainRouter />
      </Router>
    </React.Suspense>        
    </ThemeProvider>
    </>
  );
}

export default App;
