<img width="1352" alt="image" src="https://github.com/user-attachments/assets/5379bda9-7c74-4b23-9115-d4b7ab913a8d">
<img width="1374" alt="image" src="https://github.com/user-attachments/assets/698afb36-c970-4bbc-b8b4-9e7e7f2ec55b">

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

# Logs
The system will log every notification for each user subscribed.
