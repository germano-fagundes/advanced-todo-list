import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods";
import "../imports/api/UsersMethods";
import { Accounts } from "meteor/accounts-base";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SEED_EMAIL = "email@email.com";
const SEED_PASSWORD = "password";

const insertTask = async (task, user, secondary) => {
  return TasksCollection.insertAsync({
    icon: task.icon,
    primary: task.primary,
    secondary,
    description: task.description,
    dueDate: task.dueDate,
    status: "registered",
    complete: false,
    personal: task.personal,
    createdAt: new Date(),
    userId: user._id,
  });
};

Meteor.startup(async () => {
  let userExists = true;
  if (!(await Accounts.findUserByEmail(SEED_EMAIL))) {
    userExists = false;
    const userId = await Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
      createdAt: new Date(),
      profile: {
        firstName: "Syna",
        surname: "",
        birthDate: new Date("2000-01-01"),
        gender: "female",
        company: "Synergia",
      },
    });
  }

  const user = await Accounts.findUserByEmail(SEED_EMAIL);

  if (!user) {
    throw new Meteor.Error("Seed user was not created");
  }

  const secondary = user.profile.firstName;

  const tasks = [
    {
      icon: "ShoppingCartIcon",
      primary: "Fazer as compras do mês no supermercado",
      description: "Uma tarefa essencial de organização doméstica.",
      dueDate: new Date(),
      personal: true,
    },
    {
      icon: "EventIcon",
      primary: "Marcar consulta anual no dentista",
      description: "Focada em saúde e manutenção preventiva.",
      dueDate: new Date(),
      personal: false,
    },
    {
      icon: "EmailIcon",
      primary: "Responder e-mails pendentes da semana",
      description:
        "Comum para qualquer pessoa que lida com comunicação digital ou trabalho.",
      dueDate: new Date(),
      personal: true,
    },
    {
      icon: "FitnessCenterIcon",
      primary: "Treino de 30 minutos na academia",
      description: "Representa metas de bem-estar e atividades físicas.",
      dueDate: new Date(),
      personal: false,
    },
  ];

  if (!userExists) {
    for (const task of tasks) {
      await insertTask(task, user, secondary);
    }
  }
});
