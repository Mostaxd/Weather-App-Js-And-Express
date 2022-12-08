// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());



// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


// handle get requests with the /all dir
app.get('/all', (req, res) => {
  res.send(projectData);
});

// handle post requests with the /addData dir
addData = async (req, res) => {
  projectData = await req.body;
  res.send(projectData);
  return projectData;
}


app.post('/addData', addData);



