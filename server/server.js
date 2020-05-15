const express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var mongojs = require("mongojs");
const app = express();

// Static pages
app.use(express.static('public'));

// Create application/json parser
const jsonParser = bodyParser.json();

// Establish connection with database
var mongodb = mongojs("mongodb+srv://dataTrackAdmin:FalcoLombardi69!@cluster0-ze92c.mongodb.net/DataTrack?retryWrites=true&w=majority", ["userCharts"]);

app.get('/getCharts', (req, res) => {

    mongodb.userCharts.find({username:"adp_cudi"}, function(err, obj){

        if (err){
            res.send(err);
        } else{
            //console.log("DATA IN API: ", JSON.stringify(obj[0].charts, null, 2));
            res.json(obj[0].charts);
        }
    })

})

// TODO: add new charts to db
app.post('/addChart', (req, res) => {
    var chart = req.params;
    console.log(chart);
});

// TODO: delete charts from db
app.post('/deleteChart', (req, res) => {

    var chartToDelete = req.params;
    console.log(chartToDelete);
})



// Start server
const listenIP = '127.0.0.1';
const listenPort = process.env.PORT || 3000
app.listen(listenPort, listenIP, () => {
    console.log('App listening on ' + listenIP + ':' + listenPort);
});