const socket = io();

const allMessages = document.querySelector('.newMessage');
const typingMessage = document.querySelector('.typingMessage');
const userText = document.querySelector('.message');

const formEl = document.forms.sendMessage;

const getText = (data) => {
    socket.on('/send text', (data) => {          // получаем сообщения с бека
    // socket.on('/new text', (data) => {          // получаем сообщения с бека
    //typingMessage.innerHTML = '';
    // const html = `<div class="msg">${data.user}:     ${data.message}</div>`;
    // allMessages.insertAdjacentHTML('beforeend', html); 
    allMessages.innerHTML += `<div class="msg">${data.user}:     ${data.message}</div>`;  
   });
}
getText();

let timer = null;
const typingTimer = () => {
    //typingMessage.classList.remove('show');
    clearTimeout(timer);
    timer = setTimeout(() => {
        //typingMessage.classList.add('hidden') 
        typingMessage.innerHTML = ''
    }, 1000);
}

const showTyping = (data) => {
    socket.on('/typing', (data) => {
        typingMessage.innerHTML = `<span >${data} is typing a message...</span>`;
        typingTimer();
    });
    
}
showTyping();




// let timer = null;
// const showTyping = (data) => {
//     socket.on('/typing', (data) => {           // получаем сообщение с бека, что юзер песатает
//         //console.log(data);
//         //console.log(data.user);
//         const typingHtml = `<span >${data} is typing a message...</span>`;
//         typingMessage.insertAdjacentHTML('beforeend', typingHtml); 

//         clearTimeout(timer);                // очищается, но пока очистится выводит много раз
//         timer = setTimeout(() => {
//             typingMessage.innerHTML = ''
//         }, 500);

//     });
// }


formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const user = formData.get('name');
    const message = formData.get('message');
    
    const sendText = () => {
        socket.emit('/send text', { user, message });  // отправляем сообщения на бек
        userText.value = '';
    }
    sendText();


    userText.addEventListener('keypress', () => {
        socket.emit('/typing', user);
    });

    
});
