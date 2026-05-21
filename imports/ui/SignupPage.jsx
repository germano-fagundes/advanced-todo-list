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
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName == "" ||
      surname == "" ||
      email == "" ||
      password == "" ||
      birthDate == "" ||
      gender == "" ||
      company == "" ||
      image == null
    ) {
      alert("Preencha todos os campos!");
    }

    const userId = await Accounts.createUser(
      {
        email,
        password,
        profile: {
          firstName,
          surname,
          birthDate: new Date(birthDate),
          gender,
          company,
        },
      },
      (err) => {
        if (err) return alert(err);
        Meteor.callAsync("users.setImage", image);
      },
    );

    setFirstName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setBirthDate("");
    setGender("");
    setCompany("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!/^image\/(png|jpeg|jpg)$/.test(file.type)) {
      alert("Use PNG ou JPG");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Arquivo muito grande (máx 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        {image && <img src={image} alt="preview" style={{ width: 80 }} />}

        <Button variant="contained" onClick={(e) => handleSubmit(e)}>
          Criar conta
        </Button>
      </Box>
    </>
  );
};
