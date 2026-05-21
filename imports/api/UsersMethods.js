import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "users.setImage": async function (base64) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    check(base64, String);
    if (base64.length > 2 * 1024 * 1024 * 1.4)
      throw new Meteor.Error("file too large");
    await Meteor.users.updateAsync(this.userId, {
      $set: { "profile.image": base64 },
    });
    console.log("image set successfully");
  },
});
