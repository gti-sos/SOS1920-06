module.exports = function(app,BASE_PATH){

	const dataStore = require("nedb");
	const path = require("path");
	const dbFileName = path.join(__dirname,"accstats.db"); 	
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
	
	});
	
var initialAccstats = [
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
	},
	
	{ 
		province: "Cádiz",
		year: 2017,
		accvictotal: 4207,
		accvicinter: 1186,
		accfall: 34
	},

	{ 
		province: "Jaén",
		year: 2017,
		accvictotal: 1386,
		accvicinter: 635,
		accfall: 35
	},

	{ 
		province: "Almería",
		year: 2016,
		accvictotal: 1175,
		accvicinter: 935,
		accfall: 40
	},

	{ 
		province: "Cantabria",
		year: 2013,
		accvictotal: 1269,
		accvicinter: 1091,
		accfall: 20
	},

	{ 
		province: "Soria",
		year: 2014,
		accvictotal: 184,
		accvicinter: 154,
		accfall: 14
	},

	{ 
		province: "Ceuta",
		year: 2014,
		accvictotal: 401,
		accvicinter: 45,
		accfall: 0
	},

	{ 
		province: "Pontevedra",
		year: 2017,
		accvictotal: 2719,
		accvicinter: 2017,
		accfall: 31
	},

	{ 
		province: "Girona",
		year: 2015,
		accvictotal: 3316,
		accvicinter: 1734,
		accfall: 41
	},

	{ 
		province: "Valencia",
		year: 2018,
		accvictotal: 5083,
		accvicinter: 2769,
		accfall: 88
	},
	
	{ 
		province: "Burgos",
		year: 2014,
		accvictotal: 5083,
		accvicinter: 747,
		accfall: 24
	},

	{ 
		province: "Albacete",
		year: 2018,
		accvictotal: 708,
		accvicinter: 159,
		accfall: 11
	},

	{ 
		province: "Castellón",
		year: 2018,
		accvictotal: 885,
		accvicinter: 491,
		accfall: 105
	},

	{ 
		province: "Huelva",
		year: 2018,
		accvictotal: 718,
		accvicinter: 425,
		accfall: 75
	},

	{ 
		province: "Melilla",
		year: 2015,
		accvictotal: 594,
		accvicinter: 1,
		accfall: 2
	},

	{ 
		province: "Ceuta",
		year: 2018,
		accvictotal: 297,
		accvicinter: 41,
		accfall: 2
	},

	{ 
		province: "Segovia",
		year: 2017,
		accvictotal: 4592,
		accvicinter: 205,
		accfall: 10
	},

	{ 
		province: "Coruña",
		year: 2015,
		accvictotal: 1443,
		accvicinter: 900,
		accfall: 47
	},

	{ 
		province: "Málaga",
		year: 2016,
		accvictotal: 2215,
		accvicinter: 862,
		accfall: 57
	},

	{ 
		province: "Ourense",
		year: 2016,
		accvictotal: 2304,
		accvicinter: 232,
		accfall: 15
	},

	{ 
		province: "Barcelona",
		year: 2015,
		accvictotal: 19625,
		accvicinter: 4968,
		accfall: 131
	}
];


/**************************************************/
// Load Initial Data . . .
/**************************************************/


app.get(BASE_PATH + "/accstats/loadInitialData", (req, res) => {
	
	console.log(". . . Loading initial data");
	db.remove({}, { multi: true }, function(err, numRemoved) {});
	db.insert(initialAccstats);
	res.sendStatus(200);
	console.log("Initial Accstats loaded: "+JSON.stringify(initialAccstats, null, 2));
});


////////////////////////////////////////////////////
// GET accstats   
////////////////////////////////////////////////////

	/**
	. . . Lo que había antes 
	
	app.get(BASE_PATH +"/accstats", (req,res) =>{ //En req vienen los datos de la petición.
	res.send(JSON.stringify(accstats,null,2)); //En JSON devuelvo todos los contactos
	console.log("Data sent: "+JSON.stringify(accstats, null, 2));
	});
	**/
	
