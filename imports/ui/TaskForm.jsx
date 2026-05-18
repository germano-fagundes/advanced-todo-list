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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
};

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPersonal, setTaskPersonal] = useState(false);
  const [icon, setIcon] = useState("");
  const user = useTracker(() => Meteor.user());

  const iconButtonHandler = (e, i) => {
    e.preventDefault();
    setIcon(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName == "") return;
    Meteor.callAsync("tasks.insert", {
      icon: icon || "CheckCircleIcon",
      primary: taskName.trim(),
      description: taskDesc.trim(),
      dueDate: taskDueDate.trim(),
      personal: taskPersonal,
    });
    setIcon("");
    setTaskName("");
    setTaskDesc("");
    setTaskDueDate("");
    setTaskPersonal(false);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>Ícones</button>
        <div className="icons">
          {icons.map((i) => {
            const IconComponent = iconMap[i];
            return (
              <button key={i} onClick={(e) => iconButtonHandler(e, i)}>
                {IconComponent && <IconComponent />}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Nome"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />

        <input
          type="date"
          placeholder="Data de entrega"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />

        <FormControlLabel control={<Checkbox />} label="Pessoal" />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};
