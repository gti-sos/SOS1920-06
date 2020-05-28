module.exports = function (app) {
	console.log("Registering not hospitalized stats API...")
	const dataStore = require("nedb");
	const path = require("path");
	const dbFileName = path.join(__dirname,"not-hospitalized-stats.db");
	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});
	const BASE_API_URL = "/api/v2";
	var initialStats = [
		{ 
			province: "Madrid",
			year: 2014,
			total: 18412,
			interurban: 4068,
			urban: 14344	
		},
		{ 
			province: "Sevilla",
			year: 2014,
			total: 6100,
			interurban: 1994,
			urban: 4106	
		},
		{
			province: "Soria",
			year: 2014,
			total: 149,
			interurban: 128,
			urban: 21	
		},
		{ 
			province: "Tarragona",
			year: 2014,
			total: 2381,
			interurban: 1377,
			urban: 1004	
		},
		{ 
			province: "Teruel",
			year: 2014,
			total: 229,
			interurban: 174,
			urban: 55	
		},
		{ 
			province: "Teruel",
			year: 2015,
			total: 144,
			interurban: 116,
			urban: 28	
		},
		{ 
			province: "Badajoz",
			year: 1993,
			total: 743,
			interurban: 420,
			urban: 323	
		},
		{ 
			province: "Burgos",
			year: 1994,
			total: 1189,
			interurban: 826,
			urban: 363	
		},
		{ 
			province: "Tarragona",
			year: 1995,
			total: 1676,
			interurban: 1044,
			urban: 632	
		},
		{ 
			province: "Cuenca",
			year: 1996,
			total: 778,
			interurban: 659,
			urban: 119	
		},
		{ 
			province: "Albacete",
			year: 1997,
			total: 815,
			interurban: 462,
			urban: 353	
		},
		{ 
			province: "Badajoz",
			year: 1998,
			total: 878,
			interurban: 490,
			urban: 388	
		},
		{ 
			province: "Burgos",
			year: 1999,
			total: 1454,
			interurban: 1099,
			urban: 355	
		},
		{ 
			province: "Tarragona",
			year: 2000,
			total: 2179,
			interurban: 1352,
			urban: 827	
		},
		{ 
			province: "Cuenca",
			year: 2001,
			total: 944,
			interurban: 825,
			urban: 119	
		}
	];

	db.remove({}, { multi: true });
	db.insert(initialStats);

	// GET a datos iniciales /not-hospitalized-stats/loadInitialData
	app.get(BASE_API_URL+"/not-hospitalized-stats/loadInitialData", (req,res)=>{
		console.log("New GET .../loadInitialData");
		db.find({}, (err, stats) =>{
			if(stats.length==0){
				db.insert(initialStats);
				res.sendStatus(200,"OK");
				console.log("initialStats loaded sent:"+JSON.stringify(initialStats,null,2));
			}else{
				res.sendStatus(401,"UNAUTHORIZED, The api is not empty");
			}
		});
	});
	// GET a la ruta base /not-hospitalized-stats
	app.get(BASE_API_URL +"/not-hospitalized-stats", (req,res) =>{
		var limit = Number(req.query.limit);
		var offset = Number(req.query.offset);
		var search = {};
		if(req.query.province){
			search['province'] = req.query.province;
		};
		if(req.query.year){
			search['year'] = Number(req.query.year);
		};
		if(req.query.totalMinim && req.query.totalMaxim){
			search['total'] = {
				$gte: Number(req.query.totalMinim),
				$lte: Number(req.query.totalMaxim)
			};
		};
		if(req.query.totalMinim && !req.query.totalMaxim){
			search['total'] = {$gte: Number(req.query.totalMinim)};
		};	
		if(!req.query.totalMinim && req.query.totalMaxim){
			search['total'] = {$lte: Number(req.query.totalMaxim)}
		};
		if(req.query.interurbanMinim && req.query.interurbanMaxim){
			search['interurban'] = {
				$gte: Number(req.query.interurbanMinim),
				$lte: Number(req.query.interurbanMaxim)
			};
		};	
		if(req.query.interurbanMinim && !req.query.interurbanMaxim){
			search['interurban'] = {$gte: Number(req.query.interurbanMinim)};
		};	
		if(!req.query.interurbanMinim && req.query.interurbanMaxim){
			search['interurban'] = {$lte: Number(req.query.interurbanMaxim)};
		};
		if(req.query.urbanMinim && req.query.urbanMaxim){
			search['urban'] = {
				$gte: Number(req.query.urbanMinim),
				$lte: Number(req.query.urbanMaxim)
			};
		};	
		if(req.query.urbanMinim && !req.query.urbanMaxim){
			search['urban'] = {$gte: Number(req.query.urbanMinim)};
		}
		if(!req.query.urbanMinim && req.query.urbanMaxim){
			search['urban'] = {$lte: Number(req.query.urbanMaxim)};
		};
		db.find(search).skip(offset).limit(limit).exec(function(err, stats) {
			stats.forEach( (c) => {
				delete c._id;
			});
			if(stats != 0){
				res.status(200,"OK").send(JSON.stringify(stats,null,2));				
			}else{
				res.sendStatus(404, "NOT FOUND");	
			};
		});
	});
	// GET a varios recursos con provincia /not-hospitalized-stats/Sevilla
	app.get(BASE_API_URL+"/not-hospitalized-stats/:province", (req,res)=>{
		var province = req.params.province;
        db.find({province:province}, (err,stat)=>{
            if(stat.length!=0){
				stat.forEach((c)=>{
                    delete c._id;
                });
				res.status(200,"OK").send(JSON.stringify(stat,null,2));
            }else{
                res.sendStatus(404,"NOT FOUND");
            }
        });
	});
	// GET a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.get(BASE_API_URL+"/not-hospitalized-stats/:province/:year", (req,res) =>{
		var province = req.params.province;
        var year = Number(req.params.year);
        db.find({province:province,year:year}, (err,stat)=>{
            if(stat.length!=0){
                stat.forEach((c)=>{
                    delete c._id;
                });
                oneStat = new Object(stat[0]);
				res.status(200,"OK").send(JSON.stringify(oneStat,null,2));
            }else{
				res.sendStatus(404,"NOT FOUND");
            }
        });
	});
	// POST a la ruta base /not-hospitalized-stats
	app.post(BASE_API_URL+"/not-hospitalized-stats",(req,res) =>{
		var newStat = req.body;
		var province = req.body.province;
		var year = req.body.year;
		db.find({province:province,year:year}, (err,stat)=>{
            if((newStat == "") || (newStat.province == null) || (newStat.year == null) || (newStat.total == null) || (newStat.interurban == null) || (newStat.urban == null)){
			res.sendStatus(400,"BAD REQUEST");
			} else if(stat.length >= 1){
				res.sendStatus(409,"CONFLICT");
			} else {
				db.insert(newStat);
				res.status(201,"CREATED").send(JSON.stringify(newStat,null,2));
			}
		});
    });
	// POST a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
	app.post(BASE_API_URL+"/not-hospitalized-stats/:province",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// POST a un recurso concreto /not-hospitalized-stats/Sevilla/2015 debe dar "Method Not Allowed"
	app.post(BASE_API_URL+"/not-hospitalized-stats/:province/:year",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// DELETE a la ruta base /not-hospitalized-stats
	app.delete(BASE_API_URL+"/not-hospitalized-stats", (req,res)=>{
		db.remove({}, { multi: true });
		res.sendStatus(200);
	});
	// DELETE a varios recursos concretos /not-hospitalized-stats/Sevilla
	app.delete(BASE_API_URL+"/not-hospitalized-stats/:province", (req,res)=>{
		var province = req.params.province;
		db.find({province:province}, (err,stat)=>{
			if(stat.length > 0){
				db.remove({province:province},{ multi: true });
				res.sendStatus(200,"OK");
			}else{
				res.sendStatus(404,"NOT FOUND");
			}
		});
	});
	// DELETE a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.delete(BASE_API_URL+"/not-hospitalized-stats/:province/:year", (req,res)=>{
		var province = req.params.province;
		var year = Number(req.params.year);
		db.find({province:province, year:year}, (err,stat)=>{
			if(stat.length > 0){
				db.remove({province:province, year:year},{ multi: true });
				res.sendStatus(200,"OK");
			}else{
				res.sendStatus(404,"NOT FOUND");
			}
		});
	});
	// PUT a la ruta base /not-hospitalized-stats debe dar "Method Not Allowed"
	app.put(BASE_API_URL+"/not-hospitalized-stats",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// PUT a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
	app.put(BASE_API_URL+"/not-hospitalized-stats/:province",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// PUT a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.put(BASE_API_URL+"/not-hospitalized-stats/:province/:year",(req,res)=>{
		var province=req.params.province;
		var year=Number(req.params.year);
		var updatedStat=req.body;
		db.find({province:province, year:year}, (err,stat)=>{
			if(stat.length != 1){
				res.sendStatus(404,"NOT FOUND");
			}else if((updatedStat == "") || (updatedStat.province == null) || (updatedStat.year == null) || (updatedStat.total == null) || (updatedStat.interurban == null) || (updatedStat.urban == null)){
				res.sendStatus(400,"BAD REQUEST");
			}else if(stat[0].province != updatedStat.province || stat[0].year != updatedStat.year){
				res.sendStatus(409,"CONFLICT, THE PROVINCE OR YEAR ARE DIFFERENTS");
			}else{
				db.update({province:province, year:year},{$set: updatedStat},{ multi: true });
				res.sendStatus(200,"OK");
			};
		});
	});
}