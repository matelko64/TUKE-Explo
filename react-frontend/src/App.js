import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Achievements from './components/Achievements';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile';
import Register from './components/Register';
import Tutorial from './components/Tutorial';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

function Layout() {
  const location = useLocation();
  const showNav = ["/main", "/profile", "/achievements"];
  const shouldShowNav = showNav.includes(location.pathname);

  return (
    <>
      <Box sx={{ pb: shouldShowNav ? 10 : 0 }}>
        <Routes>
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </Box>
      {shouldShowNav && <BottomNav />}
    </>
  );
}

export default App;
