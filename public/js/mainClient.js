const socket = io();

const allMessages = document.querySelector('.newMessage');
const typingMessage = document.querySelector('.typingMessage');
const userText = document.querySelector('.message');

const formEl = document.forms.sendMessage;


const getText = (data) => {
    socket.on('/send text', (data) => {                          // получаем сообщения с бека
    allMessages.innerHTML += `<div class="msg">${data.user}:     ${data.message}</div>`;  
   });
}
getText();


let timer = null;                                               //    через время убираем надпись typing...             
const typingTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        typingMessage.innerHTML = ''
    }, 1000);
}


const showTyping = (data) => {                                  // выводим инфо полученную с бека о том, что юзер печатает на фронт
    socket.on('/typing', (data) => {
        typingMessage.innerHTML = `<span >${data} is typing a message...</span>`;
        typingTimer();
    });
}
showTyping();


formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const user = formData.get('name');
    const message = formData.get('message');
    
    const sendText = () => {
        socket.emit('/send text', { user, message });              // отправляем сообщения на бек
        userText.value = '';
    }
    sendText();


    userText.addEventListener('keypress', () => {                  // при нажатии клавиши отдаем инфо на бек, что юзер печатает
        socket.emit('/typing', user);
    });

    
});
