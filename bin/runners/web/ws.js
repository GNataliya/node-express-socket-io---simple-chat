const sio = require('socket.io');


const run = (httpServer) => {

const io = sio(httpServer);          // связываем с http сервером

 io.on('connection', (socket) => {  
    console.log(`connection ID: ${socket.id}`);
  
  socket.on('/send text', (data) => {                     // получаем сообщения юзеров с фронта 
  console.log(data)
    io.emit('/new text', { user: data.user, message: data.message });
});

socket.on('/typing', (data) => {                          // отправляем всем юзерам сообщение, что кто-то печатает
  socket.broadcast.emit('/typing', data)
});   

//  Disconnect 
socket.on('disconnect', (data) => {                   
  console.log(`disconnect ID: ${socket.id}`);
  
});


 });

}
 
module.exports = run; 
