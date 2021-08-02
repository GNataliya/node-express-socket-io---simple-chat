const socket = io();

const allMessages = document.querySelector('.showMessage');
const userText = document.querySelector('.message');
const typingMessage = document.querySelector('.typingMessage');

const formEl = document.forms.sendMessage;

formEl.addEventListener('submit', (ev) => {                        // отслеживаем событие submit и по нажатию срабатывают функции:  
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const user = formData.get('name');
    const message = formData.get('message');
    
    const sendText = () => {
        socket.emit('/send text', { user, message });               // отправляем сообщения на бек
        //console.log({user, message})
        userText.value = '';                                        // очищаем поле сообщения
    }
    sendText();

    userText.addEventListener('keypress', () => {                    // отслеживаем событие keypress 
        socket.emit('/typing', user)                                 // отправляем эту инфо на сервер
    });

    socket.on('/typing', (data) => {                                  // получаем с сервера инфо о событии typing и выводим ее на фронт 
        const typingHtml = `<span>${data} is typing a message...</span>`;
        typingMessage.insertAdjacentHTML('beforeend', typingHtml);
    });

    const getText = (data) => {
        socket.on('/new text', (data) => {                             // получаем сообщения с бека
        //console.log(data)
        typingMessage.innerHTML = '';                                  //  очищаем поле о наборе текста
       
        const html = `<div class="msg">${data.user}:     ${data.message}</div>`;    // выводим сообщение юзерам
        allMessages.insertAdjacentHTML('beforeend', html)
       });
    }
    getText();
    
    
});
