//const WebSocket = require('ws');
const sio = require('socket.io');


const run = (httpServer) => {
// WS Server
// const wsServer = new WebSocket.Server({ server: httpServer });    // приатачили ws server к обычному http 
const io = sio(httpServer);          // связываем с http сервером

const users = [];
//const connections = [];

// wsServer.on('connection', (socket) => {
 io.on('connection', (socket) => {  
  
  // socket.on('user', name => {
  //   users[socket.id] = name;
  // })

  console.log(`connection ID: ${socket.id}`);
  //connections.push(socket);
  //console.log('Connected: %s sockets connected', connections.length);
  
  // socket.on('/chat', (data) => {
  //   console.log('data:', data)
  // });


  // socket.on('/pow', (data, cb) => {
  //   const result = Math.pow(data.val, data.lvl);
  //   console.log('result pow:', result);

  //   cb({ result: result });
  //   //socket.emit('/powResult', result); для отправки в отдельную функцию
  // });


//   socket.on('message', (data) => {
//     console.log(`Frontend send ${data}`);
//     // console.log(`Socket ID ${socket.id} send ${data}`);
//   });

//   socket.send('I got info');

// });
// socket.on('disconnect', () => {
//   console.log(`disconnect ID: ${socket.id}`);
  
// });

socket.on('/send text', (data) => {                     // получаем сообщения юзеров с фронта 
  console.log(data)
    io.emit('/new text', { user: data.user, message: data.message });
  // socket.broadcast.emit('/new text', {name: users[socket.id], message: data.message });   //отправляем сообщение на фронт всем юзерам кроме себя
  //socket.broadcast.emit('/new text', {name: data.user, message: data.message });
  //console.log(users[socket.id])
  
});

socket.on('/typing', (data) => {
  socket.broadcast.emit('/typing', data)
})   

//  Disconnect 
socket.on('disconnect', (data) => {                   
  console.log(`disconnect ID: ${socket.id}`);
  //connections.splice(connections.indexOf(socket), 1);  
  //console.log('Disconnected: %s sockets connected', connection.length);
});


 });

}
 
module.exports = run; 