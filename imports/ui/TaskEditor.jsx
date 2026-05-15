import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
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

export const TaskEditor = ({ task, className, resetEditingTaskId }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("registered");
  const [date, setDate] = useState("");

  const handleSubmit = (_id) => {
    resetEditingTaskId();
    Meteor.callAsync("tasks.update", {
      _id,
      primary: name,
      description: desc,
      status,
      dueDate: date,
    });
  };

  return (
    <div className={className}>
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
        onClick={handleSubmit}
      >
        Alterar
      </Button>
    </div>
  );
};
