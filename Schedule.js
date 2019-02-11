Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');

class Schedule{
    constructor(){
        this.Monday = new ScheduleList();
        this.Tuesday = new ScheduleList();
        this.Wednesday = new ScheduleList();
        this.Thursday = new ScheduleList();
        this.Friday = new ScheduleList();
        this.Saturday = new ScheduleList();
        this.Sunday = new ScheduleList();
    }

    getListByDate(dayInTheWeek){
        switch(dayInTheWeek){
            case 0:
                return this.Sunday;
                break;
            case 1:
                return this.Monday;
                break;
            case 2:
                return this.Tuesday;
                break;
            case 3:
                return this.Wednesday;
                break;
            case 4:
                return this.Thursday;
                break;
            case 5:
                return this.Friday;
                break;
            case 6:
                return this.Saturday;
                break;
            default:
                break;
        }
    }
    parseRule(rule, ruleId){
        var nodes = [];
        var days = '';
        var regular = true;
        var index = 0;
        var start, end, hours = '', minutes = '';
        var date;
        while(index < rule.length){
            //console.log(rule[index]);
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
                    //console.log("AQUI #1");
                    index+=1;
                    while(rule[index]!=':'){
                        minutes+=rule[index];
                        index+=1;
                    }
                    //console.log("AQUI #2");
                    //console.log(hours + 'h' + minutes);
                    start = new Time(parseInt(hours), parseInt(minutes));
                    hours = '';
                    minutes = '';
                    index+=1;
                    while(rule[index]!='h'){
                        hours+=rule[index];
                        index+=1;
                    }
                    //console.log("AQUI #3");
                    index+=1;

                    while(index < rule.length && rule[index]!='@'){
                        minutes+=rule[index];
                        index+=1;
                    }
                    //console.log("AQUI #4");
                    //console.log(hours + 'h' + minutes);
                    end = new Time(parseInt(hours), parseInt(minutes));
                    hours = '';
                    minutes = '';
                    var addedNode = new ScheduleNode(start, end, regular, ruleId);
                    if(!regular){
                          addedNode.setDate(date);
                    }
                    nodes.push(addedNode);

                    break;
              case '#':
                    index +=1;
                    regular = false;
                    var day = '', month = '', year='';
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

        //for(var i =0; i<10; i++){
        //    console.log("what");
        //}
        //Pra cada dia da semana colocar os nodes de tempo nas listas (cada dia tem uma lista)
        //console.log(days);
        //console.log(nodes);

        for(var i = 0; i< days.length; i++){
            switch(days[i]){
                case '2':
                    for(var j=0; j < nodes.length; j++)
                        this.Monday.add(nodes[j]);
                    break;
                case '3':
                    for(var j=0; j < nodes.length; j++)
                        this.Tuesday.add(nodes[j]);
                    break;
                case '4':
                    for(var j=0; j < nodes.length; j++)
                        this.Wednesday.add(nodes[j]);
                    break;
                case '5':
                    for(var j=0; j < nodes.length; j++)
                        this.Thursday.add(nodes[j]);
                    break;
                case '6':
                    for(var j=0; j < nodes.length; j++)
                        this.Friday.add(nodes[j]);
                    break;
                case 'S':
                    for(var j=0; j < nodes.length; j++)
                        this.Saturday.add(nodes[j]);
                    break;
                case 'D':
                    for(var j=0; j < nodes.length; j++)
                        this.Sunday.add(nodes[j]);
                    break;
                default:
                    break;
            }
        }


    }

    print(){
        console.log("### MONDAY ###");
        this.Monday.print();
        console.log("### TUESDAY ###");
        this.Tuesday.print();
        console.log("### WEDNESDAY ###");
        this.Wednesday.print();
        console.log("### THURSDAY ###");
        this.Thursday.print();
        console.log("### FRIDAY ###");
        this.Friday.print();
        console.log("### SATURDAY ###");
        this.Saturday.print();
        console.log("### SUNNDAY ###");
        //Sunday.removeRule(0);
        this.Sunday.print();
    }

    removeRule(ruleId){
        this.Monday.removeRule(ruleId);
        this.Tuesday.removeRule(ruleId);
        this.Wednesday.removeRule(ruleId);
        this.Thursday.removeRule(ruleId);
        this.Friday.removeRule(ruleId);
        this.Saturday.removeRule(ruleId);
        this.Sunday.removeRule(ruleId);
    }
    //0123456789
    //25-01-2018 e 29-01-2018
    toJson(firstDate, lastDate){
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

        var itDate = new Date(parseInt(initYear), parseInt(initMonth)-1, parseInt(initDay));

        while(!(itDate.getDate() === endDate.getDate() && itDate.getMonth() === endDate.getMonth() &&
        itDate.getFullYear() === endDate.getFullYear())){
              var somethingToAdd = false;
              var dayString = '', monthString = '', yearString = '';
              var auxString = '';
              dayString = itDate.getDate().toString();
              monthString = itDate.getMonth()+1;
              //console.log("monthString = " + monthString);
              yearString = itDate.getFullYear().toString();
              if(itDate.getDate()<10){
                  dayString = '0'+ dayString;
                  //console.log("itDate.getDate() = " + itDate.getDate());
              }
              if(itDate.getMonth()<10)
                  monthString = '0'+ monthString;
              var fullDateString = 'day: ' + '"' + dayString + '-' + monthString + '-' + yearString + '",\n'

              var it = this.getListByDate(itDate.getDay()).getHead();
              while(it != null){
                  if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
                    && it.getDay().getMonth() === itDate.getMonth()
                    && it.getDay().getFullYear() === itDate.getFullYear()) ||
                    it.isRegular()){
                      somethingToAdd = true;
                      auxString += it.toString();
                      if(it != null)
                          auxString += ', ';
                    }
                  it = it.next;
              }

              if(somethingToAdd){
                  text += fullDateString + "intervals: [" + auxString + "]" +'\n';
              }
              auxString = '';
              itDate.setDate(itDate.getDate()+1);
              //console.log(itDate);
        }

        /*employees.push({"firstName":"John", "lastName":"Doe"});
            //{"firstName":"Anna", "lastName":"Smith"},
            //{"firstName":"Peter", "lastName":"Jones"}
        //]
        var test = 42;
        /*var text = '{' + "employees" + ': [' +
                  '{'+ "firstName" +':'+"John" + ',' + "lastName"+':'+"Doe" +'},' +
                  '{' + "firstName"+':'+"Anna" + ',' + "lastName"+':'+"Smith" + '},' +
                  '{' + "firstName"+':'+"Peter" + ',' + "lastName"+':'+ test + '}'+ ']}';*/
                  //day: "25-01-2018",
                //intervals: [{ start: "14:30", end: "15:00" }, { start: "15:10", end: "15:30" }
        return '[' + text + ']';
    }
}

module.exports = Schedule;