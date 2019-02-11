Time = require('./Time.js');

class ScheduleNode{

  constructor(start, end, regular=true, rule = 0){
      this.start = start;
      this.end = end;
      this.regular = regular;
      this.rule = rule;
      this.day = null;
      this.next = null;
  }

  equalsTo(operand){
      return (this.start.equalsTo(operand.start)  && this.end.equalsTo(operand.end));
  }

  leastThan(operand){
      return (this.start.leastThan(operand.start)  && this.end.leastEqualThan(operand.start));
  }

  getRule(){
      return this.rule;
  }

  isRegular(){
      return this.regular;
  }

  setDate(date){
      this.day = date;
  }

  setNext(next){
      this.next = next;
  }

  print(){
      console.log(this.start);
      console.log(this.end);
      console.log("###");
  }

  getDay(){
      return this.day;
  }
  toString(){
      //intervals: [{ start: "14:30", end: "15:00" }, { start: "15:10", end: "15:30" }
      var startHours = '', startMinutes = '';
      startHours = this.start.hours.toString();
      if(this.start.hours < 10){
          startHours = '0' + startHours;
      }
      startMinutes = this.start.minutes.toString();
      if(this.start.minutes < 10){
          startMinutes = '0' + startMinutes;
      }

      var endHours = '', endMinutes = '';
      endHours = this.end.hours.toString();
      endMinutes = this.end.minutes.toString();
      if(this.end.hours < 10){
          endHours = '0' + endHours;
      }
      if(this.end.minutes < 10){
          endMinutes = '0' + endMinutes;
      }
      var text = '{ start: ' + startHours + ':' + startMinutes + ', end: '+
                             + endHours + ':' + endMinutes + ' }';
      return text;
  }
}


module.exports = ScheduleNode;
