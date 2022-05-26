# node-base-api

## Description

**Node API using express, sequelize and docker. All set up, ready to be used.**

## What is required?

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

## Deploy