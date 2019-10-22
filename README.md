<p align="center">
  <img src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png">
</p>

This application is about gym management and the main goal is to study about Node JS, ReactJS and React Native using the newest technologies in development.

This is part of a training, and the code will be used to certifies my knowledge at the end of Rocketseat GoStack training.

---
# Setup

To run the application is necessary a PostgreSQL database running.
Create a .env file in root patch and set the following environment variables:

```
  SERVER_PORT=server port //default 3000
  DB_DIALECT=database dialect
  DB_HOST=database host
  DB_USERNAME=database username
  DB_PASSWORD=database password
  DB_NAME=database name
  AUTH_SECRET=Secret key for generate token
  AUTH_EXPIRES_IN=Time to expire the token
```

## Creating Database
To create the database run the following commands:

```terminal
  yarn
  yarn sequelize db:migrate
  yarn sequelize db:seed:all
```

A default user will be created with the email admmin@gympoint.com and password **123456**.

