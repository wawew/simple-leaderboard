# Simple Profile Commenting System

## Table of Contents
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Base URL](#base-url)
  - [Authorization](#authorization)
  - [Endpoints](#endpoints)

## Setup

### Prerequisites
- Docker Compose

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/wawew/simple-leaderboard.git
   ```
2. Navigate to the project directory:
   ```
   cd simple-leaderboard
   ```
3. Create `config.ts` file in `src` directory. You can use the `config.example.ts` file as a template.
4. Create a `.env` file in the root directory and add your environment variables. You can use the `.env.example` file as a template.

## Running the Application
To run the application with docker compose, use the following command:
```
docker compose up
```
The application will start, and you can access it at `http://localhost:3000`.

## API Endpoints

### Base URL
`http://localhost:3000`

### Authorization
Some endpoints in this API require bearer token for authorization in the request headers. Endpoints requiring authorization:
- **POST /scores**
- **GET /leaderboard**

### Endpoints

- **POST /login**: Authentication to get the token bearer.
  - Request Body:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
  - Response:
    ```json
    {
        "token": "string"
    }
    ```
- **POST /scores**: Submit user score.
  - Request Body:
    ```json
    {
        "score": 0,
        "playerId": "string"
    }
    ```
  - Response:
    ```json
    {
        "message": "string"
    }
    ```
- **GET /leaderboard**: Get player leaderboard for 10 highest scores.
  - Response:
    ```json
    {
      "leaderboards": [
        {
          "name": "string",
          "score": 0
        }
      ]
    }
    ```
