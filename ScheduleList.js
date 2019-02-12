Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');

/*
 * The ScheduleList is an ordered linked list implementation to deal With
 * ScheduleNode objects. With that, time intervals are inserted in a way
 * they are only inserted if there is time between the time intervals.
 * Because of that, a rule specified by the user may be totally ignored
 * in case the requested time interval is not available.
 * However, a rule can present valid portions and these are stored in the list.
 */

class ScheduleList{
  constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  // Returns the structure that represents beginning of the list.
  getHead(){
      return this.head;
  }

  // Prints every node of the list.
  print(){
      var it = this.head;
      while(it != null){
          it.print();
          it = it.next;
      }
      if(this.size==0)
        console.log("EMPTY LIST");
  }

  // Inserts a new node on the list.
  add(node){
      // In case the list is currently empty.
      if(this.head === null){
          this.head = node;
          this.tail = this.head;
          this.size += 1;
      }// In case the new element is least than our first current element, it becomes the new first element.
      else if(node.leastThan(this.head)){
          node.next = this.head;
          this.head = node;
          this.size +=1;
      } // In case the new element is bigger than our last current element, it becomes the new last element.
      else if(this.tail.leastThan(node)){
          this.tail.next = node; // tvz de errado aqui
          this.tail = node;
          this.size +=1;
      }
      else{
          if(this.size === 1)
              return false;
          var it = this.head;
          var itNext = it.next;
          while(!it.equalsTo(this.tail)){
              // The new element lies in the middle of the list, but it is going to be inserted
              // only if there is not an intersection with the other time intervals.
              // Example: Let's try to add the interval [14h30:15h30] in the following scenarios:
              // a) [12h00:14h00][15h45:18h00] => OK:element inserted
              // b) [12h00:14h30][15h30:18h00] => OK:element inserted => it fills exactly the available time interval.
              // c) [12h00:14h40][15h45:18h00] => ERROR:element NOT inserted =>clinic is still full at 14h30.
              if(it.leastThan(node) && node.leastThan(itNext)){
                  node.next = itNext;
                  it.next = node;
                  this.size += 1;
                  return true;
              }
              it = itNext;
              itNext = itNext.next;
          }
          return false;
      }
      return true;
  }

  // Removes all the nodes created with the specifief rule.
  removeRule(rule){
      if(this.head === null)
          return;

      var pos = 0;
      var it = this.head;

      while(it != null){
          if(it.getRule()==rule){
              // Removes the element from the list.
              this.removeAtPos(pos);
              // Updates the iterator to the beginning of the list, since it has changed its length.
              it = this.head;
              pos = 0;
          }
          else{
              it = it.next;
              pos += 1;
          }
      }
  }

  // Removes a node from specific location.
  removeAtPos(pos){
      var count = 0;
      var it = this.head;
      // Out of boundary
      if(pos >= this.size)
          return;
      // Removes the first element and updates the this.head.
      if(pos == 0){
        this.head = this.head.next;
        this.size -= 1;
      } // Removes the last element and updates this.tail.
      else if(pos === this.size-1){
          while(it.next.next != null)
              it = it.next;
          it.next = null;
          this.tail = it;
          this.size -= 1;
      }
      else{
          // Element is in between head and tail.
          while(count != pos-1){
              it = it.next;
              count +=1;
          }
          it.next = it.next.next;
          this.size -= 1;
      }
  }
}

module.exports = ScheduleList;
