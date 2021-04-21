## Introduction

Tic-tac-toe API that saves the state of the game.

Frontend of project: https://github.com/tomasbutkevicius/tic-tac-toe-front-end

## Installation

- Clone project from git repository

- Run project (With docker)
```bash
docker-compose up --build -d
```

## Usage

Go to the url: http://localhost:3000/boards to get history of boards.

Endpoints:
  - GET    /boards
  - POST   /boards
  - DELETE /boards
  - GET    /boards/latest

## Useful links 
- For docker setup 
  - (Mac)     https://docs.docker.com/docker-for-mac/install/
  - (Windows) https://docs.docker.com/docker-for-windows/install/
  
## Other
- Run tests
    ```bash
    npm test
    ```
- Run program locally without docker
   - create environment variable DB_CONNECTION for Mongo database
    ```bash
    npm install
    ```
    ```bash
    npm start
    ```
