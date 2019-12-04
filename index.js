const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')



const port = process.env.PORT || 8080;

const app = express();
const server = require('http').Server(app);
io = require('socket.io')(server);

app.use((req, res, next)=>{
    req.io = io;
    next();
})

io.on("connection", (socket) => {
    console.log("Socket is connected...")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())



mongoose.connect("mongodb+srv://nmcu:nmcu@estudos-aga7s.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useFindAndModify: false,
    useUnifiedTopology: true 
});


app.use(require('./routes'));



server.listen(port, () =>{
    console.log(`socket rodando na porta ${port}`)
});
