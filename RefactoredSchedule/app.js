// EXPRESS REQUIRED.
var express = require('express');
var app = express();
var fs = require("fs");

monday = []
tuesday = []
wednesday = []
thursday = []
friday = []
saturday = []
sunday = []
// week = {0:sunday,1:monday,2:tuesday,3:wednesday,4:thursday,5:friday,6:saturday}
// dayNumberToChar = {0:'D',1:'2',2:'3',3:'4',4:'5',5:'6',6:'S'}
charToWeekList = {'2':monday,'3':tuesday,'4':wednesday,'5':thursday,'6':friday,'S':saturday,'D':sunday}

// Tests wether is possible or not inserting the interval in the list passed as arguments
// Possible lists: monday, tuesday, wednesday, thursday, friday, saturday, monday
function addNodeInList(t1,t2, listOfDays, rule, regular){
    if(!canInsertInTheList(t1, t2, listOfDays)){
        return false
    }

    intervalNode = {
        'start': 0,
        'end': 0
    }

    dayZero=''
    monthZero=''
    if(t1.getDate()<10)
        dayZero = '0'
    if(t1.getMonth()<10)
        monthZero = '0'

    intervalNode.start = t1
    intervalNode.end = t2

    intervals = []
    intervals.push(intervalNode)

    listOfDays.push({
        'day': `${dayZero}${t1.getDate()}-${monthZero}${t1.getMonth()+1}-${t1.getFullYear()}`,
        'intervals' : intervals,
        'regular': regular,
        'rule' : rule
    })

    listOfDays.sort(sortArrayOfDates)

    return true
}

function getListByDate(dayInTheWeek){
    //return week[dayInTheWeek]
    switch(dayInTheWeek){
            case 0:
                return sunday;
                break;
            case 1:
                return monday;
                break;
            case 2:
                return tuesday;
                break;
            case 3:
                return wednesday;
                break;
            case 4:
                return thursday;
                break;
            case 5:
                return friday;
                break;
            case 6:
                return saturday;
                break;
            default:
                break;
        }
}

// Detects if there is any intersection between the current intervals in the list with
// the one to be inserted
function canInsertInTheList(t1, t2, list){

    if(list.length === 0){
        return true
    }

    if(t1.getTime()>=t2.getTime()){
      console.log("t2 > t1. Specify a valid time interval")
      return false
    }

    t1T = new Date()
    t2T = new Date()
    t1T.setHours(t1.getHours())
    t2T.setHours(t2.getHours())
    t1T.setMinutes(t1.getMinutes())
    t2T.setMinutes(t2.getMinutes())


    for(index=0; index<list.length;index++){
        if(list[index].intervals.length==1){
            if((t2T.getTime() > list[index].intervals[0].start.getTime())&&((t2T.getTime() < list[index].intervals[0].end.getTime())))
                return false
            if((t1T.getTime() > list[index].intervals[0].start.getTime())&&((t1T.getTime() < list[index].intervals[0].end.getTime())))
                return false
        }
        else{
            for(int =0; int < list[index].intervals.length-1; int++){
                if((t1T.getTime() > list[index].intervals[int].start.getTime())&&((t1T.getTime() < list[index].intervals[int].end.getTime())))
                    return false
                if((t2T.getTime() > list[index].intervals[int + 1].start.getTime())&&((t2T.getTime() < list[index].intervals[int + 1].end.getTime())))
                    return false
            }
        }
    }

    return true
}

// Sort intervals available for each day
function sortArrayOfIntervals(a, b){
    if(a.start === b.start){
        return (a.end > b.end) ? 1 : -1
    }
    return (a.start > b.start) ? 1 : -1
}

//Sort the dates in order to keep track of periodicity.
//Not necessary in order to solve the problem, since the final arrangement is determined by the printList function
function sortArrayOfDates(a, b){
    dayA = a.day[0]+a.day[1]
    monthA = a.day[3]+a.day[4]
    yearA = a.day[6]+a.day[7]+a.day[8]+a.day[9]

    dayA = parseInt(dayA)
    monthA = parseInt(monthA)
    yearA = parseInt(yearA)

    dayB = b.day[0]+b.day[1]
    monthB = b.day[3]+b.day[4]
    yearB = b.day[6]+b.day[7]+b.day[8]+b.day[9]

    dayB = parseInt(dayB)
    monthB = parseInt(monthB)
    yearB = parseInt(yearB)

    dateA = new Date(parseInt(yearA), parseInt(monthA)-1, parseInt(dayA))
    dateB = new Date(parseInt(yearB), parseInt(monthB)-1, parseInt(dayB))

    return (dateA.getTime() > dateB.getTime()? 1 : -1)
}

