const express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var mongojs = require("mongojs");
const app = express();

// Static pages
app.use(express.static('public'));

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

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

// Add new a new chart or update an existing chart in db
app.post('/saveChart', jsonParser, (req, res) => {
    var new_chart = req.body;
    if (!new_chart){
        res.sendStatus(400);
    } else{

        let chartUpdateQuery = {"$set": {}}
        chartUpdateQuery.$set["charts." + new_chart.id] = new_chart // construct the key within the DB object that we will be updating

        //console.log(`The following chart was saved\n ${JSON.stringify(new_chart, null, 2)}`);
        mongodb.userCharts.update({username:"adp_cudi"}, chartUpdateQuery, function(err, obj){

            if (err){
                res.send(err);
            } else{
                res.json({"status": "success"});
            }
        })

    }
});

// TODO: delete charts from db
app.post('/deleteChart', jsonParser, (req, res) => {

    var body = req.body;

    if (!body){
        res.sendStatus(400)
    }else{
        let query = {"$unset": {}}
        query.$unset["charts." + body.id] = ""; // build query for deleting nested chart object

        mongodb.userCharts.update({username: "adp_cudi"}, query, function(err, obj){

            if (err){
                res.send(err)
            } else{
                res.json({"status":"success"})
            }
        })
    }
})

// Start server
const listenIP = '127.0.0.1';
const listenPort = process.env.PORT || 3000
app.listen(listenPort, listenIP, () => {
    console.log('App listening on ' + listenIP + ':' + listenPort);
});