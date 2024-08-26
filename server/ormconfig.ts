import env from './src/util/env';

export default {
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  database: env.db.schm,
  username: env.db.user,
  password: env.db.pswd,
  entities: ['{src,dist}/entities/**/*.{js,ts}'],
  seeds: ['src/db/seeding/seeds/**/*{.ts,.js}'],
  factories: ['src/db/seeding/factories/**/*{.ts,.js}'],
  synchronize: false
}