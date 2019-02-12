Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');
Schedule = require('./Schedule.js');

var express = require('express');
var app = express();
var fs = require("fs");

var schedule = new Schedule();
/*schedule.parseRule("*23456SD@14h30:17h00@18h00:19h40", 0);
schedule.parseRule("*246@08h30:9h00@10h00:10h30", 1);
schedule.parseRule("#26/3/2019@12h00:13h00", 2);*/

app.get('/rules', function(req, res){
    res.end(JSON.stringify(schedule.listRules()));
    console.log(schedule.listRules());
})

app.get('/removerule/:id', function(req, res){
    res.end(schedule.removeRule(req.params.id));
})

app.get('/addrule/:rule/:id', function(req, res){
   schedule.parseRule(req.params.rule, req.params.id);
   res.end("Rule inserted");
})

app.get('/schedule/:from/:to', function(req, res){
    res.end(schedule.toJson(req.params.from, req.params.to));
    console.log(schedule.getScheduleJson());
})

var server = app.listen(8081, function(){
   var host = server.address().address
   var port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})
