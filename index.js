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
    const expenses = db.collection('expenses');

    console.log(`MongoDB Connected: ${url}`);
});


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/book/:bookId', (req, res) => {
    res.sendFile(__dirname + '/book.html');
});

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
    }
    return result;
}

io.on('connection', (socket) => {
    socket.on('new book', function() {
        var bookId = makeId(7);
        socket.emit('goto book', bookId);
    });

    socket.on('open book', book => {
        socket.join(book);
        socket.emit('book', book);
        //get book info from database, or create new book
    });
});

http.listen(port, () => {
console.log(`Socket.IO server running at http://localhost:${port}/`);
});