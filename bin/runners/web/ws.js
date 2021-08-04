const sio = require('socket.io');

const run = (httpServer) => {
  const io = sio(httpServer);          // связываем с http сервером

  //const users = [];
  //const connections = [];

io.on('connection', (socket) => {  
  
  // socket.on('user', name => {
  //   users[socket.id] = name;
  // })

console.log(`connection ID: ${socket.id}`);
//connections.push(socket);
//console.log('Connected: %s sockets connected', connections.length);


socket.on('/send text', (data) => {                     // получаем сообщения юзеров с фронта 
  //console.log(data)
  //console.log(data.user)
  io.emit('/send text', data );
  // io.emit('/new text', { user: data.user, message: data.message });
  // socket.broadcast.emit('/new text', {name: users[socket.id], message: data.message });   //отправляем сообщение на фронт всем юзерам кроме себя
  //socket.broadcast.emit('/new text', {user: data.user, message: data.message });
  //console.log(users[socket.id])  
});

socket.on('/typing', (data) => {
  socket.broadcast.emit('/typing', data)
})
// socket.on('/typing', (data) => {
//   socket.broadcast.emit('/typing', data)
// })   

//  Disconnect 
socket.on('disconnect', (data) => {                   
  console.log(`disconnect ID: ${socket.id}`);
  //connections.splice(connections.indexOf(socket), 1);  
  //console.log('Disconnected: %s sockets connected', connection.length);
});


 });

}
 
module.exports = run; 