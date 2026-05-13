import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert": async function ({ icon, primary }) {
    const user = await Meteor.users.findOneAsync(this.userId);
    const username = user?.username;
    return TasksCollection.insertAsync({
      icon,
      primary,
      secondary: username,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
});
