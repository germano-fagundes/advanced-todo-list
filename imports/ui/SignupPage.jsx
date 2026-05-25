import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
  const navigate = useNavigate();

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

    const [y, m, d] = birthDate.split("-").map(Number);
    const localBirthDate = new Date(y, m - 1, d);
    const navigate = useNavigate();

    const userId = await Accounts.createUser(
      {
        email,
        password,
        profile: {
          firstName,
          surname,
          birthDate: localBirthDate,
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

    navigate("/");
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "15vh",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Crie sua conta!
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "min(700px, 90vw)",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              label="Nome"
              variant="outlined"
              sx={{
                flex: 1,
              }}
            />

            <TextField
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              label="Sobrenome"
              variant="outlined"
              sx={{
                flex: 1,
              }}
            />
          </Box>

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            label="Email"
            variant="outlined"
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              label="Senha"
              variant="outlined"
              sx={{
                flex: 1,
              }}
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
              sx={{
                flex: 1,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <FormControl
              variant="outlined"
              fullWidth
              sx={{
                flex: 1,
              }}
            >
              <InputLabel id="gender-label">Gênero</InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                label="Gênero"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={"male"}>Masculino</MenuItem>
                <MenuItem value={"female"}>Feminino</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              label="Empresa"
              variant="outlined"
              sx={{
                flex: 1,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "calc(1rem + 40px)",
            }}
          >
            <Box>
              <Box
                sx={{
                  width: "fit-content",
                  border: "1px solid #ccc",
                  display: "inline-block",

                  textAlign: "left",
                  margin: 0,
                  padding: "15px 14px",
                  borderRadius: "4px",
                  border: "solid 1px rgba(0, 0, 0, 0.23)",
                  overflow: "hidden",
                  minWidth: "0%",
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                  },
                }}
              >
                <label style={{ cursor: "pointer" }} htmlFor="file-upload">
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(0, 0, 0, 0.65)",
                    }}
                  >
                    Foto de perfil *
                  </Typography>
                </label>
              </Box>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
            </Box>
            {image && (
              <img
                src={image}
                alt="preview"
                style={{
                  height: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "500px",
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
            >
              Voltar
            </Button>
            <Button variant="contained" onClick={(e) => handleSubmit(e)}>
              Criar conta
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
