

class Time{

  constructor(hours, minutes){
      this.hours = hours;
      this.minutes = minutes;
  }

  print(){
      console.log(this.hours + 'h' + this.minutes);
  }

  leastThan(operand){
    return ((this.hours === operand.hours && this.minutes < operand.minutes)
         || (this.hours < operand.hours));
  }

  leastEqualThan(operand){
    return ((this.hours === operand.hours && this.minutes <= operand.minutes)
         || (this.hours < operand.hours));
  }

  equalsTo(operand){
    return (this.hours === operand.hours && this.minutes === operand.minutes);
  }
}


module.exports = Time;
