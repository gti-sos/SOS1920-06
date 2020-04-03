module.exports = function(app,BASE_PATH){

var accstats = [
	{ 
		province: "Madrid",
		year: 2014,
		accvictotal: 19942,
		accvicinter: 4324,
		accfall: 114
	},
	{ 
		province: "Sevilla",
		year: 2018,
		accvictotal: 6515,
		accvicinter: 1945,
		accfall: 58	
	}
];


//const BASE_API_URL = "/api/v1"; //Tendremos aqui la URL Base, la api el path...


/**************************************************/
// Load Initial Data . . .
/**************************************************/


app.get(BASE_PATH + "/accstats/loadInitialData", (req, res) => {
	
	var accstats = [
	{ 
		province: "Madrid",
		year: 2014,
		accvictotal: 19942,
		accvicinter: 4324,
		accfall: 114
	},
	{ 
		province: "Sevilla",
		year: 2018,
		accvictotal: 6515,
		accvicinter: 1945,
		accfall: 58	
	}
];
	console.log(". . . Loading initial data");
	res.send(JSON.stringify(accstats,null,2));	
});


////////////////////////////////////////////////////
// GET accstats   
////////////////////////////////////////////////////

app.get(BASE_PATH +"/accstats", (req,res) =>{ //En req vienen los datos de la petición.
	res.send(JSON.stringify(accstats,null,2)); //En JSON devuelvo todos los contactos
	console.log("Data sent: "+JSON.stringify(accstats, null, 2));
});


////////////////////////////////////////////////////
// POST accstats   
////////////////////////////////////////////////////

app.post(BASE_PATH +"/accstats",(req,res) =>{
	//accstats.push(req.body);  //En req me vienen los datos de la petición, cojo el body también
	//Verificaremos ahora que es un contacto
	var newAccstats = req.body;
	if((newAccstats == "") || (newAccstats.province == null)){  //Si está vacío o es nulo
		res.sendStatus(400, "BAD REQUEST");
	}else{
		accstats.push(newAccstats);
		res.sendStatus(201,"CREATED"); 
	}
});

////////////////////////////////////////////////////
// PUT accstats
////////////////////////////////////////////////////

app.put(BASE_PATH +"/accstats/", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

////////////////////////////////////////////////////
// DELETE accstats   
////////////////////////////////////////////////////


app.delete(BASE_PATH + "/accstats", (req,res) =>{
	accstats = ["YOU DON'T HAVE ANY accstats"];
	res.sendStatus(200, "accstats DELETED");
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//  ========> AHORA SOBRE ELEMENTOS EN CONCRETO...

////////////////////////////////////////////////////
// GET accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////


app.get(BASE_PATH +"/accstats/:province", (req,res)=>{ //El :province lo que hace es como que crea una variable que puede tener cualquier valor, yo puedo tener /:org /:loquesea yo puedo tener los que yo quiera
	//¿Cómo accedería al valor concreto de lo que me ha llegado? Pues así con el params el nombre que yo le haya puesto en el : con param me lo pilla
	var province = req.params.province;
	
	var filteredAccstats = accstats.filter((p) => {
		//Le digo que solo me deje pasar en el caso de que el contacto tenga el mismo nombre que el que me están pasando
		return (p.province == province);
	});
	
	if(filteredAccstats.length >= 1){
		res.send(filteredAccstats[0]); //Devolvería el primer elemento de ese array
	}else{
		res.sendStatus(404, "ACCSTAT NOT FOUND");
	}
});



////////////////////////////////////////////////////
// POST accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.post(BASE_PATH +"/accstats/:province", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});


////////////////////////////////////////////////////
// PUT accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.put(BASE_PATH +"/accstats/:province", (req,res)=>{
	var province = req.params.province;
	var body = req.body;
	
	var updatedAccstats = accstats.map((c) => {
		var updatedC = c;
		
		if (c.province == province) {
			for (var p in body) {
				updatedC[p] = body[p];
			}	
		}
		return (updatedC);
	});
	
	if (updatedAccstats.length == 0) {
		res.sendStatus(404, "ACCSTAT NOT FOUND");
	} else {
		accstats = updatedAccstats;
		res.sendStatus(200, "OK");
	}
});


////////////////////////////////////////////////////
// DELETE accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.delete(BASE_PATH +"/accstats/:province", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var province = req.params.province;
	
	var filteredAccstats = accstats.filter((c) => {
		return (c.province != province);
	});
	
	
	if(filteredAccstats.length < accstats.length){
		accstats = filteredAccstats;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ACCSTAT NOT FOUND");
	}	
});
	
}