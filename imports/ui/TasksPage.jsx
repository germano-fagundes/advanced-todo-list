import { Meteor } from "meteor/meteor";
import { Link, Navigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Fragment, useState } from "react";
import { ToDoList } from "./ToDoList";
import { TaskForm } from "./TaskForm";

export const TasksPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);

  const { user, isLoggingIn } = useTracker(() => ({
    user: Meteor.user(),
    isLoggingIn: Meteor.loggingIn(),
  }));

  if (isLoggingIn) return <div>Carregando sessão...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div>
      <CssBaseline />
      <Link to="/">Página inicial</Link>
      <TaskForm />
      <FormControlLabel
        label="Tarefas concluídas"
        control={
          <Switch
            defaultChecked
            onChange={() => setShowCompleted(!showCompleted)}
          />
        }
      />
      <ToDoList showCompleted={showCompleted} />
    </div>
  );
};
