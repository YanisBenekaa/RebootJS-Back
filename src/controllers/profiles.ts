import { Profile, IProfile } from "../models/profiles";

export function getProfile(profileId: string): Promise<IProfile | null> {
  return Profile.findById(profileId).then((profile) => profile);
}

export function getAllProfiles(): Promise<IProfile[]> {
  return Profile.find({}).then((profiles) => profiles);
}

export function updateProfile(
  profile: IProfile,
  email: string,
  firstname: string,
  lastname: string,
  password?: string
): Promise<IProfile | null> {
  if (password) profile.setPassword(password);
  return Profile.findByIdAndUpdate(profile._id, {
    email,
    firstname,
    lastname,
  }).then((profile) => profile);
}
