import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
};

export default function TaskMoreInfo({ task }) {
  let situacao;
  switch (task.status) {
    case "registered":
      situacao = "Cadastrada";
      break;
    case "in-progress":
      situacao = "Em andamento";
      break;
    case "done":
      situacao = "Concluída";
      break;

    default:
      situacao = "Sem situação";
      break;
  }
  return (
    <Box sx={{ padding: "0 0 1rem 1rem" }}>
      <Stack direction="row" spacing={1}>
        <Chip
          label={"Entrega: " + formatDate(task.dueDate)}
          variant="outlined"
        />
        <Chip label={situacao} variant="outlined" />
      </Stack>
      <Typography variant="subtitle2" sx={{ padding: "0.5rem 0 0 1rem" }}>
        {task.description}
      </Typography>
    </Box>
  );
}
