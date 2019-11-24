const WebSocket = require('ws');

const ws = new WebSocket('ws://185.81.167.249:3000');
var start 
var end 

ws.on('open', function open() {
console.log("send")
  ws.send('something');
  console.log("start")

  start = new Date().getTime();
  console.time('someFunction');


});

ws.on('message', function incoming(data) {
 console.timeEnd('someFunction');
  end = new Date().getTime();
  console.log(end-start);
  start = 0
  end = 0
  ws.send("again")
  console.time('someFunction');

  start = new Date().getTime();
});
