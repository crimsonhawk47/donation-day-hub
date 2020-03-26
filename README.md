# Donation Day Hub

## Description

_Duration: 2 Week Sprint_

We’ve designed a mobile application - the Donation Day Hub -  that allows this communication to happen in one centralized place, instead of through multiple text messages amongst the group of volunteers, as well as a massive influx of photos airdropped to Andrea.

To see the fully function site, please visit: [DONATION DAY HUB](http://touyeexiong.com/)

## Screen Shot

![Client Page View](/public/client-view.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

.env File
1. Create a file named .env - this file is important because it will be used to store all of the keys/passwords you need for this application.

AWS S3
1. Create an account at AWS S3 by clicking the link [here](https://aws.amazon.com/s3/).
2. After creating the account, follow the directions in this [article](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) to create an AWSAccessKeyId and AWSSecretKey.
3. Go to the .env file in the apllication and add the keys to their respective name like below.
> accessKeyId=AWSAccessKeyID
>
> secretAccessKey=AWSSecretKey
4. In your AWS dashboard, click on your Services at the top left of the screen and select S3 under the Storage section.
5. Here you'll need to create a bucket where you'll store the media. Keep a note of the name of the bucket and the region you selected (ex: ca-central-1). That information will also need to be added into the .env file as below:
> BUCKET_REGION=
>
> BUCKET_NAME=

Database 
1. Create a database named `intersection`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
### Admin View
1. Log in as an administrator
2. You'll be brought to the admin page where you can filter through Volunteers, Clients, and Teams.
3. Volunteers Page
-  You can search for a volunteer by their name. This view lets you see the date that they joined, their name, and their team status. Team status tells the admin if a volunteer is on a team and if they're a captain or not.
- Clicking on a volunteer will give the admin the ability to see contact information. You can also view the current team the admin is in.

4. Clients Page
- You can search for a client by their name. This view lets you see when they were added into the system.
- Clicking on the client, you can see their bio, shopping list, media button, and any comments the team has left.
- Clicking on the camera icon, you can see the media gallery for that specific client.

5. Teams Page
- You can search a team by captain name. This view lets you see the date of the Donation Day, name of the team, and the status of the team.
- Teams can be closed if the donation day is over, this allows the volunteers to be able to join new teams in the future.
- Clicking on a specific team will give you information on the members of the team along with clients served.
- You can click on specific clients to view more information about them.

### Client View
1. Upon logging in, a volunteer will see their information and have the ability to edit it. On the top left, the volunteer can navigate to their team.
2. The volunteer can see their team name, client list, and the ability to add a new client.
3. After a client is added, clicking on the client in the list will take you to that client's information page and shopping list.
4. Here, items can be added for the shopping team as well as media.

## Built With
- HTML
- CSS
- Javascript
- React.js
- Node.js
- Express
- PostgreSQL
- Moment.js
- Material-UI
- AWS S3
- Redux
- Passport.js

## Acknowledgement
Thanks to Prime Digital Academy who equipped and helped us to make this application a reality. 

Thank you Andrea Bert from The Intersection for giving our team the opportunity to work with such a wonderful and empowering organization. 

A big thank you for the wonderful team that worked on the application together:
- [Amber Volkmann](https://github.com/AmberVolkmann)
- [Jessica Heggem](https://github.com/jessicaheggem)
- [Meghan Gunderson](https://github.com/MEGz19)
- [Gabriel Hawk](https://github.com/crimsonhawk47)
- [Tou Xiong](https://github.com/touyeexiong)

## Support
If you have suggestions or issues, please click the names above and send any of the team members a message