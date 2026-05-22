import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRadioGroup } from "@mui/material";
import { formatDate } from "./TaskMoreInfo";

export const ProfilePage = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Box>
      <img src={user.profile.image} alt="Foto de perfil" />
      <Typography variant="h5" gutterBottom>
        Nome
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`${user.profile.firstName} ${user.profile.surname}`}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Email
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.emails[0].address}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Data de nascimento
      </Typography>
      <Typography variant="body1" gutterBottom>
        {formatDate(user.profile.birthDate)}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Gênero
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.profile.gender == "male" ? "Masculino" : "Feminino"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Empresa
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.profile.company}
      </Typography>
    </Box>
  );
};
