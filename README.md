# Storefront Backend Project

A storeFront backend API written in NodeJS.

## Getting Started
This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm` in your terminal at the project root.

### INSTALLING
Run this command to install dependencies ==> npm i \n

You will need to install Pg Admin

#### Setup environment
Create a (.env) file with the required environment variables:
    jwtPrivateKey=your secret key for jwt token
    SALT=salt round for hashing
    NODE_ENV=test
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=database's name for development
    DB_DATABASE_TEST=database's name for testing
    DB_USER=database's user name
    DB_PASSWORD=database's password

##### Start the server
Run this command to build ==> npm run build
Run this command to create the dev database ==> npm run createDevDb
Run this command to create the test database ==> npm run createTestDb
Run this command to start the server ==> npm run start
Run this command to start the testing environment ==> npm run test
Run this command to reset the migrate ==> npm run migrationReset