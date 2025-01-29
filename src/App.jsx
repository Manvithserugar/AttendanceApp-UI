import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import View from './pages/View';
import Manage from './pages/Manage';
import Settings from './pages/Settings';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

function App({ firebaseApp, db }) {
  return (
    <div style={{ background: 'white' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/view" style={{ color: 'white', textDecoration: 'none' }}>View Attendance</Link>
            <Link to="/manage" style={{ color: 'white', textDecoration: 'none' }}>Manage Students</Link>
             <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home firebaseApp={firebaseApp} db={db} />} />
          <Route path="/view" element={<View firebaseApp={firebaseApp} db={db} />} />
          <Route path="/manage" element={<Manage firebaseApp={firebaseApp} db={db} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
