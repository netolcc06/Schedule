Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');
Schedule = require('./Schedule.js');

schedule = new Schedule();

schedule.parseRule("*23456SD@14h30:17h00@18h00:19h40", 0);
schedule.parseRule("*246@08h30:9h00@10h00:10h30", 1);
schedule.parseRule("#26/3/2019@12h00:13h00", 2);
mj = schedule.toJson("20-11-2018","25-12-2018");
console.log(mj);
