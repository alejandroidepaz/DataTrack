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

app.post('/getCharts', jsonParser, (req, res) => {
    var user = req.body;
    console.info(`Request body in /getCharts endpoint: ${JSON.stringify(user)}`);
    if (!user){
        res.sendStatus(400);

    } else{

        // Determine if the user already exists in the database
        mongodb.userCharts.findOne(user, function(err, obj){

            if (err){
                res.send(err);
            } else{
                
                let userCharts = {}

                if (!obj){
                    // if the user hasn't logged in before, they won't have any data initialized in mongoDB;
                    // thus, we create a new document with initialized data
                    let updateQuery = {username: user.username, charts:{}};
                    mongodb.userCharts.insert(updateQuery, function(err, obj){
                        if (err){
                            res.send(err);
                        } else{
                            console.info("Successfully Created New User");
                        }
                    });

                } else{
                    console.info("CHARTS: ", obj);
                    userCharts = obj.charts;
                }

                res.json(userCharts);
            }
        });
        //res.json(userCharts);
    }

})

// Add new a new chart or update an existing chart in db
app.put('/saveChart', jsonParser, (req, res) => {
    var body = req.body;
    console.log(body);
    if (!body){
        res.sendStatus(400);
    } else{
        let currentUser = body.username;
        let updated_chart = body.chart;
        let chartUpdateQuery = {"$set": {}}
        chartUpdateQuery.$set["charts." + updated_chart.id] = updated_chart // construct the key within the DB object that we will be updating

        //console.log(`The following chart was saved\n ${JSON.stringify(new_chart, null, 2)}`);
        mongodb.userCharts.update({username:currentUser}, chartUpdateQuery, function(err, obj){

            if (err){
                res.send(err);
            } else{
                res.json({"status": "success"});
            }
        })

    }
});

// TODO: delete charts from db
app.put('/deleteChart', jsonParser, (req, res) => {

    var body = req.body;

    if (!body){
        res.sendStatus(400)
    }else{
        let currentUser = body.username;
        let query = {"$unset": {}}
        query.$unset["charts." + body.id] = ""; // build query for deleting nested chart object

        mongodb.userCharts.update({username: currentUser}, query, function(err, obj){

            if (err){
                res.send(err)
            } else{
                res.json({"status":"success"})
            }
        })
    }
})

// Start server
const listenIP = '10.0.0.225';
const listenPort = process.env.PORT || 3000
app.listen(listenPort, listenIP, () => {
    console.log('App listening on ' + listenIP + ':' + listenPort);
});