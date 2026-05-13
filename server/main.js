import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods";
import { Accounts } from "meteor/accounts-base";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const SEED_USERNAME = "username";
const SEED_PASSWORD = "password";

const insertTask = (task, user) => {
  TasksCollection.insertAsync({
    icon: task.icon,
    primary: task.primary,
    secondary: SEED_USERNAME,
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
        icon: "AccessAlarmIcon",
        primary: "Configurar alarme",
      },
      {
        icon: "AccountCircleIcon",
        primary: "Criar conta do Syntonia",
      },
      {
        icon: "ArrowForwardIcon",
        primary: "Endireitar a cadeira",
      },
      {
        icon: "AutoFixHighIcon",
        primary: "Consertar mesa",
      },
    ].forEach((task) => insertTask(task, user));
  }
});
