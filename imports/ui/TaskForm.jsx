import { Meteor } from "meteor/meteor";
import { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
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
import CategoryIcon from "@mui/icons-material/Category";
import {
  Checkbox,
  Box,
  TextField,
  Button,
  FormControlLabel,
} from "@mui/material";

const icons = [
  "DeleteIcon",
  "AssignmentIcon",
  "CheckCircleIcon",
  "EventIcon",
  "CodeIcon",
  "MusicNoteIcon",
  "EmailIcon",
  "FitnessCenterIcon",
  "SchoolIcon",
  "ShoppingCartIcon",
  "BugReportIcon",
  "CategoryIcon",
];

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
  CategoryIcon,
};

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPersonal, setTaskPersonal] = useState(false);
  const [icon, setIcon] = useState("");
  const [showIcons, setShowIcons] = useState(false);
  const user = useTracker(() => Meteor.user());

  const iconButtonHandler = (e, i) => {
    e.preventDefault();
    setIcon(i);
    setShowIcons(!showIcons);
  };

  const handleToggleIcons = () => {
    setShowIcons(!showIcons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName == "" || taskDesc == " " || taskDueDate == "") return;
    Meteor.callAsync("tasks.insert", {
      icon: icon || "CheckCircleIcon",
      primary: taskName.trim(),
      description: taskDesc.trim(),
      dueDate: taskDueDate.trim(),
      personal: taskPersonal,
    });
    console.log(taskDueDate);
    setIcon("");
    setTaskName("");
    setTaskDesc("");
    setTaskDueDate("");
    setTaskPersonal(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "strech", md: "center" },
            position: "relative",
            marginBottom: 4,
            width: "min(1500px, 95vw)",
            flexWrap: "wrap",
          }}
          noValidate
          autoComplete="off"
        >
          <Button
            variant="contained"
            sx={{ width: "fit-content", height: "fit-content" }}
            onClick={() => setShowIcons(!showIcons)}
          >
            <CategoryIcon />
          </Button>
          <Box
            sx={
              showIcons
                ? {
                    display: "block",
                    position: "absolute",
                    top: "calc(100% + .5rem)",
                    left: 0,
                    zIndex: 2,
                  }
                : {
                    display: "none",
                  }
            }
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                gap: 1,
                padding: 1,
                width: "fit-content",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow:
                  "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  boxShadow:
                    "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {icons.map((i) => {
                const IconComponent = iconMap[i];
                return (
                  <Button
                    key={i}
                    variant="text"
                    sx={
                      icon == i
                        ? {
                            border: "1px solid #2fa084",
                          }
                        : {
                            border: "1px solid rgba(0, 0, 0, 0)",
                          }
                    }
                    onClick={(e) => iconButtonHandler(e, i)}
                  >
                    {IconComponent && <IconComponent />}
                  </Button>
                );
              })}
            </Box>
          </Box>
          <TextField
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            label="Título"
            variant="outlined"
            sx={{
              minWidth: "250px",
            }}
          />
          <TextField
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            required
            label="Descrição"
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: "250px",
            }}
          />
          <TextField
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            required
            type="date"
            label="Data de entrega"
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taskPersonal}
                onChange={(e) => setTaskPersonal(e.target.checked)}
              />
            }
            label="Pessoal"
          />
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e)}
            sx={{ height: "fit-content" }}
          >
            Adicionar
          </Button>
        </Box>
      </Box>
    </div>
  );
};
