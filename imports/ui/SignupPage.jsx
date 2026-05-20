import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { formatDate } from "./TaskMoreInfo";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");
  const user = useTracker(() => Meteor.user());

  const handleSubmit = async (e) => {
    e.preventDefault();
    Accounts.createUser({
      email,
      password,
      profile: {
        firstName,
        surname,
        birthDate: new Date(birthDate),
        gender,
        company,
      },
    });

    console.log(
      `${user.profile.firstName}, ${user.profile.surname}, ${formatDate(user.profile.birthDate)}, ${user.profile.gender}, ${user.emails[0].address}, ${user.profile.company}`,
    );

    setFirstName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setBirthDate("");
    setGender("");
    setCompany("");
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          label="Nome"
          variant="outlined"
        />

        <TextField
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          label="Sobrenome"
          variant="outlined"
        />

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          label="Email"
          variant="outlined"
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          label="Senha"
          variant="outlined"
        />

        <TextField
          value={birthDate}
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
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          label="Empresa"
          variant="outlined"
        />

        <Button variant="contained" onClick={(e) => handleSubmit(e)}>
          Criar conta
        </Button>
      </Box>
    </>
  );
};
