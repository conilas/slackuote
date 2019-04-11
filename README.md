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

## The code

The structure goes like this: 

* ```app``` is the main folder, which will contain the whole application. Inside of it, one may find the two parts of the application.
  * ```app/repository``` has every connection to the database. It uses the mongojs lib and each file will contain queries related to a specific entity (for instance, companies has queries related to it, etc).
  * ```app/router``` has every route and control of the route. As I said before... there is project pattern with pretty controllers around and etcera. You just define the route importing route from express and voilá. Do not forget to add it to <code>app/router/index</code> later!
