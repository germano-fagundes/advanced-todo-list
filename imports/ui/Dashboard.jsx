import React from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

export const Dashboard = () => {
  const isLoading = useSubscribe("tasks");
  const registeredTasks = useTracker(() =>
    TasksCollection.find(
      { status: "registered" },
      {
        sort: { createdAt: -1 },
      },
    ).fetch(),
  );
  const inProgressTasks = useTracker(() =>
    TasksCollection.find(
      { status: "in-progress" },
      {
        sort: { createdAt: -1 },
      },
    ).fetch(),
  );
  const doneTasks = useTracker(() =>
    TasksCollection.find(
      { status: "done" },
      {
        sort: { createdAt: -1 },
      },
    ).fetch(),
  );

  const cards = [
    {
      title: "Total de tarefas cadastradas",
      number: registeredTasks.length,
    },
    {
      title: "Total de tarefas em andamento",
      number: inProgressTasks.length,
    },
    {
      title: "Total de tarefas concluídas",
      number: doneTasks.length,
    },
    {
      title: "Total de tarefas",
      number:
        registeredTasks.length + inProgressTasks.length + doneTasks.length,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      {cards.map((card) => (
        <Card
          sx={{
            flex: 1,
            maxWidth: "500px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {card.number}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};
