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

  if (isLoading()) return <div>Loading...</div>;

  return (
    <List>
      {tasks.map((task, i) => {
        const IconComponent = iconMap[task.icon];
        return (
          <div key={task._id}>
            <ListItem
              className="task"
              secondaryAction={
                <div>
                  <IconButton
                    onClick={() => setEditingTaskId(task._id)}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
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
              <ListItemText primary={task.primary} secondary={task.secondary} />
            </ListItem>
            <TaskEditor
              task={task}
              className={
                task._id === editingTaskId
                  ? "task-editor active"
                  : "task-editor"
              }
            />
          </div>
        );
      })}
    </List>
  );
};
