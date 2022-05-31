# base-node-api

## Description

**Node API using express, sequelize and docker. All set up, ready to be used.**

## What is required?

 - [npm](https://docs.npmjs.com/cli/v8/commands/npm-install)
 - [Docker](https://docs.docker.com/engine/install/)
 - [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the project

```console
$ git clone https://github.com/emanoelucas/node-base-api.git
```

2. Jump in

```console
$ cd base-node-api
```

3. Install dependencies

```console
$ npm install
```

4. Fix dependencies (*optional*)

```console
$ npm audit fix
```

5. Build application

```console
$ npm run build
```

6. Build and run application on docker

```console
$ docker-compose up
```

> make sure you have the right permissions to use docker

## Docker commands


Add a new module to the node application service container

```console
$ docker-compose run node npm install $(arg)
```

Build or rebuild services.

```console
$ docker-compose build
```

Builds, (re)creates, starts, and attaches to containers for a service

```console
$ docker-compose up
```

Stops containers and removes containers

```console
$ docker-compose down
```

Removes stopped service containers

```console
$ docker-compose rm base-node-api_dbdata
```

## Sequelize commands

Run migrations

```console
$ docker-compose run node npx sequelize db:migrate
```

Undo migrations

```console
$ docker-compose run node npx sequelize db:migrate:undo:all
```

Run seeds

```console
$ docker-compose run node npx sequelize db:seed:all
```

## Deploy on Heroku

1. Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Create an app on [Heroku](https://dashboard.heroku.com/apps).

3. Install Heroku Postgres add-ons

4. Set up the enviroment variables on settings options

5. Log in

```console
$ heroku login
```

6. Use Git to clone your app source code to your local machine.

```console
$ heroku git:clone -a {{APP_NAME}}
```

7. Deploy them to Heroku using Git.

```console
$ git push heroku master
```

> The application will be runnin on https://{{APP_NAME}}.herokuapp.com/