import { Box, Typography } from "@mui/material";
import React from "react";

export const ProfileData = ({ fieldName, data }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "primary.dark", fontWeight: "bold" }}
      >
        {fieldName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data}
      </Typography>
    </Box>
  );
};
