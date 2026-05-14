import React from "react";
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
} from "@mui/material";
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

export const ToDoList = ({ showCompleted }) => {
  const isLoading = useSubscribe("tasks");

  const hideCompletedFilter = { complete: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(showCompleted ? {} : hideCompletedFilter, {
      sort: { createdAt: -1 },
    }).fetch(),
  );

  const handleDeleteTask = (_id) => {
    Meteor.callAsync("tasks.delete", { _id });
  };

  const handleToggleTask = (_id) => {
    Meteor.callAsync("tasks.toggle", { _id });
  };

  if (isLoading()) return <div>Loading...</div>;

  return (
    <List>
      {tasks.map((task) => {
        const IconComponent = iconMap[task.icon];
        return (
          <ListItem
            className="task"
            onClick={() => handleToggleTask(task._id)}
            secondaryAction={
              <IconButton
                onClick={() => handleDeleteTask(task._id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
            key={task._id}
          >
            <ListItemAvatar
              className={task.complete ? "task-complete" : "task-not-complete"}
            >
              <Avatar>{IconComponent && <IconComponent />}</Avatar>
            </ListItemAvatar>
            <ListItemText
              className={task.complete ? "task-complete" : "task-not-complete"}
              primary={task.primary}
              secondary={task.secondary}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
