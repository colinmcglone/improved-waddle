/*
const MongoClient = require('mongodb').MongoClient;

// Connect URL
const url = 'mongodb://127.0.0.1:27017';

// Connec to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('expens');

    console.log(`MongoDB Connected: ${url}`);
});

const expenses = db.collection('expenses');
*/

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
io.on('connection', (socket) => {
});

http.listen(port, () => {
console.log(`Socket.IO server running at http://localhost:${port}/`);
});