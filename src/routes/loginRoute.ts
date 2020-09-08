import { Router, Request, Response } from "express";
import passport from "passport";
import { IProfile } from "../models/profiles";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  // const toBeExecuted = passport.authenticate( strategy , done appelé par la stratégie )
  // toBeExecuted(req, res)
  passport.authenticate("local", (err, profile: IProfile) => {
    if (err) return res.status(500).send("Il y a eu une erreur");
    if (profile) {
      // Creer une session avec req.logIn / express Session
      req.logIn(profile, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Erreur pendant la connexion");
        }
        return res.send(profile);
      });
    } else {
      return res.status(401).send("Il y a eu une erreur");
    }
  })(req, res);
});

export default router;
