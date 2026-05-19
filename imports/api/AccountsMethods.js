import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

Accounts.validateNewUser((user) => {
  new SimpleSchema({
    _id: { type: String },
    emails: { type: Array },
    "emails.$": { type: Object },
    "emails.$.address": { type: String, regEx: SimpleSchema.RegEx.Email },
    createdAt: { type: Date },
    profile: { type: Object },
    "profile.firstName": { type: String },
    "profile.surname": { type: String },
    "profile.birthDate": { type: Date },
    "profile.gender": { type: String },
    "profile.company": { type: String },
  }).validate(user);
  return true;
});

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile;
  user.profile.firstName = options.firstName;
  user.profile.surname = options.surname;
  user.profile.birthDate = options.birthDate;
  user.profile.gender = options.gender;
  user.profile.company = options.company;
  return user;
});

Meteor.methods({
  "accounts.create": async function ({
    firstName,
    surname,
    email,
    password,
    birthDate,
    gender,
    company,
    createdAt,
  }) {
    if (!(await Accounts.findUserByEmail(email))) {
      Accounts.createUser({
        firstName,
        surname,
        email,
        password,
        birthDate,
        gender,
        company,
        createdAt,
      });
    }
  },
});
