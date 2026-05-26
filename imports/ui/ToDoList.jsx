import React, { useState, useMemo } from "react";
import {
  styled,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Pagination,
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
import TaskMoreInfo from "./TaskMoreInfo";

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

export const ToDoList = ({ tasks }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteTask = (_id) => {
    Meteor.callAsync("tasks.delete", { _id });
  };

  const handleToggleTask = (_id) => {
    Meteor.callAsync("tasks.toggle", { _id });
  };

  const pagCount = Math.ceil(tasks.length / 4);

  const visibleTasks = useMemo(() => {
    const start = (currentPage - 1) * 4;
    const end = start + 4;
    return tasks.slice(start, end);
  }, [tasks, currentPage]);

  return (
    <Box
      sx={{
        paddingBottom: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <List
        sx={{
          paddingTop: 0,
        }}
      >
        {visibleTasks.map((task) => {
          const taskStateStyles = task.complete
            ? {
                opacity: 0.3,
                transition: "all 0.2s ease-in-out",
              }
            : {
                opacity: 1,
                transition: "all 0.2s ease-in-out",
              };
          const avatarBg = task.complete ? "grey.300" : "primary.dark";
          const IconComponent = iconMap[task.icon];
          return (
            <Box
              key={task._id}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
              onClick={() => handleToggleTask(task._id)}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => handleDeleteTask(task._id)}
                    edge="end"
                    aria-label="delete"
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar sx={taskStateStyles}>
                  <Avatar
                    sx={{
                      backgroundColor: avatarBg,
                    }}
                  >
                    {IconComponent && <IconComponent />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={taskStateStyles}
                  primary={task.primary}
                  secondary={task.secondary}
                />
              </ListItem>
              {!task.complete ? (
                <TaskMoreInfo sx={taskStateStyles} task={task} />
              ) : null}
              <Divider variant="middle" component="li" />
            </Box>
          );
        })}
      </List>
      <Pagination
        count={pagCount}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        color="primary"
        sx={{
          alignSelf: "center",
        }}
      />
    </Box>
  );
};
