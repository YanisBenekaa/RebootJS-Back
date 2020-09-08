import { Request, Response, Router } from "express";
import { Profile } from "../models/profiles";
import { authenticationRequired } from "../middlewares/authenticationRequired";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { email, firstname, lastname, password } = req.body;

  const newProfile = new Profile({
    email: email,
    firstname: firstname,
    lastname: lastname,
  });
  newProfile.setPassword(password);
  newProfile.save();

  res.send("Utilisateur créé");
});

router.get(
  "/:profileId",
  authenticationRequired,
  (req: Request, res: Response) => {
    const profileId = req.params["profileId"];

    Profile.findById(profileId, "_id email", (err, profile) => {
      if (err) {
        console.log("Il y a eu une erreur");
      }
      if (profile === null) {
        res.status(404);
        return;
      }

      res.send(profile);
    });
  }
);

export default router;
