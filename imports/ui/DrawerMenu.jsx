import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { truncate } from "./TasksEditPage";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DrawerMenu = ({ open, drawerWidth, user, handleToggleDrawer }) => {
  const navigate = useNavigate();
  const buttons = [
    {
      text: "Tarefas",
      action: () => navigate("/tasks/"),
    },
    {
      text: "Perfil",
      action: () => navigate("/profile"),
    },
    {
      text: "Log Out",
      action: () => Meteor.logout(),
    },
  ];
  const lastBtnIdx = buttons.length - 1;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleToggleDrawer}
    >
      <DrawerHeader>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img
                style={{
                  width: "40px",
                  aspectRatio: 1 / 1,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={user.profile.image}
                alt="Imagem de perfil"
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.profile.firstName}
            secondary={truncate(user.emails[0].address, 15)}
          />
        </ListItem>
      </DrawerHeader>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {buttons.map((btn, i) => (
          <ListItem
            key={btn.text}
            disablePadding
            sx={
              i === lastBtnIdx
                ? {
                    marginTop: "auto",
                    marginBottom: 10,
                    color: "red",
                  }
                : undefined
            }
          >
            <ListItemButton onClick={btn.action}>
              <ListItemText
                primary={btn.text}
                sx={{
                  paddingLeft: 2,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
