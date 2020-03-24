const cool = require("cool-ascii-faces");
const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 80; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";

// ----------------------- API ADRI -----------------------

var sales = [];

// GET LOADINITIALDATA
app.get(BASE_API_URL + "/lottery-sales/loadInitialData", (req,res) => {
    
    
    var initial_sales = [
        {"province" : "Madrid",
         "year" : "2014",
         "total" : "730521147",
         "xmas" : "417308840",
         "kid" : "86507800"},
        
        {"province" : "Madrid",
         "year" : "2015",
         "total" : "75257689",
         "xmas" : "36017220",
         "kid" : "9462560"},
		
		{"province" : "Madrid",
         "year" : "2016",
         "total" : "67775712",
         "xmas" : "35883580",
         "kid" : "10604720"},
		
		{"province" : "Madrid",
         "year" : "2017",
         "total" : "487375563",
         "xmas" : "258886720",
         "kid" : "62538100"},
		
		{"province" : "Barcelona",
         "year" : "2016",
         "total" : "32939883",
         "xmas" : "17450480",
         "kid" : "4320280"},
		
		{"province" : "Barcelona",
         "year" : "2017",
         "total" : "48928673",
         "xmas" : "27397980",
         "kid" : "6577720"},
		
		{"province" : "Barcelona",
         "year" : "2014",
         "total" : "110488505",
         "xmas" : "64734400",
         "kid" : "14060360"},
		
		{"province" : "Valencia",
         "year" : "2016",
         "total" : "38849889",
         "xmas" : "21415900",
         "kid" : "6027160"},
		
		{"province" : "Barcelona",
         "year" : "2015",
         "total" : "330575503",
         "xmas" : "158246960",
         "kid" : "48486140"},
		
		{"province" : "Valencia",
         "year" : "2017",
         "total" : "802036655",
         "xmas" : "468028440",
         "kid" : "99264960"}
    ];
    
    if(sales.length >=1){
        res.status(400).send("There is already data created");
    }else{
        sales = initial_sales;
        res.send(JSON.stringify(sales, null, 2));
    }
});


// GET COLECCION
app.get(BASE_API_URL + "/lottery-sales", (req,res) =>{
	if(sales.length == 0){
		res.status(400).send("There is no data stored")
	}else{
		res.send(JSON.stringify(sales,null,2));
	}
//    console.log("Data sent:"+JSON.stringify(contacts,null,2));
});


// GET RECURSO PROVINCE/YEAR
app.get(BASE_API_URL+"/lottery-sales/:province/:year", (req,res)=>{
    
    var province = req.params.province;
    var year = req.params.year;
    
    var filteredSales = sales.filter((c) => {
        return (c.province == province && c.year == year);
    });
    
    
    if(filteredSales.length >= 1){
        res.send(filteredSales[0]);
    }else{
        res.status(404).send("Sale not found");
    }
});


//GET RECURSO PROVINCE o YEAR
app.get(BASE_API_URL + "/lottery-sales/:param", (req,res)=>{
	var param = req.params.param;
	
	var filteredSales = sales.filter((c)=>{
		return (c.province==param || c.year == param);
	});
	
	if(filteredSales.length >= 1){
		res.send(JSON.stringify(filteredSales,null,2));
	}else{
		res.status(404).send("No data in this year o province")
	}
	
	
});


// POST COLECCION
app.post(BASE_API_URL + "/lottery-sales",(req,res) =>{
    
	//Objeto a crear
    var newSale = req.body;
	
	//Array de las keys del objeto que se quiere crear. Ex: {"province","year","total","xmas","kid"}
	var keysSale = Object.keys(newSale);
	
	//Array de las keys que debe tener el objeto.
	var keysObject = ["province","year","total","xmas","kid"];
	
	//True: Las claves son correctas || False:Las claves son incorrectas
	var keysTrue = false;
	
	//Comprobamos que las keys son correctas
	if(JSON.stringify(keysSale)==JSON.stringify(keysObject)){
		keysTrue = true;
	}
	
	//filteredSales almacenara si hay algun dato ya con la provincia y el año que queremos añadir
    var filteredSales = sales.filter((c)=>{
        return (c.province == newSale.province && c.year == newSale.year);
    });
	
    if(keysSale.length==0){ // Si el body está vacio
        res.status(400).send("Must enter the object to create"); 
    }else if(keysTrue==false){ // Si los campos no son correctos
		res.status(400).send("Does not have the expected fields");
	}else if(newSale.province==null || newSale.year==null || newSale.total==null ||
			newSale.xmas==null || newSale.kid==null){ // Algun valor null
		res.status(400).send("Values cannot be null");
	}else if(filteredSales.length>=1){ // Ya existe un dato para esa provincia y ese año
        res.status(400).send("This sale already exist");
    }
    else { // Crea el dato
        sales.push(newSale);     
        res.status(201).send("Sale created");
    }
});


// POST RECURSO

app.post(BASE_API_URL + "/lottery-sales/:p", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t/:x", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t/:x/:k", (req,res)=>{
    res.status(405).send("Method not allowed");
});


// PUT RECURSO
app.put(BASE_API_URL +"/lottery-sales/:province/:year",(req,res)=>{
    var province=req.params.province;
    var year=req.params.year;
    
    var data=req.body;
    
    if(province!=data.province||year!=data.year){
        res.status(400).send("Data does not mach");
    }else{
        var filteredSales = sales.filter((c) => {
        return (c.province != province || c.year != year);
        });      
        sales = filteredSales;
        sales.push(data);
        res.status(200).send("Sale updated");
    }
});

app.put(BASE_API_URL + "/lottery-sales/:province", (req,res)=>{
	res.status(400).send("URL invalid")
});


// PUT COLECCION
app.put(BASE_API_URL+"/lottery-sales", (req,res)=>{
    res.status(405).send("Method not allowed");
});


// DELETE COLECCION
app.delete(BASE_API_URL + "/lottery-sales", (req,res)=>{
    sales = [];
    res.send(JSON.stringify(sales,null,2));
    
});


// DELETE RECURSO
app.delete(BASE_API_URL+"/lottery-sales/:province/:year", (req,res)=>{
    
    var province = req.params.province;
    var year = req.params.year;
    
    var filteredSales = sales.filter((c) => {
        return (c.province != province || c.year != year);
    });
    
    if(filteredSales.length < sales.length){
        sales = filteredSales;
        res.status(200).send("Sale deleted");
    }else{
        res.status(404).send("Sale not found");
    }
    
    
});


// ----------------------- API ALVARO -----------------------

var apiRest = {};

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

// ----------------------- API LEANDRO -----------------------

 
// ----------------------- FIN CODIGO ------------------------
app.listen(port, () => { //No es recomendable poner el puerto 80, en heroku habrá que especificarle el puerto.
	console.log("Server ready");
});

console.log("Starting server . . . ");