// Prints the available time intervals at the date in the list passed as arguments
function printList(listOfDays, date){
    myList = listOfDays.filter(item => item.regular || (!item.regular && item.day === date))
    intervals = []
    myList.forEach(element=>{
        if(element.regular || (!element.regular && element.day === date)){
            element.intervals.forEach(interval=>{
                minZeroStart = (interval.start.getMinutes() == 0) ? '0' : ''
                hourZeroStart = (interval.start.getHours() < 10) ? '0' : ''
                minZeroEnd = (interval.end.getMinutes() == 0) ? '0' : ''
                hourZeroEnd = (interval.end.getHours() < 10) ? '0' : ''
                intervals.push(
                    {
                        'start' : `${hourZeroStart}${interval.start.getHours()}:${minZeroStart}${interval.start.getMinutes()}`,
                        'end' : `${hourZeroEnd}${interval.end.getHours()}:${minZeroEnd}${interval.end.getMinutes()}`
                    }
                )
            })
        }
    })

    intervals.sort(sortArrayOfIntervals)
    return {
        'day': date,
        'intervals': intervals
    }
}

// Parses the rule to update the schedule and stores it with its id.
// Rule 1 (specific dates) format examle: #26/3/2019@12h00:13h00. Starts with # +  date + @ time interval(s).
// Rule 2 (regular dates) format example: *23456SD@14h30:17h00@18h00:19h40. Starts with * + days + @ + time interval(s).
// 2 : MONDAY, 3 :  TUESDAY , 4 : WEDNESDAY, 5 : THURSDAY, 6 : FRIDAY, S : SATURDAY, D : SUNNDAY.
// You can use W (stands for week) instead of 23456SD.
function  parseRule(rule, ruleId){
    var nodes = [];
    var days = '';
    var regular = true;
    var index = 0;
    var start, end, hours = '', minutes = '';
    var day = '', month = '', year='';
    var date;
    var t1, t2

    const intervals =[]
    while(index < rule.length){
        switch(rule[index]){
            case '*':
                index +=1;
                while(rule[index]!='@'){
                    days += rule[index];
                    index +=1;
                }
                break;
            case 'W':
                days+='23456SD';
                while(rule[index]!='@')
                    index +=1;
                break;
            case '@':
                index +=1;
                //14h30:17h00@17h00:18h00
                while(rule[index]!='h'){
                    hours+=rule[index];
                    index+=1;
                }
                index+=1;
                while(rule[index]!=':'){
                    minutes+=rule[index];
                    index+=1;
                }

                if(regular){
                    t1 = new Date()
                }
                else{
                    t1 = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
                }

                t1.setHours(parseInt(hours), parseInt(minutes), 0);

                hours = '';
                minutes = '';
                index+=1;
                while(rule[index]!='h'){
                    hours+=rule[index];
                    index+=1;
                }

                index+=1;

                while(index < rule.length && rule[index]!='@'){
                    minutes+=rule[index];
                    index+=1;
                }

                if(regular){
                    t2 = new Date()
                }
                else{
                    t2 = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
                }

                t2.setHours(parseInt(hours), parseInt(minutes), 0);

                hours = '';
                minutes = '';

                intervals.push(
                    {
                      'start' : t1, //t1
                      'end' : t2 , //t2
                      'regular' : regular, //default = true
                      'rule' : ruleId
                   }
                )

                break;
          case '#':
                index +=1;
                regular = false;

                while(rule[index]!='/'){
                    day += rule[index];
                    index+=1;
                }
                index+=1;
                while(rule[index]!='/'){
                    month += rule[index];
                    index+=1;
                }
                index+=1;
                while(rule[index]!='@'){
                    year += rule[index];
                    index+=1;
                }
                date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
                var dayInTheWeek = date.getDay();
                //days += dayNumberToChar[dayInTheWeek]
                switch(dayInTheWeek){
                    case 0:
                        days+='D';
                        break;
                    case 1:
                        days+='2';
                        break;
                    case 2:
                        days+='3';
                        break;
                    case 3:
                        days+='4';
                        break;
                    case 4:
                        days+='5';
                        break;
                    case 5:
                        days+='6';
                        break;
                    case 6:
                        days+='S';
                        break;
                    default:
                        break;
                }

                break;
          default:
                index+=1;
                break;
        }
    }

    for(var i = 0; i< days.length; i++){
        intervals.forEach(interval =>{
            addNodeInList(interval.start,interval.end, charToWeekList[days[i]], interval.rule, interval.regular)
        })
    }
}

