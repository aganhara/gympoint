<p align="center">
  <img src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png">
</p>

This application is about gym management and the main goal is to study about Node JS, ReactJS and React Native using the newest technologies in development.

This is part of a training, and the code will be used to certifies my knowledge at the end of Rocketseat GoStack training.

---
## Setup

To run the application is necessary a PostgreSQL database and Redis running.
Create a .env file in root patch and set the following environment variables.
You can change the file .env.example to .env and put your config values.

### Creating Database
To create the database run the following commands:

```shell
  yarn
  yarn sequelize db:migrate
  yarn sequelize db:seed:all
```

A default user will be created with the email admin@gympoint.com and password **123456**.

## To run the application execute the following commands on terminal

```shell
  yarn dev # Run the application using nodemon
  yarn queue  # Run bee-queue to execute tasks
```


