# Survey Poll App

A basic Survey/Poll application built with Node.js and Prisma.

## Overview

The application allows users to create and participate in surveys. Each survey consists of one or more questions, and each question can have multiple options. Users can select an option to vote in a survey.

## Features

- Create a new survey
- Get a list of all surveys
- Get details of a specific survey
- Vote in a survey
- Get the results of a survey
  
## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have installed Prisma CLI.
- You have a PostgreSQL database setup.

## API Endpoints

The application provides the following endpoints:

- `GET /surveys`: Fetch all surveys.
- `POST /surveys`: Create a new survey.
- `GET /surveys/:id`: Fetch a specific survey.
- `PUT /surveys/:id`: Update a specific survey.
- `DELETE /surveys/:id`: Delete a specific survey.


## Tech Stack

- Node.js: JavaScript runtime
- Express.js: Web application framework
- Prisma: Next-generation Node.js and TypeScript ORM
- Jest: JavaScript testing framework

## Getting Started

Please follow the standard instructions to initiate a node app


- Clone the repo
  

1.Change your directory
```
cd survey-poll-app
```

2.Initiate a node app
```
npm init -y
```

3.Install dependencies
```
npm install express prisma 
```

4. Create Prisma schema file(you can directly paste the provided schema into it.make sure to provide db url)
```
npx prisma init
```

5. Configure Database Connection
In the schema.prisma file, update env("DATABASE_URL") with your actual PostgreSQL database connection URL.

6. Generate Prisma Client  
```
npx prisma generate
```
Now you can use prisma client in your code

7. Apply migrations
```
npx prisma migrate dev --name  <name for you migration>
```