Time = require('./Time.js');

/**
 * This class holds a basic structure to handle time intervals.
 * It stores the start hours and minutes, and the end hours and minutes.
 * We also define two functions to compare two different time intervals.
 * This is done in order to create an ordered list of time intervals.
 * With that we can manage time interval lists for each day of the week.
 */

class ScheduleNode{

  constructor(start, end, regular=true, rule = 0){
      // Beginning of the stored time interval.
      this.start = start;
      // End of the stored time interval.
      this.end = end;
      // Boolean that is true if the time interval is valid to multiple days and false otherwise.
      this.regular = regular;
      // Id of the rule used to create this ScheduleNode.
      this.rule = rule;
      // Date used when the ScheduleNode is not regular and is valid only in a specific day.
      this.day = null;
      // Points to the next ScheduleNode in the list.
      this.next = null;
  }

  // Returns true if the time intervals are the same and false otherwise.
  equalsTo(operand){
      return (this.start.equalsTo(operand.start)  && this.end.equalsTo(operand.end));
  }

  // Returns true if the current time interval is less than the operand's time interval and false otherwise.
  // By using this.end.leastEqualThan(operand.start)) we can manage to have boundary intersection time intervals.
  // For example: [13h30:14h30][14h30:15h00][15h00:16h00] is a valid list of Schedule Nodes because
  // [13h30:14h30] is less than [14h30:15h00] and [14h30:15h00] is less than [15h00:16h00].
  leastThan(operand){
      return (this.start.leastThan(operand.start)  && this.end.leastEqualThan(operand.start));
  }

  // Returns the rule id use to create the node.
  getRule(){
      return this.rule;
  }

  // Returns true if the node is regular and false otherwise.
  isRegular(){
      return this.regular;
  }

  // Sets the day for the case in which the node is not regular.
  setDate(date){
      this.day = date;
  }

  // Sets the value which the current node points to.
  setNext(next){
      this.next = next;
  }

  // Print the time inteval for debugging
  print(){
      console.log(this.start);
      console.log(this.end);
      console.log("###");
  }

  // Returns the stored Date for not regular nodes.
  getDay(){
      return this.day;
  }

  //Returns a string in the format { "start": "14:30", "end": "15:00" }.
  toString(){
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
      var text = '{ "start": ' + '"' + startHours + ':' + startMinutes + '"'  + ', "end": '+
                               '"'+ endHours + ':' + endMinutes + '"'+ ' }';
      return text;
  }
}

module.exports = ScheduleNode;
