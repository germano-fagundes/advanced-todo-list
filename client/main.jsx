import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { App } from "/imports/ui/App";
import { LoginForm } from "/imports/ui/LoginForm";
import { SignupPage } from "../imports/ui/SignupPage";
import { TasksPage } from "/imports/ui/TasksPage";
import { TasksEditPage } from "/imports/ui/TasksEditPage";
import { ProfilePage } from "/imports/ui/ProfilePage";
import "/imports/ui/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: '"Stack Sans Text", sans-serif',
  },
  palette: {
    primary: {
      main: "#2fa084",
      light: "#6fcf97",
      dark: "#1f6f5f",
      contrastText: "#f4fff9",
    },
  },
});

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<App />} />
          <Route path="/signup" exact={true} element={<SignupPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/edit" element={<TasksEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>,
  );
});
