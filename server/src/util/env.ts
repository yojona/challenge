import * as envvars from 'env-var';
import * as dotenv from 'dotenv';

// Read in the .env file if exists
dotenv.config();

export default {
  app: {
    port: envvars.get('PORT').required().asPortNumber(),
  },
  db: {
    host: envvars.get('DB_HOST').required().asString(),
    port: envvars.get('DB_PORT').required().asPortNumber(),
    user: envvars.get('DB_USER').required().asString(),
    pswd: envvars.get('DB_PSWD').required().asString(),
    schm: envvars.get('DB_SCHM').required().asString(),
  }
};
