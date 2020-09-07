import { Strategy } from "passport-local";
import passport from "passport";
import { Profile } from "../models/profiles";

passport.use(
  new Strategy((username: string, password: string, done) => {
    try {
      Profile.findOne({ email: username }, null, (err, profile) => {
        if (err) {
          return done(err);
        }
        if (profile) {
          const hasCorrectPassword = profile.verifyPassword(password);
          if (hasCorrectPassword) {
            return done(null, profile);
          }
        }
        return done(new Error("Profile not found"));
      });
    } catch (error) {
      done(error);
    }
  })
);
