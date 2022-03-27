const socket = io()

const modal = document.getElementById('myModal');
const userform = document.getElementById('userForm');
const userName = document.getElementById('userName');
const postForm = document.getElementById('postForm');
const message = document.getElementById('message');
const container = document.getElementById('container');
const chatMessage = document.getElementById('chat-message');
const chatMsgMe = document.getElementById('chat-msg-me');
const chatMsgUser = document.getElementById('chat-msg-user');





userform.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = userName.value;
    const welcome = document.getElementById('welcome');
    welcome.innerText = 'Welcome ' + user;

    socket.emit('new-user', user);
    modal.style.display = 'none';
});

socket.on('joined-user', data => {
    const div = document.createElement('div');
    div.classList.add('chat-message-content');
    div.innerHTML = `<p class="joined-message">${data} joined ${new Date().toLocaleTimeString()}</p>`
    chatMessage.appendChild(div)
})

postForm.addEventListener('submit', e => {
    e.preventDefault()

    const name = userName.value;
    const msg = message.value;
    const div = document.createElement('div')
    div.classList.add('chat-message-me')
    div.innerHTML = `<p class="chat-me-message">You: ${msg}</p><span class="time-span">${new Date().toLocaleTimeString()} </span>`
    chatMessage.appendChild(div)

    socket.emit('new-message', {
        name,
        message: msg
    })
    message.value = ''
})

socket.on('message', ({ name, message }) => {
    const div = document.createElement('div')
    div.className = 'chat-message-user'
    div.innerHTML += `<span class="time-span">${new Date().toLocaleTimeString()} </span><p class="chat-user-message">${name}: ${message}</p>`
    chatMessage.appendChild(div)
})


socket.on('user-disconnect', (data) => {
    const div = document.createElement('div');
    div.classList.add('chat-message-content');
    h4.innerHTML += `User disconnected`
    container.appendChild(h4)
})





