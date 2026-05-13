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
      complete: false,
    });
  },

  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },

  "tasks.toggle": async function ({ _id }) {
    const task = await TasksCollection.findOneAsync(_id);
    return TasksCollection.updateAsync(_id, {
      $set: { complete: !task.complete },
    });
  },
});
