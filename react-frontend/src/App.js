import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import './App.css';

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
        <div className="App">
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/main" element={<Main />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
