const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const names = ['Vasia', 'Petya', 'Misha', 'Pavel', 'Ivan'];
let usersOnline = {};

const newUser = (id) => {
    let name = names[Object.keys(usersOnline).length]; 
    let key = String(id);
    usersOnline[key] = name;
};

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);
        readStream.pipe(res);
    }));

const io = socket(server);

io.on('connection', client => {
    newUser(client.id);
    client.broadcast.emit('users-online', usersOnline);
    client.emit('users-online', usersOnline);

    client.on('disconnect', () => {
        delete usersOnline[client.id];
        client.broadcast.emit('users-online', usersOnline);
        client.emit('users-online', usersOnline);
    })

    client.on('client-msg', data => {
        const payload = {
            message: data.message,
            user: usersOnline[client.id]
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});

server.listen(5555);
