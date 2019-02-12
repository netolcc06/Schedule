# Schedule
Node.js project to administer time intervals available in a given period of time.

Run node listsndates.js or node Tests.js for a few hardcoded tests developed while creting its functionalities.

Run node app.js for the server (**it is necessary to download the Express framework**):

http://localhost:8081/rules => lists the rules.

http://localhost:8081/addrule/:rule/:id => adds a rule with the specified id.

http://localhost:8081/removerule/:id => removes a rule with the specified id.

http://localhost:8081/schedule/:from/:to => presents the schedule for the specified range of dates (dd-mm-yyyy format).


The tool presents three basic functionalities:

1. **Inserting available dates**

  You can add a rule with its id. There are basically two rules.

  Rule 1 (specific dates) format examle: #26/3/2019@12h00:13h00. Starts with # +  date + @ time interval(s).

  Rule 2 (regular dates) format example: *23456SD@14h30:17h00@18h00:19h40. Starts with * + days + @ + time interval(s).

  2 : MONDAY, 3 :  TUESDAY , 4 : WEDNESDAY, 5 : THURSDAY, 6 : FRIDAY, S : SATURDAY, D : SUNNDAY.

  If you want, you can use W (stands for week) instead of 23456SD.

  url example: http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0
 

2. **Listing available dates**

  You can take a look at the schedule built for a specific dates interval. It is necessary to pass strings for the dates as arguments. In case you want to check the times available during 05-11-2-18 and 30-12-2018, you should use the url below:
  
  http://localhost:8081/schedule/05-11-2018/30-12-2018.


3. **Removing available dates**

  This is done by eliminating the rules used to create that schedule. You can remove a rule by specifying its id. 

  Example: first, add the rule http://localhost:8081/addrule/*23456SD@14h30:17h00@18h00:19h40/0. 

  The /0 stands for the id (it doesn't need to be a number). Visualize it by calling http://localhost:8081/rules. 

  Visualize the current schedule for a period of time such as http://localhost:8081/schedule/25-10-2018/30-10-2018. Then remove it by calling http://localhost:8081/removerule/0 and try to visualize the same schedule as before.

![alt tag](https://github.com/netolcc06/Schedule/blob/master/newscheduleOutput.png)



