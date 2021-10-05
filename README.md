# Reload Health Technical Assessment

Technical assessment for Reload Health on Coderbyte.

1. A simple API with five routes:

   - Get all companies list
   - POST which receives a term to search a company
   - Get all desktops in all companies
   - Get all desktops in a company
   - Get all contributors in a company

2. Create a seed with knex from the dataset provided
3. Create a migration with knex from the data model
4. Set the Redis database, and make sure that the data doesn't expire
5. Using docker, create a docker-compose file to structure the databases (MySQL and Redis) and let the IP/ports linked in application.
6. Use environment variables in a .env (let the .env.example as a .env clone with data)

Stack:

- NodeJS
- Knex
- Restify
- Redis
- MySql
- Docker

Used some principles of clean architecture and SOLID.

## Instructions

### 1. Install dependencies

- yarn

### 2. Run tests

- yarn test

### 3. Copy .env.example to .env and config values

### 4. Provision infrastructure

- docker-compose up -d

### 5. Run application

- yarn dev

## Future works and improvements

Create a application layer to abstract implementations of infrastructure following clean or hexagonal architecture, improving testability and maintainability.

Improve usage of Knex in production due to the usage of the seed file to populate the companies table.

Check if seed with stream is properly used. In this case, the seed time to execute was similar in both cases. The memory usage was also similar.
