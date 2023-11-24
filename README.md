# Northcoders News API

## Link to the hosted version.

Use the below link to interact with hosted application

- link: https://news-back-end.onrender.com/api

## Summary of this project

- This is an API for the purpose of accessing application data programmatically.
- This application service is the mimic of the building of a real world backend service which should provide this information to the front end architecture.
- The database used is PSQL, and interacting with it using node-postgres.

## Instructions of how to clone, install dependencies, seed local database, and run tests

- Clone this repository on your local devcie
- Create env files for development and test environment
- Install dependencies using `npm install` command
- Install psql
- Seed the local database using `npm run seed` command
- Run `npm test` to run the tests for alll endpoints
- Run `npm start` to run the server

## Setup of env files

Please follow below steps to setup the project locally

- Create two .env files `.env.development` and `.env.test` and add `PGDATABASE=<name_of_the_database>`, with the correct database name for that environment (see /db/setup.sql for the database names).
- Run npm install at this point.

## Minimum versions of Node.js, and Postgres needed to run the project.

- Node,js: v20.8.0
- psql (PostgreSQL): 14.9
