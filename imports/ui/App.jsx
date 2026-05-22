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
import { Typography } from "@mui/material";
import { Dashboard } from "./Dashboard";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const handleToggleDrawer = () => setOpen(!open);

  return (
    <div>
      <CssBaseline />
      {user ? (
        <Fragment>
          <Box sx={{ display: "flex" }}>
            <DrawerMenu
              open={open}
              drawerWidth={drawerWidth}
              handleToggleDrawer={handleToggleDrawer}
              user={user}
            />
            <Main
              open={open}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <IconButton onClick={handleToggleDrawer}>
                  {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
            </Main>
          </Box>
        </Fragment>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};
