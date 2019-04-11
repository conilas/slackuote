# Slackuote 

### Slack-bot integration for some good inspirational quotes (or unpopular opinions) :-) 

This repository contains the code for an application that receives quotes from slack and shows them on the screen in a pretty way. The whole idea is to store all the good quotes and look back saying 'oh, the good ol' days!'. 

## About the configurations

### Database

If you need to change the IP or collection of the database, go to app/helper/constants.js. You will find:

```javascript
//Changes go here for the IP
module.exports = Object.freeze({
    MONGO_IP_DEV: '{your database ip}/{your database collection}'
});
```

### Server 

If you need to make changes to the binded IP of the server (although it binds currently to 0.0.0.0, which will work on every network interface you have) or to the port, see 

```javascript
const port = process.env.PORT || 8080; // set our port
```

## The stack

The idea was simple: a frontend page, created using vanilla js, a backend REST service with some HTTP requests that was created using express and a database - MongoDB. A common ```MExN``` stack. The only different thing is the websocket handler that bring the real-time feeling to the app :-)

## The code

The structure goes like this: 

* ```app``` is the main folder, which will contain the whole application. Inside of it, one may find the two parts of the application.

### Backend 

* The backend is a simple REST api (actually, two HTTP requests) with a websocket for real-time control. The websocket is triggered by the events-handler of the nodejs whenever a quote comes in action. The rest of folders are documented below.
  * ```app/repository``` has every connection/query to the database. It uses the mongojs lib and each file will contain queries related to a specific entity (for instance, quotes, which is the only entity of this app, lol!).
  * ```app/router``` has every route and control of the route. In this application's case, we only have the quote route and the static serving of the ```index.html```.
  * ```app/helper``` has every route and control of the route. In this application's case, we only have the quote route and the static serving of the ```index.html```.
  
### Frontend

* The frontend written in vanilla-js and uses Bulma as a CSS lib. It *must* be run in a browser that supports ES6+ syntax, because no Babel was configured. It uses IIFE to create namespaces with closures. The libs are directly included in the ```index.html``` file - sorry, did not have enough time to organize that part!
  * ```app/frontend/public``` has all the assets of the front page (images and such).
  * ```app/frontend/scripts``` contains all the javascript files used to handle interactions, etc.
  * ```app/frontend/style``` contains the css files (one of which is bulma's file).
  * ```app/frontend/views``` contains the html files (there is only index.html, lol).
