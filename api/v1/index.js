module.exports = function(app,BASE_PATH){
	// ----------------------- API ALVARO -----------------------
	var stats = [
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
		}
	];
	// GET a datos iniciales /not-hospitalized-stats/loadInitialData
	app.get(BASE_PATH+"/not-hospitalized-stats/loadInitialData", (req,res)=>{
		var statsIniciales = [
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
		}
	];
		if(stats.length==0){
			stats=statsIniciales;
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(401,"UNAUTHORIZED, The api is not empty");
		}
	});
	// GET a la ruta base /not-hospitalized-stats
	app.get(BASE_PATH+"/not-hospitalized-stats", (req,res) =>{
		res.send(JSON.stringify(stats,null,2));
	});
	// GET a varios recursos con provincia /not-hospitalized-stats/Sevilla
	app.get(BASE_PATH+"/not-hospitalized-stats/:province", (req,res)=>{
		var province = req.params.province;
		var filteredStats = stats.filter((c) => {
			return (c.province == province);
		});
		if(filteredStats.length >= 1){
			res.send(filteredStats);
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(404,"NOT FOUND");
		}
	});
	// GET a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.get(BASE_PATH+"/not-hospitalized-stats/:province/:year", (req,res) =>{
		var province = req.params.province;
		var year = req.params.year;
		var filteredStats = stats.filter((c) => {
			return (c.province == province && c.year == year);
		});
		if(filteredStats.length == 1){
			res.send(filteredStats[0]);
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(404,"NOT FOUND");
		}
	});
	// POST a la ruta base /not-hospitalized-stats
	app.post(BASE_PATH+"/not-hospitalized-stats",(req,res) =>{
		var newStat = req.body;
		var provinceNewStat = req.body.province;
		var yearNewStat = req.body.year;
		var filteredStats = stats.filter((c) => {
			return (c.province == provinceNewStat && c.year == yearNewStat);
		});
		if((newStat == "") || (newStat.province == null) || (newStat.year == null) || (newStat.total == null) || (newStat.interurban == null) || (newStat.urban == null)){
			res.sendStatus(400,"BAD REQUEST");
		} else if(filteredStats.length >= 1){
			res.sendStatus(409,"CONFLICT");
		} else {
			stats.push(newStat);
			res.sendStatus(201,"CREATED");
		}
	});
	// POST a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
	app.post(BASE_PATH+"/not-hospitalized-stats/:province",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// POST a un recurso concreto /not-hospitalized-stats/Sevilla/2015 debe dar "Method Not Allowed"
	app.post(BASE_PATH+"/not-hospitalized-stats/:province/:year",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// DELETE a la ruta base /not-hospitalized-stats
	app.delete(BASE_PATH+"/not-hospitalized-stats", (req,res)=>{
		stats = [];
		res.sendStatus(200,"OK");
	});
	// DELETE a varios recursos concretos /not-hospitalized-stats/Sevilla
	app.delete(BASE_PATH+"/not-hospitalized-stats/:province", (req,res)=>{
		var province = req.params.province;
		var filteredStats = stats.filter((c) => {
			return (c.province != province);
		});
		if(filteredStats.length < stats.length){
			stats = filteredStats;
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(404,"NOT FOUND");
		}
	});
	// DELETE a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.delete(BASE_PATH+"/not-hospitalized-stats/:province/:year", (req,res)=>{
		var province = req.params.province;
		var year = req.params.year;
		var filteredStats = stats.filter((c) => {
			return (c.province != province || c.year != year);
		});
		if(filteredStats.length < stats.length){
			stats = filteredStats;
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(404,"NOT FOUND");
		}
	});
	
	// PUT a la ruta base /not-hospitalized-stats debe dar "Method Not Allowed"
	app.put(BASE_PATH+"/not-hospitalized-stats",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// PUT a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
	app.put(BASE_PATH+"/not-hospitalized-stats/:province",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	});
	// PUT a un recurso concreto /not-hospitalized-stats/Sevilla/2015
	app.put(BASE_PATH+"/not-hospitalized-stats/:province/:year",(req,res)=>{
		var province=req.params.province;
		var year=req.params.year;
		var updatedStat=req.body;
		var filteredStats = stats.filter((c) => {
			return (c.province == province && c.year == year);
		});
		if(filteredStats.length != 1){
			res.sendStatus(404,"NOT FOUND");
		}else if(filteredStats[0].province != updatedStat.province || filteredStats[0].year != updatedStat.year){
			res.sendStatus(409,"CONFLICT, THE PROVINCE OR YEAR ARE DIFFERENTS");
		}else{
			stats.forEach(c => {
				if(c.province == province && c.year == year){
					c.total=updatedStat.total;
					c.interurban=updatedStat.interurban;
					c.urban=updatedStat.urban;
				}
			});
			res.sendStatus(200,"OK");
		}
	});
}