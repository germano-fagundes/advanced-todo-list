import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function TaskMoreInfo({ className, task }) {
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
    <div className={className + " task-more"}>
      <Stack direction="row" spacing={1}>
        <Chip label={"Entrega: " + task.dueDate} variant="outlined" />
        <Chip label={situacao} variant="outlined" />
      </Stack>
      <Typography className="task-desc" variant="subtitle2">
        {task.description}
      </Typography>
    </div>
  );
}
