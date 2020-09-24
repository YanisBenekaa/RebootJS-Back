import { NextFunction, Request, Response, Router } from "express";
import twilio from "twilio";
import { authenticationRequired } from "../middlewares/authenticationRequired";
import { configuration } from "../config";

const router = Router();
const { twilio_auth_sid, twilio_auth_token } = configuration();

const client = twilio(twilio_auth_sid, twilio_auth_token);

router.get(
  "/ice-servers",
  authenticationRequired,
  async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const iceServersConfig = await client.tokens.create();
      res.json(iceServersConfig);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
