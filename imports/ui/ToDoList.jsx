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
import FolderIcon from "@mui/icons-material/Folder";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Brightness5Icon from "@mui/icons-material/Brightness5";

const iconMap = {
  AccessAlarmIcon,
  AccountCircleIcon,
  ArrowForwardIcon,
  AutoFixHighIcon,
  DeleteIcon,
  FolderIcon,
  Brightness5Icon,
};

export const ToDoList = () => {
  const isLoading = useSubscribe("tasks");

  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  if (isLoading()) return <div>Loading...</div>;

  return (
    <List>
      {tasks.map((task) => {
        const IconComponent = iconMap[task.icon];
        return (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
            key={task._id}
          >
            <ListItemAvatar>
              <Avatar>{IconComponent && <IconComponent />}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={task.primary} secondary={task.secondary} />
          </ListItem>
        );
      })}
    </List>
  );
};
