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
const PORT = process.env.PORT || 5000;
// Server - App
app.get("/",(req, res) => {

  res.send("Hola Mundo");

});

server.listen(PORT, () => {
  console.log("Servidor en ejecucion:" + PORT);
});


io.on("connection", (socket) => {
  console.log("Socket - EXP: ", socket.id);
  //funcion escuha video
   video(socket);
   Home(socket);//HOME INICIO
   Portal(socket);//PROYECCIONES
   Idioma(socket);//IDIOMA
   Slider(socket);//SLIDER IMAGEN MAPA
   SliderImg(socket)//SLIDER IMG global
   Apagar(socket)//Apagando 
   reiniciar(socket)//Reiniciando
   CanalPanama1(socket);//Canal Panama 1
   CanalPanama2(socket);//Canal Panama 2
   CanalPanama3(socket);//Canal Panama 3
   ClaveMorse(socket);//Clave Morse
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
    console.log("home-recive",payload);
     io.emit('route',payload);
    });
}

function Portal(socket){
  socket.on("portal",(payload=String)=>{
    console.log("portal: ", payload);
     io.emit('dataPortal',payload);
    });
}


function Idioma(socket){
  socket.on("langPost",(payload=String)=>{
   // console.log(payload);
    io.emit('langGet',payload);
  })
}

function Slider(socket){
  socket.on("slidenIn",(payload=String)=>{
    console.log("Slide Img: ", payload);
    io.emit('slideOut',payload);
  })
}

function SliderImg(socket){
  socket.on("img-In",(payload=String)=>{
  //   console.log("Slide Img: ", payload);
    io.emit('img-Out',payload);
  })
}

app.get('/apagar',(req, res)=>{
  res.status(200).json({message:'Apagando Equipo'})
  }
)

app.get('/reiniciar',(req, res)=>{
  res.status(200).json({message:'Reiniciando Equipo'})
})

function Apagar(socket){
  socket.on("apagado",(payload=String)=>{
   io.emit("apagando-recibiendo",payload);
  })
}

function reiniciar(socket){
  socket.on("reiniciar",(payload=String)=>{
   io.emit("reboot-recibiendo",payload);
  })
}


function CanalPanama1(socket){
  socket.on("canalPanama1",(payload=String)=>{
    console.log("Canal Panama 1: ", payload);
    io.emit('canalPanama1',payload);
  })
}

function CanalPanama2(socket){
  socket.on("canalPanama2",(payload=String)=>{
    console.log("Canal Panama 2: ", payload);
    io.emit('canalPanama2',payload);
  })
}

function CanalPanama3(socket){
  socket.on("canalPanama3",(payload=String)=>{
    console.log("Canal Panama 3: ", payload);
    io.emit('canalPanama3',payload);
  })
}

function ClaveMorse(socket){
  socket.on("claveMorse",(payload=String)=>{
    console.log("Clave Morse: ", payload);
    io.emit('claveMorse',payload);
  })
} 