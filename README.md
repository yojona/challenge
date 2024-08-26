<img width="1357" alt="image" src="https://github.com/user-attachments/assets/a2dc6cc8-4cc1-4100-9e46-96588808239a">

# Prerequisites
Make sure you have Docker installed, the seeds will run automatically

# How to run
Execute the following command:
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
