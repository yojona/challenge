import 'reflect-metadata';
import express from 'express';
import { createConnection  } from 'typeorm';
import router from './routes';
import env from './util/env';
const app = express();

createConnection({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pswd,
  database: env.db.schm,
  entities: ['{src,dist}/entities/**/*.{js,ts}'],
  synchronize: true
});

app.use(express.json());
app.use(router);
app.listen(env.app.port, () => console.log(`Server listening at port ${env.app.port}`));
