import { Link, Navigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import CssBaseline from "@mui/material/CssBaseline";
import { Fragment } from "react";
import { ToDoList } from "./ToDoList";
import { Meteor } from "meteor/meteor";

export const TasksPage = () => {
  const { user, isLoggingIn } = useTracker(() => ({
    user: Meteor.user(),
    isLoggingIn: Meteor.loggingIn(),
  }));

  if (isLoggingIn) return <div>Carregando sessão...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div>
      <CssBaseline />
      <ToDoList />
    </div>
  );
};
