import React from "react";
import { LoginForm } from "./LoginForm";
import { Box, Typography } from "@mui/material";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        marginTop: "15vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#1f6f5f",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Lista de Tarefas
      </Typography>
      <LoginForm />
    </Box>
  );
};
