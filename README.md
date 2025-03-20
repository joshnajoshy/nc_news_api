# NC News Seeding

Link to hosted version of nc_news_api https://nc-news-api-579d.onrender.com/

This project has built an API which can access data programmatically. This API provides information for frontend development.

Please clone and open the repository on VS Code in order to follow a few steps to get the api running successfully.

1- Please use npm install command on terminal to install nessessery packages

2- Please ensure that all dependencies are installed and listed in package.json
    - Jest (npm install --save-dev jest)
    - Express (npm install express)
    - dotenv (npm i dotenv)
    - postgres (npm install pg)
    - pg-format (npm i pg-format)

3- In order to run the code succefully a .env.test and a .env.development file needs to be created in order to access the database.

4- Inside the .env.test file the value PGDATABASE=nc_news_test need to be added to access the test database 

5- Inside the .env.development file the value of PGDATABASE=nc_news needs to be added to access the development database.

6- run command npm run setup-dbs to setup database 

7- run command npm run seed-dev to seed the database

8- to run tests use command npm test to run all tests

