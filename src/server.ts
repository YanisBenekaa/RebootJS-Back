import express, { Request, Response, ErrorRequestHandler, request } from 'express';
import morgan from "morgan";
import helmet from "helmet";
import { configuration, IConfig } from "./config";
import { connect } from './database';
import { Profile } from './models/profiles';

export function createExpressApp(config: IConfig): express.Express {
  const { express_debug } = config;

  const app = express();

  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());

  app.use(((err, _req, res, _next) => {
    console.error(err.stack);
    res.status?.(500).send(!express_debug ? 'Oups' : err);
  }) as ErrorRequestHandler);

  app.get('/', (req: Request, res: Response) => { res.send('This is the boilerplate for Flint Messenger app') });

  app.post('/profile', (req: Request, res: Response) => {
    const {email, firstname, lastname } = req.body;

    const newProfile = new Profile({email: email, firstname: firstname, lastname: lastname})
    newProfile.save();
    res.send('Utilisateur créé');
  })

  return app;
}

const config = configuration();
const { PORT } = config;
const app = createExpressApp(config);
connect(config).then(
  () =>  { app.listen(PORT, () => console.log(`Flint messenger listening at ${PORT}`)) }
);
