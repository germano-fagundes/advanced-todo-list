import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert": async function ({ icon, primary, description, dueDate }) {
    const user = await Meteor.users.findOneAsync(this.userId);
    const username = user?.username;
    return TasksCollection.insertAsync({
      icon,
      primary,
      secondary: username,
      description,
      dueDate,
      status: "registered",
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

  "tasks.update": async function ({
    _id,
    primary,
    description,
    status,
    dueDate,
  }) {
    const task = await TasksCollection.findOneAsync(_id);
    for (let i = 1; i < arguments.length; i++) {
      let newValue;
      if (arguments[i] !== "" && arguments[i] != null) {
        newValue = arguments[i];
        TasksCollection.updateAsync(_id, {
          $set: { newValue },
        });
      }
    }
  },
});
