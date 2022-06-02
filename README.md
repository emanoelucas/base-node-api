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

7. Run migrations

```console
$ docker-compose run node npx sequelize db:migrate
```

## Docker dev commands


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

## Sequelize dev commands

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

2. Log in

```console
$ heroku login
```

3. Create an app on [Heroku](https://dashboard.heroku.com/apps) or use Heroku CLI (app's name must be unique):

```console
$ heroku apps:create {{APP_NAME}}
```

4. Install Heroku Postgres add-ons

```console
$ heroku addons:create heroku-postgresql:hobby-dev
```

5. Get postgres database credentials

```console
$ heroku pg:credentials:url DATABASE
```

> output example: dbname=xxxxxxxx host="link" port=5432 user=yyyyyyyy password=zzzzzzzz sslmode=require

6. Set up the enviroment variables as in the .env file, remember to use heroku postgres database credentials instead and set 'SERVER_HOST=heroku'. 
  
 - you can use UI https://dashboard-classic.heroku.com/apps/{{APP_NAME}}/settings
 
 - or edit directly on terminal

```console
$ heroku config:edit -a {{APP_NAME}}
```

 - or set one by one

```console
$ heroku config:set DB_DATABASE=xxxxxxxx
$ heroku config:set DB_USERNAME=yyyyyyyy
$ heroku config:set DB_PASSWORD=zzzzzzzz

and so on ...
```

7. Add a remote to your local repository

```console
$ heroku git:remote -a {{APP_NAME}}
```

8. Deploy them to Heroku using Git.

```console
$ git push heroku master
```

> The application will be running on https://{{APP_NAME}}.herokuapp.com/

9. See the logs

```console
$ heroku logs --tail
```