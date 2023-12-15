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
  //  Apagar(socket)//Apagando 
  //  reiniciar(socket)//Reiniciando
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
    io.emit('img-Out',payload);
  })
}

app.post('/api/v1/apagar',(req, res)=>{
  res.status(200).json({message:'Apagando Equipo'})
  const jsonData=Object.values(req.body);
  console.log(jsonData);
    io.emit("apagado", parseInt(jsonData));
  }
)

app.post('/api/v1/reiniciar',(req, res)=>{
  res.status(200).json({message:'Reiniciando Equipo'})
  const jsonData=Object.values(req.body);
  console.log(jsonData)
  io.emit("reiniciar",parseInt(jsonData));
})

/*function Apagar(socket){
   socket.on("apagado",(payload=String)=>{
   io.emit("apagando-recibiendo",payload);
   })
 }

 function reiniciar(socket){
 socket.on("reiniciar",(payload=String)=>{
   io.emit("reboot-recibiendo",payload);
  })
 }*/