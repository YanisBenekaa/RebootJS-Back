import { Profile, IProfile } from "../models/profiles";

export function getProfile(profileId: string): Promise<IProfile | null> {
  return Profile.findById(profileId).then((profile) => profile);
}

export function getAllProfiles(): Promise<IProfile[]> {
  return Profile.find({}).then((profiles) => profiles);
}
