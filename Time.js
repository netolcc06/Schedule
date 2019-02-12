/**
 * This class holds a basic structure to handle time.
 * It stores the hours and minutes for a certain time.
 * We also define two functions to compare two different times.
 */

class Time{

  constructor(hours, minutes){
      this.hours = hours;
      this.minutes = minutes;
  }

  // Prints the stored time
  print(){
      console.log(this.hours + 'h' + this.minutes);
  }
  // Returns true if the stored time value is least than the one from the argument operand.
  leastThan(operand){
    return ((this.hours === operand.hours && this.minutes < operand.minutes)
         || (this.hours < operand.hours));
  }
  // Returns true if the stored time value is less than or equal to the one from the argument operand.
  // Returns false otherwise.
  leastEqualThan(operand){
    return ((this.hours === operand.hours && this.minutes <= operand.minutes)
         || (this.hours < operand.hours));
  }
  // Returns true if we compare two times with the same attributes and false otherwise.
  equalsTo(operand){
    return (this.hours === operand.hours && this.minutes === operand.minutes);
  }
}

module.exports = Time;
