const papucastico= require('./lib/papucastico')
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express();

app.get("/", (request, response) => {

  response.sendFile(__dirname + "/views/index.html");
});;


app.get("/papu",(req,res)=>{
  papucastico.getpapucastico(x=>{
  console.log(x)	
  	res.send(`${x}`)})
})



const listener = app.listen(PORT, () => {
  console.log("Escuchando en el puerto: " + PORT);
});

