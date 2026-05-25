import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRadioGroup } from "@mui/material";
import { formatDate } from "./TaskMoreInfo";
import { ProfileData } from "./ProfileData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ProfilePage = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{
          justifySelf: "flex-start",
        }}
      >
        Página inicial
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          <img
            src={user.profile.image}
            alt="Foto de perfil"
            style={{
              aspectRatio: "1/1",
              borderRadius: "500px",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <ProfileData
                fieldName="Nome"
                data={`${user.profile.firstName} ${user.profile.surname}`}
              />
              <ProfileData fieldName="Email" data={user.emails[0].address} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <ProfileData
                fieldName="Data de nascimento"
                data={formatDate(user.profile.birthDate)}
              />
              <ProfileData
                fieldName="Gênero"
                data={user.profile.gender == "male" ? "Masculino" : "Feminino"}
              />
              <ProfileData fieldName="Empresa" data={user.profile.company} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
