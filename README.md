# News API Backend

- [Live Endpoints Link](https://nc-news-fnpf.onrender.com/api)
- [GitHub Repo](https://github.com/sohailshams/be-nc-news)

## Project Description

This project **(API's)** are build for the purpose of accessing application data programmatically. This backend provides following information to the front end architecture;

1. List of users
2. List of articles
3. List of topics
4. An individual article
5. List of comments associated with an article
6. Ability to post comment on an article
7. Ability to update an article by voting up or down
8. Ability to delete a comment

## Technologies Used

- [Node JS](https://nodejs.org/en)
- [Express JS](https://expressjs.com/) used to setup server.
- [dotenv](https://www.npmjs.com/package/dotenv) used to load environment variables from a .env into process.env.
- [PostgreSQL](https://www.postgresql.org/) used in development.
- [ElephantSQL](https://www.elephantsql.com/) used in production.
- [PostgreSQL Format](https://www.npmjs.com/package/pg-format) used to safely create dynamic SQL queries.
- [Jest](https://jestjs.io/) - [SuperTest](https://www.npmjs.com/package/supertest) and [Jest Sorted](https://www.npmjs.com/package/jest-sorted) are used for writing tests.
- [GitHub](https://github.com/) used for version control.
- [Render](https://www.render.com/) used as hosting platform to deploy this project endpoints.
- [VS Code](https://code.visualstudio.com/) used as code editor.

## Local Deployment

To run this project locally, first fork this [repo](https://github.com/sohailshams/be-nc-news) and clone to your local machine.

### Environment Variables

Next, create environment variables as below;

- Create **.env.test** file and add **PGDATABASE=nc_news_test** in it.
- Create **.env.development** file and add **PGDATABASE=nc_news** in it.
- Now run **npm install**

### Seed Databases

There are two databases included with this project, test database and developemt database. Please run following commands to seed databases;

- **npm run setup-dbs**
- **npm run seed**

### Credits

This project is part of [Northcoders](https://northcoders.com/) Software Development Bootcamp.

### Disclaimer

This project is for educational purposes only.
