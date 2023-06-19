const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
//cors
app.use(cors({ origin: true, credentials: true }));
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{ cors: { origin: true, credentials: true } });
const bodyParser = require("body-parser");
//uso url con parametros
app.use(express.urlencoded({ extended: true }));
//formato json en el express
app.use(express.json());
//Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//puerto
const PORT = process.env.PORT || 2000;
// Server - App
server.listen(PORT, () => {
  console.log("Servidor en ejecucion:" + PORT);
});

io.on("connection", (socket) => {
  console.log("Socket - EXP: ", socket.id);
  //funcion escuha video
  video(socket);
  Home(socket);
});

io.on("disconnected", () => {
  console.log("Fuera de service");
})


function video (socket){
  socket.on("video",(payload=String)=>{
  console.log("video Recibido", payload);
   io.emit('video-nuevo',payload);
  });
}

function Home(socket){
  socket.on("home",(payload=String)=>{
    console.log("home-recive", payload);
     io.emit('route',payload);
    });
}

