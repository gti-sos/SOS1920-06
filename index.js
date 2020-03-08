const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();

app.get("/cool", (request,response) =>{ //Cuando te pida /cool, ejecútame..
	response.send("<html>"+cool()+"</html>");
}); 
app.listen(80);

//El app.use() lo que va a decir es.... "Todo lo que te pida de recurso, lo va a buscar en esa carpeta y te lo va a devolver"
//Nosotros aqui le hemos dicho... Cuando te manden a /public busca dentro de esa carpeta y si hay una carpeta se lo devuelves
app.use("/", express.static("./public")); 

console.log("Server ready");
