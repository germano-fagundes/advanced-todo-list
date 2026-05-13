import { Link, Navigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import CssBaseline from "@mui/material/CssBaseline";
import { Fragment } from "react";
import { ToDoList } from "./ToDoList";

export const TasksPage = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <CssBaseline />
      {user ? (
        <Fragment>
          <ToDoList />
        </Fragment>
      ) : (
        <Navigate to="/" replace />
      )}
    </div>
  );
};
