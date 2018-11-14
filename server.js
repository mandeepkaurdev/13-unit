const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

//mongoose.connect('mongodb://localhost/todolistsocketio', { useNewUrlParser: true });
mongoose.connect('mongodb://user:password1@ds031271.mlab.com:31271/heroku_620cwgw9', { useNewUrlParser: true });

require('./sockets/sockets')(io);
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

server.listen(PORT, () => {
  console.log('Server is listening');
})