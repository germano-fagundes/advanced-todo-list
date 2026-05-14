import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const status = [
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

export const TaskEditor = ({ task, className }) => {
  return (
    <div className={className}>
      <TextField margin="normal" label="Nome" variant="outlined" />
      <TextField
        margin="normal"
        label="Descrição"
        multiline
        variant="outlined"
      />
      <TextField
        margin="normal"
        select
        label="Situação"
        defaultValue="registered"
      >
        {status.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        type="date"
        label="Data de entrega"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        variant="outlined"
      />
    </div>
  );
};
