# How to run
Make sure you have docker installed, then execute the following command:
> docker compose up -d

make sure `DB_HOST` in `server/.env` points to the container name of the database, it's set to `notify-database-1` by default

# Technologies
- UI
  - React
  - Chakra UI

- Backend
  - Express
  - TypeORM
  - Postgress

- Others
    - Docker