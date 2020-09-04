import { Document, Schema, model, Model } from "mongoose";

export interface IProfile extends Document {
    email: string;
    lastname: string;
    firstname: string;
}

const profileSchema = new Schema({
    email: { type: String, required: true, unique: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true}
});

export const Profile = model<IProfile, Model<IProfile>>("profile", profileSchema);

