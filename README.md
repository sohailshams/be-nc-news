# News API Backend

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

## Local Deployment

To run this project locally one has to create environment variables as below;

- Create **.env.test** file and add **PGDATABASE=nc_news_test** in it.
- Create **.env.development** file and add **PGDATABASE=nc_news** in it.
- Now run **npm install**.
