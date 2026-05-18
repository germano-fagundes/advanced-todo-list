import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert": async function ({
    icon,
    primary,
    description,
    dueDate,
    personal,
  }) {
    const user = await Meteor.users.findOneAsync(this.userId);
    const username = user?.username;
    return TasksCollection.insertAsync({
      icon,
      primary,
      secondary: username,
      description,
      dueDate,
      status: "registered",
      complete: false,
      personal,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.delete": async function ({ _id }) {
    const task = await TasksCollection.findOneAsync(_id);
    if (this.userId !== task.userId) return null;

    return TasksCollection.removeAsync(_id);
  },

  "tasks.toggle": async function ({ _id }) {
    const task = await TasksCollection.findOneAsync(_id);
    if (this.userId !== task.userId) return null;

    const taskStatus = !task.complete ? "done" : "registered";

    return TasksCollection.updateAsync(_id, {
      $set: { complete: !task.complete, status: taskStatus },
    });
  },

  "tasks.update": async function ({
    _id,
    primary,
    description,
    status,
    dueDate,
  }) {
    const oldTask = await TasksCollection.findOneAsync(_id);
    const complete = status == "done";

    if (this.userId !== oldTask.userId) return null;
    const update = {};
    if (complete !== oldTask.complete) update.complete = complete;
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
