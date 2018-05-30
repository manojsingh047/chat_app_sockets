class Message {
    constructor(msg, handle) {
        this.message = msg;
        this.handle = handle;
    }
}

//Make Connection
let socket = io.connect("http://localhost:4000");

let handle = document.getElementById('handle');
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


//Emit Event
btn.addEventListener('click', function () {
    let msg = new Message(message.value, handle.value);
    socket.emit('chat', msg);
});

socket.on('chat', function (data) {
    feedback.innerHTML = "";
    let msg = new Message(data.message, data.handle);
    output.innerHTML += `<p><strong>`+ msg.handle +`: 
                        </strong>` + msg.message + `</p>`;
});


message.addEventListener('keypress',function () {
   socket.emit('typing',handle.value);
});


socket.on('typing',function (data) {
   feedback.innerHTML = '<p><em>'+data+' is typing a message.</em></p>';
});