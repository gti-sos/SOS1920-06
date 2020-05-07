// ----------------------- API ADRI -----------------------
const dataStore = require("nedb");
const path = require("path");

module.exports = function(app,BASE_PATH){

    const dbFileName = path.join(__dirname + "sales.db");
    
    const db = new dataStore(
        {    filename: dbFileName,
            autoload: true
        }
    );
    
    //var sales = [];

    // GET LOADINITIALDATA
    app.get(BASE_PATH + "/lottery-sales/loadInitialData", (req,res) => {
        
        console.log("\nNew GET .../loadInitialData");
        
        var initial_sales = [
            {"province" : "Madrid",
             "year" : 2014,
             "total" : 730521147,
             "xmas" : 417308840,
             "kid" : 86507800},

            {"province" : "Madrid",
             "year" : 2015,
             "total" : 75257689,
             "xmas" : 36017220,
             "kid" : 9462560},

            {"province" : "Madrid",
             "year" : 2016,
             "total" : 67775712,
             "xmas" : 35883580,
             "kid" : 10604720},

            {"province" : "Madrid",
             "year" : 2017,
             "total" : 487375563,
             "xmas" : 258886720,
             "kid" : 62538100},

            {"province" : "Barcelona",
             "year" : 2016,
             "total" : 32939883,
             "xmas" : 17450480,
             "kid" : 4320280},

            {"province" : "Barcelona",
             "year" : 2017,
             "total" : 48928673,
             "xmas" : 27397980,
             "kid" : 6577720},

            {"province" : "Barcelona",
             "year" : 2014,
             "total" : 110488505,
             "xmas" : 64734400,
             "kid" : 14060360},

            {"province" : "Valencia",
             "year" : 2016,
             "total" : 38849889,
             "xmas" : 21415900,
             "kid" : 6027160},

            {"province" : "Barcelona",
             "year" : 2015,
             "total" : 330575503,
             "xmas" : 158246960,
             "kid" : 48486140},

            {"province" : "Valencia",
             "year" : 2017,
             "total" : 802036655,
             "xmas" : 468028440,
             "kid" : 99264960}
        ];

        db.count({}, (err,sales)=>{
            if(sales>=1){
                res.status(400).send("There is already data created");
                console.log("There is already data created");
            }else{
                db.insert(initial_sales);
                res.status(200).send(JSON.stringify(initial_sales,null,2));
                console.log("Initial data loaded:\n" + JSON.stringify(initial_sales,null,2));
            }
        });
    });


    // GET COLECCION
    /*app.get(BASE_PATH + "/lottery-sales", (req,res) =>{
        
        console.log("New GET .../lottery-sales");
        db.find({}, (err,sales)=>{
            if(sales.length==0){
                res.status(400).send("Database is empty");
                console.log("Database is empty");
            }else{
                sales.forEach((s)=>{
                    delete s._id;
                });
                res.status(200).send(JSON.stringify(sales,null,2));
                console.log("Data sent:"+JSON.stringify(sales,null,2));

            }
        });
        
    });*/
    

    // GET RECURSO
    app.get(BASE_PATH+"/lottery-sales/:province/:year", (req,res)=>{

        var province = req.params.province;
        var year = parseInt(req.params.year);
        
        console.log("New GET .../lottery-sales/"+province+"/"+year);
        db.find({province:province,year:year}, (err,sales)=>{
            if(sales.length==0){
                res.status(404).send("No data for " + province + " " + year);
                console.log("No data for " + province + " " + year);
            }else{
                sales.forEach((s)=>{
                    delete s._id;
                });
                //Convertimos a objeto, porque tiene que devolver un objeto y find nos devuelve un array de un elemento
                objectReturn = new Object(sales[0]);
                
                res.status(200).send(JSON.stringify(objectReturn,null,2));
                console.log("Data sent:\n"+JSON.stringify(objectReturn,null,2));
            }
        });

        
    });

/*
    //GET RECURSO PROVINCE o YEAR
    app.get(BASE_PATH + "/lottery-sales/:param", (req,res)=>{
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

*/
    // POST COLECCION
    app.post(BASE_PATH + "/lottery-sales",(req,res) =>{

        // creamos objeto que se pasa por el body
        var newSale = req.body;

        // array de las keys del objeto que se quiere crear
        var keysSale = Object.keys(newSale);

        // array de las keys que debe tener el objeto.
        var keysObject = ["province","year","total","xmas","kid"];

        // true: Las claves son correctas | false:Las claves son incorrectas
        var keysTrue = false;

        // comprobamos que las keys son correctas
        if(JSON.stringify(keysSale)==JSON.stringify(keysObject)){
            keysTrue = true;
        }

        console.log("New POST .../lottery-sales");
        
        db.find({province:newSale.province,year:newSale.year},(err,sales)=>{
            
            if(keysSale.length==0){ // Si el body estÃ¡ vacio
                res.status(400).send("Must enter the object to create");
                console.log("Must enter the object to create");
            }else if(keysTrue==false){ // Si los campos no son correctos
                res.status(400).send("Does not have the expected fields");
                console.log("Does not have the expected fields");
            }else if(newSale.province==null || newSale.year==null || newSale.total==null ||
                newSale.xmas==null || newSale.kid==null){ // Algun valor null
                res.status(400).send("Values cannot be null");
                console.log("Values cannot be null");
            }else if(sales.length>=1){ // Ya existe un dato para esa provincia y ese aÃ±o
                res.status(400).send("This sale already exist");
                console.log("This sale already exist");
            }
            else { // Crea el dato
                db.insert(newSale);     
                res.status(201).send("Sale created:\n" + JSON.stringify(newSale,null,2));
                console.log("Sale created:\n" + JSON.stringify(newSale,null,2));
            }
        });

        
    });


    // POST RECURSO
    app.post(BASE_PATH + "/lottery-sales/:p/:y", (req,res)=>{
        // un post a un recurso no esta permitido
        res.status(405).send("Method not allowed");
        console.log("Method not allowed");
    });

    // PUT RECURSO
    app.put(BASE_PATH +"/lottery-sales/:province/:year",(req,res)=>{
        
        // province y year almacenan la provincia y el aÃ±o indicados en la URL
        var province=req.params.province;
        var year=parseInt(req.params.year);

        // data almacena el recurso pasado en el body
        var data=req.body;
        
        console.log("New PUT .../lottery-sales/"+province+"/"+year);

        if(province!=data.province||year!=data.year){
            
            // si no coinciden aÃ±o o provincia de la URL y del recurso del body
            res.status(400).send("URL and body data do not match");
            console.log("URL and body data do not match")
        }else{
            //si coinciden aÃ±o y provincia de la URL y del recurso del body
            
            // creamos objeto que se pasa por el body
            var newSale = req.body;

            // array de las keys del objeto nuevo
            var keysSale = Object.keys(newSale);

            // array de las keys que debe tener el objeto.
            var keysObject = ["province","year","total","xmas","kid"];

            // true: Las claves son correctas | false:Las claves son incorrectas
            var keysTrue = false;

            // comprobamos que las keys son correctas
            if(JSON.stringify(keysSale)==JSON.stringify(keysObject)){
                keysTrue = true;
            }
            db.find({province:province,year:year},(err,sales)=>{
                if(sales.length==1){
                    // si existe el que queremos actualizar
                    if(keysTrue==false){
                        // Si los campos no son correctos, 400
                        res.status(400).send("Does not have the expected fields");
                        console.log("Does not have the expected fields");
                    }else if(newSale.total==null || newSale.xmas==null || newSale.kid==null){
                        // algun parametro tiene valor null
                        res.status(400).send("Values cannot be null");
                        console.log("Values cannot be null");
                    }else {
                        // todo OK, actualizamos dato
                        db.update({province:province},data);
                        res.status(200).send("Sale updated:\n" + JSON.stringify(data,null,2));
                        console.log("Sale updated:\n" + JSON.stringify(data,null,2));
                    }
                }else{
                    // si no existe el que queremos actualizar
                    res.status(404).send("Sale not found");
                    console.log("Sale not found");
                }
            });    
        }
    });
    

    // PUT COLECCION
    app.put(BASE_PATH+"/lottery-sales", (req,res)=>{
        // un put a la coleccion no esta permitido
        res.status(405).send("Method not allowed");
        console.log("Method not allowed");
    });


    // DELETE COLECCION
    app.delete(BASE_PATH + "/lottery-sales", (req,res)=>{
        
        console.log("New DELETE .../lottery-sales");
        
        db.count({},(err,sales)=>{
            if(sales>=1){
                // si hay al menos un recurso en la base de datos, se elimina todo
                db.remove({},{multi:true});
                res.status(200).send("All data deleted")
                console.log("All data deleted");
            }else{
                // si no hay nada en la base de datos, 200. Ya estaba vacia
                res.status(200).send("The database was already empty")
                console.log("The database was already empty")
            }
        });
    });


    // DELETE RECURSO
    app.delete(BASE_PATH+"/lottery-sales/:province/:year", (req,res)=>{
        
        // almacenamos en province y year la provincia y el aÃ±o que indicamos en la URL
        var province = req.params.province;
        var year = parseInt(req.params.year);
        
        console.log("New DELETE .../lottery-sales/" + province + "/" + year);
        
        
        db.find({province:province,year:year}, (err,sale)=>{
            if(sale.length==1){
                // si encuentra el recurso que se quiere borrar, se borra
                db.remove({province:province,year:year});
                res.status(200).send("Sale for " + province + " " + year + " deleted");
                console.log("Sale for " + province + " " + year + " deleted");
            }else{
                // si no lo encuentra devuelve 404 not found
                res.status(404).send("Sale for "+ province + " and " + year + " not found");
                console.log("Sale for "+ province + " and " + year + " not found");
            }
        });

    });

    // BUSQUEDAS

    app.get(BASE_PATH+"/lottery-sales", (req,res) =>{
        console.log("New GET .../lottery-sales");
        
        // Limit : Cuantos elementos queremos devolver
        var limit = parseInt(req.query.limit);
        // Offset : A partir de que elemento se buscara
        var offset = parseInt(req.query.offset);
        // Busqueda : Iremos aÃ±adiendo parametros para buscar todos los que se encuentren en la URL
        var busqueda = {};
        
        // recursos con valor del parametro province = province
        if(req.query.province){
            busqueda["province"] = req.query.province;
        }
        // recursos con valor del parametro year = year
        if(req.query.year){
            busqueda["year"] = parseInt(req.query.year);
        }
        
        // recursos con valores del parametro total entre fromtotal y tototal
        if(req.query.fromtotal && req.query.tototal){
            busqueda["total"] = { $gte: parseInt(req.query.fromtotal), $lte: parseInt(req.query.tototal)};
        }
        // recursos con valores del parametro total mayor o igual a fromtotal
        if(req.query.fromtotal && !req.query.tototal){
            busqueda["total"] = { $gte: parseInt(req.query.fromtotal)};
        }
        // recursos con valores del parametro total menor o igual a tototal
        if(!req.query.fromtotal && req.query.tototal){
            busqueda["total"] = { $lte: parseInt(req.query.tototal)};
        }
        
        // recursos con valores del parametro xmas entre fromxmas y toxmas
        if(req.query.fromxmas && req.query.toxmas){
            busqueda["xmas"] = { $gte: parseInt(req.query.fromxmas), $lte: parseInt(req.query.toxmas)};
        }
        // recursos con valores del parametro xmas mayor o igual a fromxmas
        if(req.query.fromxmas && !req.query.toxmas){
            busqueda["xmas"] = { $gte: parseInt(req.query.fromxmas)};
        }
        // recursos con valores del parametro xmas menor o igual a toxmas
        if(!req.query.fromxmas && req.query.toxmas){
            busqueda["xmas"] = { $lte: parseInt(req.query.toxmas)};
        }
        
        // recursos con valores del parametro kid entre fromkid y tokid
        if(req.query.fromkid && req.query.tokid){
            busqueda["kid"] = { $gte: parseInt(req.query.fromkid), $lte: parseInt(req.query.tokid)};
        }
        // recursos con valores del parametro kid mayor o igual a fromkid
        if(req.query.fromkid && !req.query.tokid){
            busqueda["kid"] = { $gte: parseInt(req.query.fromkid)};
        }
        // recursos con valores del parametro kid menor o igual a tokid
        if(!req.query.fromkid && req.query.tokid){
            busqueda["kid"] = { $lte: parseInt(req.query.tokid)};
        }
        
        // Buscamos en bd los recursos que coincidan con los parametros pasados en busqueda.
        // Si offset y limit existen, se devolverÃ¡n 'limit' recursos a partir del 'offset' recurso
        db.find(busqueda).skip(offset).limit(limit).exec(function (err,sales) {
            //console.log(busqueda);
            // eliminamos el id de cada recurso
            sales.forEach((c) => {
                delete c._id;
            });
            // si no ha encontrado ninguno -> NOT FOUND
            if(sales.length == 0){
                res.status(404).send("Not found");
                console.log("Not found");
            }else{
                // devuelve los que cumplan las condiciones pasadas
                res.send(JSON.stringify(sales,null,2));
                console.log("Data sent:\n" + JSON.stringify(sales,null,2));
            }
        });
    });
    
    
}