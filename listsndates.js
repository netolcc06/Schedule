/**
 * This file contains a few hardcoded tests to observe the code behavior after
 * each new method implementation.
 * The most advanced features for the most complex structure (Schedule) from the project are tested here.
 */

Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');
Schedule = require('./Schedule.js');

schedule = new Schedule();

// Introduces three different rules.
schedule.parseRule("*23456SD@14h30:17h00@18h00:19h40", 0);
schedule.parseRule("*246@08h30:9h00@10h00:10h30", 1);
schedule.parseRule("#26/3/2019@12h00:13h00", 2);
mj = schedule.toJson("20-11-2018","24-11-2018");
console.log(mj);
// We should have three different rules at this point.
console.log(schedule.listRules());
console.log("##############");
// We should have two different rules after this point.
schedule.removeRule(2);
console.log(schedule.listRules());
console.log("##############");
// We should have only one rule after this point.
schedule.removeRule(0);
console.log(schedule.listRules());
console.log("##############");
// This call doesn't change the number of rules, since there is not a rule with such id.
schedule.removeRule(5);
console.log(schedule.listRules());
console.log("##############");
// After this point the list of rules should be empty.
schedule.removeRule(1);
console.log(schedule.listRules());
