import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function getFlowers(cb){
  socket.on('flowers', flowers => cb(null, flowers));
  socket.emit('getFlowers');
}

function getRecent(comname, cb){
  socket.on('recent', recent => cb(null, recent));
  socket.emit('getRecent', comname);
}

function updateFlower(oldr, newr){
  socket.emit('update', oldr, newr);
  socket.emit('getFlowers');
}

function insertSighting(newr){
  socket.emit('insert', newr);
}

export { subscribeToTimer, getFlowers, getRecent, updateFlower, insertSighting };
