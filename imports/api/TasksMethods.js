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
    const update = {};
    const oldTask = await TasksCollection.findOneAsync(_id);
    if (primary !== undefined && primary !== "" && primary !== null)
      update.primary = primary;
    if (description !== undefined && description !== "" && description !== null)
      update.description = description;
    if (status !== oldTask.status) update.status = status;
    if (dueDate !== undefined && dueDate !== "" && dueDate !== null)
      update.dueDate = dueDate;
    if (Object.keys(update).length === 0) return null;
    return TasksCollection.updateAsync(_id, { $set: update });
  },
});
