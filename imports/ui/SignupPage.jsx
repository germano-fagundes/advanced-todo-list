import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = () => {
    Meteor.callAsync("accounts.create", {
      firstName,
      surname,
      email,
      password,
      birthDate,
      gender,
      company,
      createdAt: new Date(),
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          required
          label="Nome"
          variant="outlined"
        />

        <TextField
          onChange={(e) => setSurname(e.target.value)}
          required
          label="Sobrenome"
          variant="outlined"
        />

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          label="Email"
          variant="outlined"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          label="Senha"
          variant="outlined"
        />

        <TextField
          onChange={(e) => setBirthDate(e.target.value)}
          required
          type="date"
          label="Data de nascimento"
          variant="outlined"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <InputLabel id="gender">Gênero</InputLabel>
        <Select
          labelId="gender"
          value={gender}
          label="Gênero"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"male"}>Masculino</MenuItem>
          <MenuItem value={"female"}>Feminino</MenuItem>
        </Select>

        <TextField
          onChange={(e) => setCompany(e.target.value)}
          required
          label="Empresa"
          variant="outlined"
        />

        <Button variant="contained" onClick={() => handleSubmit()}>
          Criar conta
        </Button>
      </Box>
    </>
  );
};
