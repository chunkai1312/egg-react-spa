# Egg-React SPA

[![CircleCI](https://circleci.com/gh/chunkai1312/egg-react-spa/tree/master.svg?style=svg)](https://circleci.com/gh/chunkai1312/egg-react-spa/tree/master)

> Starter Boilerplate SPA made with Egg and React

## Features

- Egg, Sequelize ORM (support for PostgreSQL, MySQL, SQLite and MSSQL)
- React, Redux, React Router
- Login, register and password reset
- Authentication with JWT
- Passport integration (Google, Facebook)
- Material UI

## Installation

Install dependencies.

```bash
$ npm install
```

Run database migration.

```
$ npx sequelize db:migrate
```

## Usage

### Development

Egg has integrated with assets tools by [egg-view-assets], so you don't have to start another command for serving assets.

```bash
$ npm run dev
```

`npm run dev` will start a dev server for assets that configured in `config.assets.devServer`.

### Production

Assets should be compiled before shipping.

```bash
$ npm run build
```

It will be generated to `app/public/dist` that hosted by Egg, due to the configration of `.webpackrc.js`.

Start Egg with prod environment.

```bash
$ npm start
```

## License

[MIT](LICENSE)

[egg-view-assets]: https://github.com/eggjs/egg-view-assets