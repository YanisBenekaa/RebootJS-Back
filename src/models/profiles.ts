import { Document, Schema, model, Model } from "mongoose";
import { SHA256 } from "crypto-js";

export interface IProfile extends Document {
  email: string;
  lastname: string;
  firstname: string;
  conversationSeen: { [conversationId: string]: string };
  getFullname: () => string;
  setPassword: (password: string) => void;
  verifyPassword: (password: string) => boolean;
  getSafeProfile: () => ISafeProfile;
  updateSeen: (conversationId: string, seenDate: string) => void;
}

export type ISafeProfile = Pick<
  IProfile,
  "_id" | "email" | "lastname" | "firstname" | "conversationSeen"
>;

const profileSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  conversationSeen: { type: Object },
});

profileSchema.methods.getFullname = function () {
  return `${this.firstname} ${this.lastname}`;
};

profileSchema.methods.getSafeProfile = function (): ISafeProfile {
  const { _id, email, lastname, firstname, conversationSeen } = this;
  return { _id, email, lastname, firstname, conversationSeen };
};

profileSchema.methods.setPassword = function (password: string) {
  this.password = SHA256(password).toString();
};

profileSchema.methods.verifyPassword = function (password: string) {
  return this.password === SHA256(password).toString();
};

profileSchema.methods.updateSeen = function (
  conversationId: string,
  seenDate: string
) {
  this.conversationSeen = {
    ...this.conversationSeen,
    [conversationId]: seenDate,
  };
};

export const Profile = model<IProfile, Model<IProfile>>(
  "profile",
  profileSchema
);
