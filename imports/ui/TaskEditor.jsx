import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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

export const TaskEditor = ({ task, className, onSubmit }) => {
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
      <Button variant="contained" startIcon={<CheckIcon />} onClick={onSubmit}>
        Alterar
      </Button>
    </div>
  );
};
