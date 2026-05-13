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
  const [task, setTask] = useState("");
  const [icon, setIcon] = useState("");
  const user = useTracker(() => Meteor.user());

  const iconButtonHandler = (e, i) => {
    e.preventDefault();
    setIcon(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task == "") return;
    Meteor.callAsync("tasks.insert", {
      icon: icon || "CheckCircleIcon",
      primary: task.trim(),
    });
    setIcon("");
    setTask("");
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
          placeholder="Digite para adicionar mais tarefas"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};
