import { Meteor } from "meteor/meteor";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import {
  Switch,
  IconButton,
  CssBaseline,
  FormControlLabel,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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

  const navigate = useNavigate();

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
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => navigate("/tasks/edit")}
      >
        Editar
      </Button>
      <ToDoList showCompleted={showCompleted} />
    </div>
  );
};
