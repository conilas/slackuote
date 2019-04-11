const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors')
const WebSocket  = require('ws');
const http       = require('http');
//top level declaration for express :-)
const app        = express();
const port       = process.env.PORT || 8080; // set our port

const emitter = require("./app/helper/emitter")


//Configuring the json body parser & cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'app/frontend/views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'app/frontend')));

//Registering the routes exported from index
app.use(require('./app/router/index'));

app.use(function(err, req, res, next) {
    next(err); // pass error on if not a validation error
});

//setup the websocket server
const server   = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
    emitter.addListener('newquote', (val) => {
        try {
          ws.send(val);
        } catch (exception) {
          console.log("[ERROR] Websocket disconnected. Cannot send data.")
        }
    });
});

//Starts the server
server.listen(port);
