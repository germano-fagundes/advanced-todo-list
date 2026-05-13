import { Meteor } from "meteor/meteor";
import { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Brightness5Icon from "@mui/icons-material/Brightness5";

const icons = [
  "AccessAlarmIcon",
  "AccountCircleIcon",
  "ArrowForwardIcon",
  "AutoFixHighIcon",
  "DeleteIcon",
  "FolderIcon",
  "Brightness5Icon",
];

const iconMap = {
  AccessAlarmIcon,
  AccountCircleIcon,
  ArrowForwardIcon,
  AutoFixHighIcon,
  DeleteIcon,
  FolderIcon,
  Brightness5Icon,
};

export const TaskForm = () => {
  const [task, setTask] = useState("");
  const [icon, setIcon] = useState("");
  const user = useTracker(() => Meteor.user());

  const iconButtonHandler = (e, i) => {
    e.preventDefault();
    setIcon(i);
    console.log(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.callAsync("tasks.insert", {
      icon,
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
