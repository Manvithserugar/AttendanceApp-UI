import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function Root() {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const storedConfig = localStorage.getItem('firebaseConfig');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        const app = initializeApp(config);
        const firestoreDb = getFirestore(app);
        setFirebaseApp(app);
        setDb(firestoreDb);
      } catch (error) {
        console.error("Error initializing Firebase from localStorage:", error);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App firebaseApp={firebaseApp} db={db} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
