import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods";
import { Accounts } from "meteor/accounts-base";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SEED_USERNAME = "username";
const SEED_PASSWORD = "password";

const insertTask = (task, user) => {
  TasksCollection.insertAsync({
    icon: task.icon,
    primary: task.primary,
    secondary: SEED_USERNAME,
    description: task.description,
    dueDate: task.dueDate,
    status: "registered",
    complete: false,
    createdAt: new Date(),
    userId: user._id,
  });
};

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  await TasksCollection.removeAsync({});

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      {
        icon: "ShoppingCartIcon",
        primary: "Fazer as compras do mês no supermercado",
        description: "Uma tarefa essencial de organização doméstica.",
        dueDate: new Date(),
      },
      {
        icon: "EventIcon",
        primary: "Marcar consulta anual no dentista",
        description: "Focada em saúde e manutenção preventiva.",
        dueDate: new Date(),
      },
      {
        icon: "EmailIcon",
        primary: "Responder e-mails pendentes da semana",
        description:
          "Comum para qualquer pessoa que lida com comunicação digital ou trabalho.",
        dueDate: new Date(),
      },
      {
        icon: "FitnessCenterIcon",
        primary: "Treino de 30 minutos na academia",
        description: "Representa metas de bem-estar e atividades físicas.",
        dueDate: new Date(),
      },
    ].forEach((task) => insertTask(task, user));
  }
});
