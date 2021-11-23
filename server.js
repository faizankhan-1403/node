const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/api');
const port = 3000;
const app = express();
var cors = require('cors')

app.use(cors()) ;
// const axios = require('axios');
// const router = express.Router();
app.use(bodyParser.json()); //to handle json data
app.use('/v1', api);


app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});