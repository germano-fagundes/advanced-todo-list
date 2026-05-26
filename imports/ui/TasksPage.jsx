import { Meteor } from "meteor/meteor";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import {
  Switch,
  IconButton,
  CssBaseline,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  if (!user) return <Navigate to="/" replace />;
  if (isLoggingIn) return <div>Carregando sessão...</div>;

  const navigate = useNavigate();

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "grid" },
            flexDirection: "column",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            gap: 2,
            marginBottom: 4,
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              justifySelf: "flex-start",
              alignSelf: "flex-start",
            }}
          >
            Página inicial
          </Button>
          <Typography
            variant="h4"
            sx={{
              justifySelf: "center",
              textAlign: "center",
            }}
          >
            Suas tarefas
          </Typography>
        </Box>
        <TaskForm />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
        </Box>
      </Box>
      <ToDoList showCompleted={showCompleted} />
    </div>
  );
};
