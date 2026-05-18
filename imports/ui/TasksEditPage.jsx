import React, { useState, useEffect } from "react";
import { TasksCollection } from "../api/TasksCollection";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import {
  styled,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import CodeIcon from "@mui/icons-material/Code";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EmailIcon from "@mui/icons-material/Email";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TaskEditor } from "./TaskEditor";
import { Meteor } from "meteor/meteor";

const iconMap = {
  DeleteIcon,
  AssignmentIcon,
  CheckCircleIcon,
  EventIcon,
  CodeIcon,
  MusicNoteIcon,
  EmailIcon,
  FitnessCenterIcon,
  SchoolIcon,
  ShoppingCartIcon,
  BugReportIcon,
};

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
};

const truncate = (string, max) => {
  if (!string) return "";
  if (string.length <= max) return string;

  return string.slice(0, max) + "...";
};

const statusMap = (status) => {
  switch (status) {
    case "registered":
      return "Cadastrada";
      break;
    case "in-progress":
      return "Em andamento";
      break;
    case "done":
      return "Concluída";
      break;

    default:
      return "Sem situação";
      break;
  }
};

export const TasksEditPage = () => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() =>
    TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      },
    ).fetch(),
  );

  const handleDeleteTask = (_id) => {
    Meteor.callAsync("tasks.delete", { _id });
  };

  const handleToggleEditTask = (taskId) => {
    taskId === editingTaskId
      ? setEditingTaskId(null)
      : setEditingTaskId(taskId);
  };

  const resetEditingTaskId = () => {
    setEditingTaskId(null);
  };

  const nextStatus = (status) => {
    switch (status) {
      case "registered":
        return "in-progress";
        break;
      case "in-progress":
        return "done";
        break;
      case "done":
        return "registered";
        break;

      default:
        return "";
        break;
    }
  };

  const handleNextStatus = async (_id) => {
    const task = await TasksCollection.findOneAsync(_id);
    const taskStatus = task.status;
    const newStatus = nextStatus(taskStatus);

    return Meteor.callAsync("tasks.update", {
      _id: _id,
      status: newStatus,
    });
  };

  if (isLoading()) return <div>Loading...</div>;

  return (
    <List>
      {tasks.map((task) => {
        const IconComponent = iconMap[task.icon];
        return (
          <div key={task._id}>
            <ListItem
              secondaryAction={
                <div>
                  <Button
                    onClick={() => handleNextStatus(task._id)}
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Situação
                  </Button>
                  <IconButton
                    onClick={() => handleToggleEditTask(task._id)}
                    edge="end"
                    aria-label="edit"
                  >
                    {task._id === editingTaskId ? <CloseIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTask(task._id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              }
            >
              <ListItemAvatar>
                <Avatar>{IconComponent && <IconComponent />}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={task.primary}
                secondary={
                  <span>
                    {task.secondary}, <em>{truncate(task.description, 10)}</em>,{" "}
                    {statusMap(task.status)}, {formatDate(task.dueDate)}
                  </span>
                }
              />
            </ListItem>
            <TaskEditor
              taskId={task._id}
              className={
                task._id === editingTaskId
                  ? "task-editor active"
                  : "task-editor"
              }
              resetEditingTaskId={resetEditingTaskId}
            />
            <Divider variant="middle" component="li" />
          </div>
        );
      })}
    </List>
  );
};
