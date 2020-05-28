var api1 = require("./v1");
var api2 = require("./v2");

module.exports = function(app){
	api1(app);
	api2(app);
}
