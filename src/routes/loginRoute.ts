import { Router, Request, Response } from "express";
import passport from "passport";
import { IProfile } from "../models/profiles";
import { ProfileNotFoundError } from "../controllers/authentification";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  // const toBeExecuted = passport.authenticate( strategy , done appelé par la stratégie )
  // toBeExecuted(req, res)
  passport.authenticate("local", (err, profile: IProfile) => {
    if (err) {
      if (err instanceof ProfileNotFoundError) {
        return res.status(404).send("Profile not found");
      } else {
        return res.status(500).send("Il y a eu une erreur");
      }
    }
    if (profile) {
      // Creer une session avec req.logIn / express Session
      req.logIn(profile, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Erreur pendant la connexion");
        }
        return res.send(profile.getSafeProfile());
      });
    } else {
      return res.status(401).send("Il y a eu une erreur");
    }
  })(req, res);
});

export default router;
