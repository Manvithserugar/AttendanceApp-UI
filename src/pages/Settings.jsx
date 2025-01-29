import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function Settings() {
  const [firebaseApiKey, setFirebaseApiKey] = useState('');
  const [firebaseAuthDomain, setFirebaseAuthDomain] = useState('');
  const [firebaseProjectId, setFirebaseProjectId] = useState('');
  const [firebaseStorageBucket, setFirebaseStorageBucket] = useState('');
  const [firebaseMessagingSenderId, setFirebaseMessagingSenderId] = useState('');
  const [firebaseAppId, setFirebaseAppId] = useState('');

  const [telegramBotToken, setTelegramBotToken] = useState('');
    const [telegramChatId, setTelegramChatId] = useState('');

  const handleSaveFirebaseConfig = () => {
    const config = {
      apiKey: firebaseApiKey,
      authDomain: firebaseAuthDomain,
      projectId: firebaseProjectId,
      storageBucket: firebaseStorageBucket,
      messagingSenderId: firebaseMessagingSenderId,
      appId: firebaseAppId,
    };
    localStorage.setItem('firebaseConfig', JSON.stringify(config));
    alert('Firebase configuration saved!');
    window.location.reload();
  };

    const handleSaveTelegramConfig = () => {
        const config = {
            botToken: telegramBotToken,
            chatId: telegramChatId,
        };
        localStorage.setItem('telegramConfig', JSON.stringify(config));
        alert('Telegram configuration saved!');
        window.location.reload();
    };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Settings</h1>
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Firebase Configuration
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                <TextField
                    label="API Key"
                    variant="outlined"
                    value={firebaseApiKey}
                    onChange={(e) => setFirebaseApiKey(e.target.value)}
                />
                <TextField
                    label="Auth Domain"
                    variant="outlined"
                    value={firebaseAuthDomain}
                    onChange={(e) => setFirebaseAuthDomain(e.target.value)}
                />
                <TextField
                    label="Project ID"
                    variant="outlined"
                    value={firebaseProjectId}
                    onChange={(e) => setFirebaseProjectId(e.target.value)}
                />
                <TextField
                    label="Storage Bucket"
                    variant="outlined"
                    value={firebaseStorageBucket}
                    onChange={(e) => setFirebaseStorageBucket(e.target.value)}
                />
                <TextField
                    label="Messaging Sender ID"
                    variant="outlined"
                    value={firebaseMessagingSenderId}
                    onChange={(e) => setFirebaseMessagingSenderId(e.target.value)}
                />
                <TextField
                    label="App ID"
                    variant="outlined"
                    value={firebaseAppId}
                    onChange={(e) => setFirebaseAppId(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSaveFirebaseConfig}>
                    Save Firebase Configuration
                </Button>
            </Box>
        </Box>
        <Box>
            <Typography variant="h6" gutterBottom>
                Telegram Configuration
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Bot Token"
                    variant="outlined"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                />
                <TextField
                    label="Chat ID"
                    variant="outlined"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSaveTelegramConfig}>
                    Save Telegram Configuration
                </Button>
            </Box>
        </Box>
    </div>
  );
}

export default Settings;
