//..Modularizando
var api = require("./v1");
var api2 = require("./v2");
module.exports = function (app, BASE_PATH) {
	api(app,BASE_PATH+"/v1");
	api2(app,BASE_PATH+"/v2");
}

//..Modularizando

//module.exports = function (app, BASE_PATH) {
	//api(app,BASE_PATH+"/v2");
//}