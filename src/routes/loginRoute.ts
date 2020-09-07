import { Router, Request, Response } from "express";
import passport from "passport";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  // passport.authenticate( strategy , done appelé par la stratégie )
  passport.authenticate("local", (err, profile) => {
    // TODO
    if (err) return res.status(500).send("Il y a eu une erreur");
    if (profile) {
      // CREER UNE SESSION avec req.logIn / express Session
    } else {
      return res.status(401).send("Il y a eu une erreur");
    }
  });
});

export default router;