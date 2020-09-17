import { Request, Response, Router } from "express";
import { authenticationRequired } from "../middlewares/authenticationRequired";
import * as messageController from "../controllers/messages";
import { IProfile } from "../models/profiles";

const router = Router();

router.get("/", authenticationRequired, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("You must be authenticated");
  }
  const messages = await messageController.getAllMessages(req.user as IProfile);
  return res.status(200).send(messages);
});

router.get(
  "/:conversationId",
  authenticationRequired,
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send("You must be authenticated");
    }
    const messages = await messageController.getAllMessages(
      req.user as IProfile,
      req.params["conversationId"]
    );
    return res.status(200).send(messages);
  }
);

router.post(
  "/",
  authenticationRequired,
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send("You must be authenticated");
    }
    const { conversationId, targets, content } = req.body;
    const user = req.user as IProfile;
    const message = await messageController.createMessage(
      conversationId,
      targets,
      user._id,
      content
    );
    return res.status(200).send(message);
  }
);

export default router;
