import { Meteor } from "meteor/meteor";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import {
  Switch,
  IconButton,
  CssBaseline,
  FormControlLabel,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useState } from "react";
import { ToDoList } from "./ToDoList";
import { TaskForm } from "./TaskForm";

export const TasksPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  const isLoading = useSubscribe("tasks");

  const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const re = new RegExp(escapeRegex(filterValue), "i");
  const hideCompletedFilter = { complete: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(
      showCompleted ? { primary: re } : hideCompletedFilter,
      {
        sort: { createdAt: -1 },
      },
    ).fetch(),
  );

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
          paddingBottom: 4,
          backgroundColor: "white",
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
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
            sx={{
              marginRight: 0,
            }}
          />
          <TextField
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            label="Filtro"
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: "250px",
              maxWidth: "700px",
            }}
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
      {isLoading() ? <div>Loading...</div> : <ToDoList tasks={tasks} />}
    </div>
  );
};