app.get(BASE_PATH +"/accstats", (req,res) =>{ //En req vienen los datos de la petición.
	
	var limit = parseInt(req.query.limit);
	var offset = parseInt(req.query.offset);
	var search = {};
	
	if(req.query.province) search['province'] = req.query.province;
	if(req.query.year) search['year'] = parseInt(req.query.year);
	////////////
	if(req.query.accvictotalMin && req.query.accvictotalMax)
		search['accvictotal'] = {
			$gte: parseInt(req.query.accvictotalMin),
			$lte: parseInt(req.query.accvictotalMax)
		}
	if(req.query.accvictotalMin && !req.query.accvictotalMax)
		search['accvictotal'] = {$gte: parseInt(req.query.accvictotalMin)};
	if(!req.query.accvictotalMin && req.query.accvictotalMax)
		search['accvictotal'] = {$lte: parseInt(req.query.accvictotalMax)}
	
	
	/////////////
	if(req.query.accvicinterlMin && req.query.accvicinterMax)
		search['accvicinter'] = {
			$gte: parseInt(req.query.accvicinterMin),
			$lte: parseInt(req.query.accvicinterMax)
		}
	if(req.query.accvicinterMin && !req.query.accvicinterMax)
		search['accvicinter'] = {$gte: parseInt(req.query.accvicinterMin)};
	if(!req.query.accvicinterMin && req.query.accvicinterMax)
		search['accvicinter'] = {$lte: parseInt(req.query.accvicinterMax)};
	////////////
	if(req.query.accfallMin && req.query.accfallMax)
		search['accfall'] = {
			$gte: parseInt(req.query.accfallMin),
			$lte: parseInt(req.query.accfallMax)
		}
	if(req.query.accfallMin && !req.query.accfallMax)
		search['accfall'] = {$gte: parseInt(req.query.accfallMin)};
	if(!req.query.accfallMin && req.query.accfallMax)
		search['accfall'] = {$lte: parseInt(req.query.accfallMax)};
	
	

	db
		.find(search)
		.skip(offset)
		.limit(limit)
		.exec(function(err, accstats) {
			accstats.forEach(p => {
				delete p._id;
			});
		
		if(accstats == 0){
			res.sendStatus(404, "ACCSTATS NOT FOUND");
		}else{
			res.send(JSON.stringify(accstats, null, 2));
			console.log("Data sent: "+JSON.stringify(accstats, null,2));
		}	
	});
});
	
	
	
	/** Al principio con NEDB.. (PARA URLS)
	
	
	console.log("New GET .../accstats");
	db.find({}, (err, accstats) => {
		accstats.forEach( (p) => {
			delete p._id;
		});
		res.send(JSON.stringify(accstats, null, 2));
		console.log("Data sent: "+JSON.stringify(accstats, null,2));
	})
});

	**/

////////////////////////////////////////////////////
// POST accstats   
////////////////////////////////////////////////////

