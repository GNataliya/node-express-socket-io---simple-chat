const socket = io();

const allMessages = document.querySelector('.showMessage');
const userText = document.querySelector('.message');
const typingMessage = document.querySelector('.typingMessage');

const formEl = document.forms.sendMessage;

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const user = formData.get('name');
    const message = formData.get('message');
    
    const sendText = () => {
        socket.emit('/send text', { user, message });  // отправляем сообщения на бек
        //console.log({user, message})
        userText.value = '';
    }
    sendText();

    userText.addEventListener('keypress', () => {
        socket.emit('/typing', user)
    })

    socket.on('/typing', (data) => {
        //console.log(data);
        //console.log(data.user);
        const typingHtml = `<span>${data} is typing a message...</span>`;
        //typingMessage.innerHTML = `<span>${data.user} is typing a message...</span>`
        typingMessage.insertAdjacentHTML('beforeend', typingHtml);
    });


    // const divEl = (data) => {
    //     let list = [];
    //     for(el of data){
    //         const html = `<div>${el}</div>`;
    //         list.push(html);
    //     };
    //     allMessages.innerHTML = list;
    // };

    // const messageHistory = (data) => {
    //     console.log(data)
    //     const divEl = document.createElement('div');
    //     divEl.innerHTML = data;
    //     allMessages.append(divEl);
    // }

    const getText = (data) => {
        socket.on('/new text', (data) => {          // получаем сообщения с бека
        //console.log(data)
        typingMessage.innerHTML = '';
        // const divEl = document.createElement('div');
        // divEl.innerHTML = data;
        // allMessages.append(divEl);
        const html = `<div class="msg">${data.user}:     ${data.message}</div>`;
        //allMessages.innerHTML = html;
        //chatBox.append(allMessages);
        allMessages.insertAdjacentHTML('beforeend', html)
       });
    }
    getText();
    
    
});


    
  

// setTimeout(() => {
//     socket.emit('/chat', { uid: 'abr', message: 'Hi there' });
// }, 1000);


// const run = () => {
//     socket.emit('/pow', { val: 10, lvl: 2 }, (data) => {
//         console.log('data:', data);
//     });
// }
// run();

// socket.on('powResult', (data) => {
// //!!! если делаем так, то результат попадает в єту отдельную функцию
// });
