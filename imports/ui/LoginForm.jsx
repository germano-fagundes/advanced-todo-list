import { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password);
    setPassword("");
    setEmail("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "min(500px, 90vw)",
      }}
    >
      <TextField
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="Email"
        name="email"
        variant="outlined"
      />
      <TextField
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        name="password"
        variant="outlined"
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={(e) => submit(e)}
        >
          Entrar
        </Button>
        <Button variant="text" onClick={() => navigate("/signup")}>
          Criar conta
        </Button>
      </Box>
    </Box>
  );
};