app.post(BASE_PATH +"/accstats",(req,res) =>{

	var newAccstats = req.body;
	var province = req.body.province;
	var year = req.body.year;
	db.find({province:province, year:year}, (err, stat)=>{
		if(
			newAccstats == {} ||
	    	(newAccstats.province == null || newAccstats.province == '') ||
			(newAccstats.year == null || newAccstats.year == '') ||
			(newAccstats.accvictotal == null || newAccstats.accvictotal == '') ||
			(newAccstats.accvicinter == null || newAccstats.accvicinter == '') ||
			(newAccstats.accfall == null || newAccstats.accfall == '')
			){
			res.sendStatus(400, "BAD REQUEST");
	}else if(stat.length>=1){
		res.sendStatus(409, "CONFLICT");
	}else{
		db.insert(newAccstats);
		res.sendStatus(201,"CREATED"); 
	}
	});
	
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
	db.remove({}, { multi: true }, function(err, numRemoved) {});
	res.sendStatus(200, "accstats DELETED");
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//  ========> AHORA SOBRE ELEMENTOS EN CONCRETO...

////////////////////////////////////////////////////
// GET accstats/XXX Es decir, a varios con provincia        
////////////////////////////////////////////////////


app.get(BASE_PATH +"/accstats/:province", (req,res)=>{ //El :province lo que hace es como que crea una variable que puede tener cualquier valor, yo puedo tener /:org /:loquesea yo puedo tener los que yo quiera
	//¿Cómo accedería al valor concreto de lo que me ha llegado? Pues así con el params el nombre que yo le haya puesto en el : con param me lo pilla
	var province = req.params.province;
	
	db.find({province: province}, (err, accstats) => {
		accstats.forEach(e => {
			delete e._id;
		});
		res.send(JSON.stringify(accstats[0], null, 2)); //En este get me saca un objeto no el array de los objetos
	});
});

////////////////////////////////////////////////////
// GET accstats/XXX Es decir, a uno en concreto
////////////////////////////////////////////////////	
	
app.get(BASE_PATH +"/accstats/:province/:year", (req,res)=>{ //El :province lo que hace es como que crea una variable que puede tener cualquier valor, yo puedo tener /:org /:loquesea yo puedo tener los que yo quiera
	//¿Cómo accedería al valor concreto de lo que me ha llegado? Pues así con el params el nombre que yo le haya puesto en el : con param me lo pilla
	var province = req.params.province;
	var year = parseInt(req.params.year);
	
	db.find({province: province, year: year}, (err, accstats) => {
		accstats.forEach(e => {
			delete e._id;
		});
		res.send(JSON.stringify(accstats[0], null, 2)); //En este get me saca un objeto no el array de los objetos
	});
});
	
	


////////////////////////////////////////////////////
// POST accstats/XXX Es decir, a varios recursos con provincia  
////////////////////////////////////////////////////

app.post(BASE_PATH +"/accstats/:province", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});
	
////////////////////////////////////////////////////
// POST accstats/XXX Es decir, a uno en concreto 
////////////////////////////////////////////////////

app.post(BASE_PATH +"/accstats/:province/:year", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

	
////////////////////////////////////////////////////
// PUT accstats/XXX Es decir, a varios recursos con provincia   
////////////////////////////////////////////////////
	
app.put(BASE_PATH +"/accstats/:province", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

////////////////////////////////////////////////////
// PUT accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.put(BASE_PATH +"/accstats/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = parseInt(req.params.year);
	var body = req.body;
	var newProv = body.province;
	var newYear = parseInt(body.year);
	
	if(province != newProv || year != newYear){
		res.sendStatus(400, "ACCSTAT NOT FOUND");
	}else{
		db.update({province: province, year: year}, 
				  	{$set: {accvictotal: body.accvictotal,  accvicinter: body.accvicinter,  accfall: body.accfall}}, //Lo que dejo que modifique
					{}, //multi
				  	function(err, numReplaced) {}
		);
		res.sendStatus(200, "ACCSTAT MODIFIED");
	}
});


////////////////////////////////////////////////////
// DELETE accstats/XXX Es decir, a varios recursos con provincia       
////////////////////////////////////////////////////
	
app.delete(BASE_PATH +"/accstats/:province", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var province = req.params.province;

	db.remove({province: province}, {}, function(err, numRemoved) {});
	res.sendStatus(200, "ACCSTAT REMOVED");
});
	
////////////////////////////////////////////////////
// DELETE accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.delete(BASE_PATH +"/accstats/:province/:year", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var province = req.params.province;
	var year = parseInt(req.params.year);
	
	db.remove({province: province, year: year}, {}, function(err, numRemoved) {});
	res.sendStatus(200, "ACCSTAT REMOVED");
	
});
	
}