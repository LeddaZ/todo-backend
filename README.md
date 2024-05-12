# todo-backend

To-Do list API written in TypeScript.

## How to run this

Make sure you have [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.

This has been tested on Node 20 LTS.

```
git clone https://github.com/LeddaZ/todo-backend
cd todo-backend
# Rename .env.example to .env and fill in the MongoDB connection string, port and JWT secret
# WARNING: Changing the JWT secret will invalidate existing accounts
npm i
npm run dev
```
