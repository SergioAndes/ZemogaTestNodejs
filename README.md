# ZemogaTest
For this exercise, I created two applications corresponding to each point of the test. In this repo you will find two branches named 'part1' and 'part2' where the code for each project is stored;

## Deployment diagram
I drew this diagram to show how the architecture of the exercise is.

![alt text](https://twitterbucketsergio.s3.amazonaws.com/Blank+diagram+(1).png)

Atlas (mongodb cloud) was used as a database, and S3 was used to store the user's profile pictures

## Part 1 
I created a NodeJS aplication using express. I used de MCV desing pattern to develop this application. I created a simple unit test using Jest. For the views I used ejs

## Part 2
I created an Azure function (Nodejs serverless) with the two enpoints requested. This functions are already deployed and ready to be used.


## How to Use
You need to have installed node version 16 or greater

- Download repo from branch part1, then 

> npm i (to install dependencies)
> 
> npm start

- There are 3 users in the database with the following unique keys (their twitter userNames):
> petrogustavo
> 
> RHpresidente
> 
> FicoGutierrez
- To see their latest 5 tweets use: http://localhost:4000/user/{uniqueKey}   (the uniqueKey is caseSensitive)
- To get treir profile informarion use: https://sergiofunction.azurewebsites.net/api/getProfile/{uniqueKey}
- To update open potman and send a form data to: PATCH https://sergiofunction.azurewebsites.net/api/updateProfile The userId key is mandatory, you can find it in the last request

![alt text](https://twitterbucketsergio.s3.amazonaws.com/Screenshot+2022-06-12+234953.png)

## Postman
This is the postman collection with the 4 endpoins used in this exercise https://www.getpostman.com/collections/cd804a7b38bbb4d7f858
