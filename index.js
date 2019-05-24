require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyparser = require('body-parser');
const app = express();

var corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));

app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/notifications',function(req,res){
    axios.post("https://hitss.modyo.cloud/api/v1/messaging/notifications",{
        to:req.body.user,
        body:`Your opinions about the hotel ${req.body.hotel} was sent to the communication deparment. Thank You!`,
        subject:"opinions about hotels"
    },
    {
        headers:{ Authorization: `Bearer ${process.env.TOKEN}`}
    })
    .then(function(r){
        res.status(r.status).send();
    })
    .catch(function(err){
        res.status(err.response.status).send();
    })
})

app.listen(process.env.PORT, function () {
  console.log('EXAMPLE');
});

