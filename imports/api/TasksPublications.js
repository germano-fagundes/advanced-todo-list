import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  return TasksCollection.find({
    $or: [{ personal: false }, { userId: this.userId }],
  });
});

Meteor.publish("tasks.edit", function () {
  return TasksCollection.find({ userId: this.userId });
});
