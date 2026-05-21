import { Meteor } from "meteor/meteor";
import react, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { LoginForm } from "./LoginForm";
import { TasksPage } from "./TasksPage";
import { DrawerMenu } from "./DrawerMenu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
            <Main open={open}>
              <IconButton
                onClick={handleToggleDrawer}
                sx={{ display: open ? "none" : "block" }}
              >
                {<ChevronRightIcon />}
              </IconButton>
              {user.profile.gender == "male" ? (
                <div>Seja bem vindo, {user.profile.firstName}!</div>
              ) : (
                <div>Seja bem vinda, {user.profile.firstName}!</div>
              )}
            </Main>
          </Box>
        </Fragment>
      ) : (
        <div>
          <LoginForm />
          <Link to="/signup">Criar conta</Link>
        </div>
      )}
    </div>
  );
};
