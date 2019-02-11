Time = require('./Time.js');
ScheduleNode = require('./ScheduleNode.js');

class ScheduleList{
  constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  getHead(){
      return this.head;
  }

  print(){
      var it = this.head;
      while(it != null){
          it.print();
          it = it.next;
      }
      if(this.size==0)
        console.log("EMPTY LIST");
  }

  add(node){
      if(this.head === null){
          this.head = node;
          this.tail = this.head;
          this.size += 1;
      }
      else if(node.leastThan(this.head)){
          node.next = this.head;
          this.head = node;
          this.size +=1;
      }
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

  removeRule(rule){
      if(this.head === null)
          return;

      var pos = 0;
      var it = this.head;

      while(it != null){
          if(it.getRule()==rule){
              this.removeAtPos(pos);
              it = this.head;
              pos = 0;
          }
          else{
              it = it.next;
              pos += 1;
          }
      }
  }

  removeAtPos(pos){
      var count = 0;
      var it = this.head;

      if(pos >= this.size)
          return;
      //lembrar de atualizar tail
      if(pos == 0){
        this.head = this.head.next;
        this.size -= 1;
      }
      else if(pos === this.size-1){
          while(it.next.next != null)
              it = it.next;
          it.next = null;
          this.tail = it;
          this.size -= 1;
      }
      else{
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
