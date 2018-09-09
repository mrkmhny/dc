const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.use("/public", express.static(`${__dirname}/public`));

// Serve index.html when visiting "/"
// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/public/index.html`);
// });

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.emit('selfConnected', { msg: 'Welcome, you are connected' });

  socket.on('setNickname', (nickname) => {
    socket.nickname = nickname;
  });

  // JOIN ROOM
  socket.on('joinRoom', (data) => {
    // Error Handling
    if (!data.roomId) {
      const errorMessage =
        `Client ${socket.id} attempted to join a room, but did not provide a valid roomId. \n` +
        `Received object ${JSON.stringify(data)} \n` +
        `data.roomId was read as: ${data.roomId} \n`;
      console.error(errorMessage);
      socket.emit('customError', {
        msg: errorMessage,
      });
      return;
    }
    // Valid Handling
    socket.nickname = data.nickname;
    console.log(`Incoming request from ${socket.nickname} to join room ${data.roomId}`);
    socket.join(data.roomId, () => {
      socket.roomId = data.roomId;
      console.log(`${socket.id} joined room ${data.roomId}`);
      const roomPlayers = Object.keys(io.sockets.adapter.rooms[data.roomId].sockets)
        .map(clientId => ({
          nickname: io.sockets.connected[clientId].nickname,
          id: io.sockets.connected[clientId].id,
        }));
      // Object.keys(io.sockets.adapter.rooms[data.roomId].sockets).forEach((socketId) => {
      //   roomPlayers.push(io.sockets.clients[socketId]);
      // });
      console.log('roomPlayers', roomPlayers);
      socket.emit('selfJoinedRoom', {
        msg: `You joined room ${data.roomId}`,
        roomId: data.roomId,
        roomPlayers,
      });
      socket.broadcast.to(data.roomId).emit('playerJoinedRoom', {
        msg: `${socket.name} has joined the room`,
        joinedPlayer: socket.id,
        roomPlayers,
      });
    });
  });

  socket.on('userReady', () => {
    console.log(`The user ${socket.id} has indicated that they are ready`);
    console.log(`This socket was in the following rooms: ${JSON.stringify(socket.rooms)}`);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    socket.broadcast.to(socket.roomId).emit('playerLeftRoom', {
      msg: `User ${socket.id} (nickname: ${socket.nickname} has left room ${socket.roomId}`,
    });
    io.emit('userDisconnected', Object.keys(io.sockets.sockets)); // Not necessary for client to know
  });

 socket.on('vote', function (vote) {
   console.log('vote: ' + vote);
   io.emit('voteSuccess', { for: 'everyone' });
 });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
