// Express
const express = require('express');
const app = express();
const router = express.Router();
const port = 300

// Cors
var cors = require('cors');
app.use(cors());

// Body Parser (read POST requests)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Stich SDK Connection
const { Stitch, AnonymousCredential, UserApiKeyCredential } = require('mongodb-stitch-server-sdk');
const client = Stitch.initializeAppClient("noducklingisugly-exana")
const APIKey = new UserApiKeyCredential("Mzx624My4oalHTIsPXY1dOJWQE0Uzy6ujFpLUVys7i1JdhKZHXLhq0cYAPmj6JXi")
const credential = client.auth.loginWithCredential(APIKey)

// Home
// http://localhost:3000/
app.get('/', (request, response) => response.send('No Duckling Is Ugly'));
app.use('/api', router);

// Get All Bullying Events
// http://localhost:3000/api/getBullyingEvents
router.get('/getBullyingEvents', (request, response) => {
  client.callFunction("getBullyingEvents", []).then(result => {
    response.send(result)
  })
});

// Get Recent Bullying Events
// http://localhost:3000/api/getRecentBullyingEvents
router.get('/getRecentBullyingEvents', (request, response) => {
  client.callFunction("getRecentBullyingEvents", []).then(result => {
    response.send(result)
  })
});

// Get Bullying Events by Student
// http://localhost:3000/api/getBullyingEventsByStudent/:name
router.get('/getBullyingEventsByStudent/:name', (request, response) => {
  name = request.params.name
  client.callFunction("getBullyingEventsByStudent", [name]).then(result => {
    response.send(result)
  })
});

// Get Bullying Events by Time
// http://localhost:3000/api/getBullyingEventsByTime/:days
router.get('/getBullyingEventsByTime/:days', (request, response) => {
  days = request.params.days
  client.callFunction("getBullyingEventsByTime", [days]).then(result => {
    response.send(result)
  })
});

// Get Students
// http://localhost:3000/api/getStudents
router.get('/getStudents', (request, response) => {
  client.callFunction("getStudents", []).then(result => {
    response.send(result)
  })
});

// Log Bullying Event
// http://localhost:3000/api/logBullyingEvent
router.post('/logBullyingEvent', (request, response) => {
  var data = request.body;
  var body = {
    "bully": data.bully,
    "victim": data.victim,
    "statement": data.statement,
    "toxicity": data.toxicity,
    "location": data.location,
    "associates": data.associates,
    "datetime": data.datetime
  };
  client.callFunction("logBullyingEvent", [body]).then(result => {
    response.send("Success")
  })
});

// Create Student
// http://localhost:3000/api/logStudent
router.post('/logStudent', (request, response) => {
  var data = request.body;
  var body = {
    "firstName": data.firstName,
    "lastName": data.lastName,
    "gender": data.gender,
    "race": data.race,
    "dateOfBirth": data.dateOfBirth
  };
  client.callFunction("logStudent", [body]).then(result => {
    response.send("Success")
  })
});

// Update Student
// http://localhost:3000/api/updateStudent
router.put('/updateStudent', (request, response) => {
  var data = request.body;
  var body = {
    "firstName": data.firstName,
    "lastName": data.lastName,
    "gender": data.gender,
    "race": data.race,
    "dateOfBirth": data.dateOfBirth
  };
  client.callFunction("updateStudent", [body]).then(result => {
    response.send("Currently not supported")
  })
});

// Start Listening
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
