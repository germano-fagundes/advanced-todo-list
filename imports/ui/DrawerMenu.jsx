import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DrawerMenu = ({ open, drawerWidth, handleToggleDrawer }) => {
  const navigate = useNavigate();
  const buttons = [
    {
      text: "Tarefas",
      action: () => navigate("/tasks/"),
    },
    {
      text: "Perfil",
      action: () => navigate("/"),
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
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
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
              i === lastBtnIdx && {
                marginTop: "auto",
                marginBottom: 10,
              }
            }
          >
            <ListItemButton onClick={btn.action}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={btn.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
