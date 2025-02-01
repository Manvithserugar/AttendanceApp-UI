import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function Settings() {
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSaveAccessToken = () => {
    localStorage.setItem("accessToken", accessToken);
    alert("Access token saved!");
    window.location.reload();
  };

  const handleSaveTelegramConfig = () => {
    const config = {
      botToken: telegramBotToken,
      chatId: telegramChatId,
    };
    localStorage.setItem("telegramConfig", JSON.stringify(config));
    alert("Telegram configuration saved!");
    window.location.reload();
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Settings</h1>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Save Access Token
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
          <TextField
            label="Token"
            variant="outlined"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveAccessToken}
          >
            Save Token
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Telegram Configuration
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTelegramConfig}
          >
            Save Telegram Configuration
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Settings;
