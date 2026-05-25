import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Button, MenuItem, TextField, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const statuses = [
  {
    value: "registered",
    label: "Cadastrada",
  },
  {
    value: "in-progress",
    label: "Em andamento",
  },
  {
    value: "done",
    label: "Concluída",
  },
];

export const TaskEditor = ({ taskId, isBeingEdited, resetEditingTaskId }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("registered");
  const [date, setDate] = useState("");

  const styles = isBeingEdited
    ? {
        transition: "max-height 0.5s ease-in-out, opacity 0.2s ease-in-out",
        opacity: 1,
        maxHeight: "999px",
      }
    : {
        maxHeight: 0,
        opacity: 0,
        transition: "max-height 0.5s ease-in-out, opacity 0.2s ease-in-out",
      };

  const handleSubmit = (_id) => {
    Meteor.callAsync("tasks.update", {
      _id: _id,
      primary: name.trim(),
      description: desc.trim(),
      status: status,
      completed: status == "done",
      dueDate: date,
    });
    resetEditingTaskId();
  };

  return (
    <Box sx={styles}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        label="Nome"
        variant="outlined"
      />
      <TextField
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        margin="normal"
        label="Descrição"
        multiline
        variant="outlined"
      />
      <TextField
        onChange={(e) => setStatus(e.target.value)}
        margin="normal"
        select
        label="Situação"
        defaultValue="registered"
      >
        {statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        // returns "YYYY-MM-DD"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        type="date"
        label="Data de entrega"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        startIcon={<CheckIcon />}
        onClick={() => handleSubmit(taskId)}
      >
        Alterar
      </Button>
    </Box>
  );
};
