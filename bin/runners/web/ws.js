const sio = require('socket.io');

const run = (httpServer) => {
  const io = sio(httpServer);                            // связываем с http сервером


io.on('connection', (socket) => {  
console.log(`connection ID: ${socket.id}`);


socket.on('/send text', (data) => {                     // получаем сообщения юзеров с фронта 
  //console.log(data)
  //console.log(data.user)
  io.emit('/send text', data );
});

  
socket.on('/typing', (data) => {                         // отдаем инфо о чтом, что юзер печатаем всем кроме него
  socket.broadcast.emit('/typing', data)
})


//  Disconnect 
socket.on('disconnect', (data) => {                   
  console.log(`disconnect ID: ${socket.id}`);
});


 });
}
 
module.exports = run; 
