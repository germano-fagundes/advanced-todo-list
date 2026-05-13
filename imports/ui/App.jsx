import { Meteor } from "meteor/meteor";
import react, { Fragment, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import CssBaseline from "@mui/material/CssBaseline";
import { LoginForm } from "./LoginForm";
import { TasksPage } from "./TasksPage";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <CssBaseline />
      {user ? (
        <Fragment>
          <div>Seja bem vindo!</div>
          <button onClick={() => Meteor.logout()}>Log Out</button>
          <Link to="/tasks">Tasks</Link>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
