Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');
Schedule = require('./Schedule.js');

// EXPRESS REQUIRED.
var express = require('express');
var app = express();
var fs = require("fs");

var schedule = new Schedule();
/*schedule.parseRule("*23456SD@14h30:17h00@18h00:19h40", 0);
schedule.parseRule("*246@08h30:9h00@10h00:10h30", 1);
schedule.parseRule("#26/3/2019@12h00:13h00", 2);*/

// Lists the rules.
// url example: http://localhost:8081/rules
app.get('/rules', function(req, res){
    res.end(JSON.stringify(schedule.listRules()));
    console.log(schedule.listRules());
})

// Removes a rule by specifying its id.
// Try to add the rule http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0.
// Visualize it by calling http://localhost:8081/rules.
// Visualize the schedule for a period of time like http://localhost:8081/schedule/25-10-2018/30-10-2018.
// And then remove it by calling http://localhost:8081/removerule/0.
app.get('/removerule/:id', function(req, res){
    res.end(schedule.removeRule(req.params.id));
})

// Adds a rule with its id. There are basically two rules.
// Rule 1 (specific dates) format examle: #26/3/2019@12h00:13h00. Starts with # +  date + @ time interval(s).
// Rule 2 (regular dates) format example: *23456SD@14h30:17h00@18h00:19h40. Starts with * + days + @ + time interval(s).
// 2 : MONDAY, 3 :  TUESDAY , 4 : WEDNESDAY, 5 : THURSDAY, 6 : FRIDAY, S : SATURDAY, D : SUNNDAY.
// If you want, you can use W (stands for week) instead of 23456SD.
// url example: http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0
app.get('/addrule/:rule/:id', function(req, res){
   schedule.parseRule(req.params.rule, req.params.id);
   res.end("Rule inserted");
})

// Lists the schedule for the specified range of dates.
// url example: http://localhost:8081/schedule/05-11-2018/30-12-2018.
app.get('/schedule/:from/:to', function(req, res){
    res.end(schedule.toJson(req.params.from, req.params.to));
    console.log(schedule.getScheduleJson());
})

// Starts a server to run the moethods described above.
// Listenning at 8081.
var server = app.listen(8081, function(){
   var host = server.address().address
   var port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})