function toJson(firstDate, lastDate){
    if(firstDate.length <10 || lastDate.length < 10)
        return "Invalid input. Correct format: dd-mm-yyyy";
    var text = '';
    var employees = [];
    var initDay='', initMonth='', initYear='';
    var endDay='', endMonth='', endYear='';
    var initDate, endDate;
    initDay = firstDate[0] + firstDate[1];
    initMonth = firstDate[3] + firstDate[4];
    initYear = firstDate[6] + firstDate[7]+ firstDate[8]+ firstDate[9];

    endDay = lastDate[0] + lastDate[1];
    endMonth = lastDate[3] + lastDate[4];
    endYear = lastDate[6] + lastDate[7]+ lastDate[8]+ lastDate[9];

    initDate = new Date(parseInt(initYear), parseInt(initMonth)-1, parseInt(initDay));
    endDate = new Date(parseInt(endYear), parseInt(endMonth)-1, parseInt(endDay)+1);//proposito de loop

    if(initDate >= endDate){
        return "Initial date >= end date"
    }

    var itDate = new Date(parseInt(initYear), parseInt(initMonth)-1, parseInt(initDay));
    var jsons = []
    while(!(itDate.getDate() === endDate.getDate() && itDate.getMonth() === endDate.getMonth() &&
    itDate.getFullYear() === endDate.getFullYear())){
          var dayString = '', monthString = '', yearString = '';

          dayString = itDate.getDate().toString();
          monthString = itDate.getMonth()+1;
          yearString = itDate.getFullYear().toString();

          if(itDate.getDate()<10){
              dayString = '0'+ dayString;
          }
          if(itDate.getMonth()<9){
              monthString = '0'+ monthString;
          }

          var fullDateString = dayString + '-' + monthString + '-' + yearString
          jsons.push(printList(getListByDate(itDate.getDay()), fullDateString))
          itDate.setDate(itDate.getDate()+1);
    }

    return jsons.filter(element => element.intervals.length > 0)
}

function removeRule(ruleId){
    monday = monday.filter(date =>date.rule != ruleId)
    tuesday = tuesday.filter(date =>date.rule != ruleId)
    wednesday = wednesday.filter(date =>date.rule != ruleId)
    thursday = thursday.filter(date =>date.rule != ruleId)
    friday = friday.filter(date =>date.rule != ruleId)
    saturday = saturday.filter(date =>date.rule != ruleId)
    sunday = sunday.filter(date =>date.rule != ruleId)
}


// Removes a rule by specifying its id.
// Try to add the rule http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0.
// Visualize it by calling http://localhost:8081/rules.
// Visualize the schedule for a period of time like http://localhost:8081/schedule/25-10-2018/30-10-2018.
// And then remove it by calling http://localhost:8081/removerule/0.
app.get('/removerule/:id', function(req, res){
    res.end(removeRule(req.params.id));
})

// Adds a rule with its id. There are basically two rules.
// Rule 1 (specific dates) format examle: #26/3/2019@12h00:13h00. Starts with # +  date + @ time interval(s).
// Rule 2 (regular dates) format example: *23456SD@14h30:17h00@18h00:19h40. Starts with * + days + @ + time interval(s).
// 2 : MONDAY, 3 :  TUESDAY , 4 : WEDNESDAY, 5 : THURSDAY, 6 : FRIDAY, S : SATURDAY, D : SUNNDAY.
// If you want, you can use W (stands for week) instead of 23456SD.
// url example: http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0
app.get('/addrule/:rule/:id', function(req, res){
   parseRule(req.params.rule, req.params.id);
   res.end("Rule inserted");
})

// Lists the schedule for the specified range of dates.
// url example: http://localhost:8081/schedule/05-11-2018/30-12-2018.
app.get('/schedule/:from/:to', function(req, res){
    console.log(res.end(JSON.stringify(toJson(req.params.from, req.params.to))));
})

// Starts a server to run the moethods described above.
// Listenning at 8081.
var server = app.listen(8081, function(){
   var host = server.address().address
   var port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})
