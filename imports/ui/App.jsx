import { Meteor } from "meteor/meteor";
import react, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { LoginPage } from "./LoginPage";
import { TasksPage } from "./TasksPage";
import { DrawerMenu } from "./DrawerMenu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import { Dashboard } from "./Dashboard";

const drawerWidth = 240;

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleToggleDrawer = () => setOpen(!open);

  return (
    <div>
      <CssBaseline />
      {user ? (
        <Fragment>
          <Box>
            <DrawerMenu
              open={open}
              drawerWidth={drawerWidth}
              handleToggleDrawer={handleToggleDrawer}
              user={user}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton onClick={handleToggleDrawer}>
                  <MenuIcon />
                </IconButton>
                {user.profile.gender == "male" ? (
                  <Typography variant="h5">
                    Seja bem vindo, {user.profile.firstName}!
                  </Typography>
                ) : (
                  <Typography variant="h5">
                    Seja bem vinda, {user.profile.firstName}!
                  </Typography>
                )}
              </Box>
              <Dashboard />
            </Box>
          </Box>
        </Fragment>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};
