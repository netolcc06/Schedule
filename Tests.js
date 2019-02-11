Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');
ScheduleList = require('./ScheduleList.js');
Schedule = require('./Schedule.js');


d1 = new Date;
console.log(d1);
d2 = new Date(2019, 1, 11);
d3 = new Date(2019, 1, 12);
console.log(d2);
console.log(d3 < d2);
console.log(d3.getDay())

t1 = new Time(12, 30);
t2 = new Time(11, 45);
t3 = new Time(12, 45);

console.log("-----------");
console.log(t1.leastThan(t2));
console.log(t2.leastThan(t1));
console.log(t1.equalsTo(new Time(12,30)));
console.log(t1.equalsTo(t1));
console.log("-----------");
s1 = new Time(8,0);
e1 = new Time(8, 30);

s2 = new Time(10,30);
e2 = new Time(11, 0);

s3 = new Time(17,0);
e3 = new Time(17, 30);

sn1 = new ScheduleNode(s1, e1, true, 1);
sn2 = new ScheduleNode(s2, e2, true, 2);
sn3= new ScheduleNode(s3, e3, true, 1);
sn4= new ScheduleNode(new Time(7,0), new Time(8,0), true, 2); // na esquerda
sn5= new ScheduleNode(new Time(18,30), new Time(19,0), true, 1); // na direita
sn6= new ScheduleNode(new Time(17,30), new Time(18,30), true, 1);
sn7= new ScheduleNode(new Time(9,0), new Time(10,0), true, 2);
sn8= new ScheduleNode(new Time(9,30), new Time(10,0), true, 1); //n entra

console.log(sn1.leastThan(sn2));
console.log(sn1.leastThan(sn3));
console.log(sn2.leastThan(sn3));
console.log("-----------");
list = new ScheduleList();
list.add(sn3);
list.add(sn2);
list.add(sn1);
list.add(sn4);
list.add(sn5);
list.add(sn6);
list.add(sn7);
list.add(sn8);
list.print();
console.log("-----------");
list.removeRule(2);
list.print();
console.log("-----------");
list.removeRule(1);
list.print();

/*switch(itDate.getDay()){
  case 0://domingo
      var it = this.Sunday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO SUNDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 1://segunda
      var it = this.Monday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO MONDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 2://terça
      var it = this.Tuesday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO TUESDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 3://quarta
      var it = this.Wednesday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO WEDNESDAY");
              somethingToAdd = true;
              text += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 4://quinta
      var it = this.Thursday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO THURSDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 5://sexta
      var it = this.Friday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO FRIDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  case 6://sábado
      var it = this.Saturday.getHead();
      while(it != null){
          if(((!it.isRegular()) && it.getDay().getDate() === itDate.getDate()
            && it.getDate().getDay().getMonth() === itDate.getMonth()
            && it.getDate().getDay().getFullYear() === itDate.getFullYear()) ||
            it.isRegular()){
              console.log("ENTRA NO SATURDAY");
              somethingToAdd = true;
              auxString += it.toString();
              it = it.next;
              if(it != null)
                  auxString += ', ';
            }
      }
      break;
  default:
      break;
}*/
