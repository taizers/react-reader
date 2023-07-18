# Task Manager

This is backend for intership project

## Local env requirements

- Node.js 16
- PostgreSQL 14

## Setup local

1. Create the database:

    ```

    psql postgres
    create user react with password '1234';
    alter user react with superuser;
    create database reactreader with owner = react;
    grant all privileges on database reactreader to react;
    alter user react createdb;
    exit

    ```

1. Istall modules `npm install`
2. Create `.env` file based on `.env.examle`
3. Run server `npm run start`