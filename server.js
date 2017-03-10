
io = socketio.listen(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');


//or//

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('room', (room)=> ws.join(room) )
  
  ws.on('message', (message)=> {
    console.log('received: %s', message);
  });

  ws.send('something');
});
