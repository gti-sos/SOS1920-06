//..Modularizando
var api = require("./v1");
module.exports = function (app, BASE_PATH) {
	api(app,BASE_PATH+"/v1");
}

//..Modularizando
var api = require("./v2");
module.exports = function (app, BASE_PATH) {
	api(app,BASE_PATH+"/v2");
}