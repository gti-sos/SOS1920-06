const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 80;

const BASE_PATH = "/api/v1/stats"

var apiRest = {};
module.exports = apiRest;


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
	}
];

const BASE_API_URL = "/api/v1";

// GET a la ruta base /not-hospitalized-stats
app.get(BASE_API_URL+"/not-hospitalized-stats", (req,res) =>{
	res.send(JSON.stringify(stats,null,2));
});


// POST a la ruta base /not-hospitalized-stats
app.post(BASE_API_URL+"/not-hospitalized-stats",(req,res) =>{
	var newStat = req.body;
	if((newStat == "") || (newStat.province == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		stats.push(newStat); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE CONTACTS

// GET CONTACT/XXX

app.get(BASE_API_URL+"/not-hospitalized-stats/:province", (req,res)=>{
	
	var province = req.params.province;
	
	var filteredStats = stats.filter((c) => {
		return (c.province == province);
	});
	
	
	if(filteredStats.length >= 1){
		res.send(filteredStats[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// PUT CONTACT/XXX

// DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name != name);
	});
	
	
	if(filteredContacts.length < contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");