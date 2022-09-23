<p align="center">
  <a href="#" target="blank"><img src="./public/static/media/logoGKJW.png" width="200" alt="GKJW Logo" /></a>
</p>

# API Youth GKJW Segaran Dlanggu

## Documentation List
- **[auth](#auth)**
- **[users](#users)**
- **[roles](#roles)**
- **[carousels](#carousels)**
- **[youtube contents](#youtubes)**

#

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

#

## Documentation API
#### API URL : http://127.0.0.1:8000/api/
## Auth
- **Login**
  ```
  POST | http://127.0.0.1:8000/api/auth/login
  ```
  Body :
  ```
  {
    "email": "string",
    "password": "string"
  }
  ```
  #
- **Logout**
  ```
  GET | http://127.0.0.1:8000/api/auth/logout
  ```
  #
## Users
- **Create User**
  ```
  POST | http://127.0.0.1:8000/api/user/create
  ```
  Body :
  ```
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "roles": [1, 2] //array role id
  }
  ```
  #
- **Get All Users**
  ```
  GET | http://127.0.0.1:8000/api/user/getAll
  ```
  #
- **Get User**
  ```
  GET | http://127.0.0.1:8000/api/user/getOne/:id
  ```
  #
- **Update user**
  ```
  PATCH | http://127.0.0.1:8000/api/user/update/:id
  ```
  Body :
  ```
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "roles": [1, 2] //array role id
  }
  ```
  #
- **Delete user**
  ```
  DELETE | http://127.0.0.1:8000/api/user/delete/:id
  ```
  #
- **Delete Many user**
  ```
  DELETE | http://127.0.0.1:8000/api/user/delete/:id
  ```
  Body :
  ```
  {
    "ids": [1, 2, 3] //array users id
  }
  ```
  #
## Roles
- **Create Role**
  ```
  POST | http://127.0.0.1:8000/api/role/create
  ```
  Body :
  ```
  {
    "name": "string"
  }
  ```
  #
- **Get All Roles**
  ```
  GET | http://127.0.0.1:8000/api/role/getAll
  ```
  #
- **Get Role**
  ```
  GET | http://127.0.0.1:8000/api/role/getOne/:id
  ```
  #
- **Update Role**
  ```
  PATCH | http://127.0.0.1:8000/api/role/update/:id
  ```
  Body :
  ```
  {
    "name": "string"
  }
  ```
  #
- **Delete Role**
  ```
  DELETE | http://127.0.0.1:8000/api/role/delete/:id
  ```
  #
- **Delete Many Roles**
  ```
  DELETE | http://127.0.0.1:8000/api/role/delete/:id
  ```
  Body :
  ```
  {
    "ids": [1, 2, 3] //array roles id
  }
  ```
  #