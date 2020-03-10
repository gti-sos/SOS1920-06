const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();
var port = process.env.PORT || 80; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.

app.get("/cool", (request,response) =>{ //Cuando te pida /cool, ejecútame..
	response.send("<html>"+cool()+"</html>");
}); 
app.listen(port, () => { //No es recomendable poner el puerto 80, en heroku habrá que especificarle el puerto.
	console.log("Server ready");
});

//El app.use() lo que va a decir es.... "Todo lo que te pida de recurso, lo va a buscar en esa carpeta y te lo va a devolver"
//Nosotros aqui le hemos dicho... Cuando te manden a /public busca dentro de esa carpeta y si hay una carpeta se lo devuelves
app.use("/", express.static("./public")); 

console.log("Starting server . . . ");
