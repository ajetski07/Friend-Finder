//Requiring Express for setting up the server//
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Setting up our port with process.env.PORT for deploying to Heroku//
var PORT = process.env.PORT || 3000;

//Creating the application/JSON parser//
var jsonParse = bodyParser.json();

//Create application/x-www-form-urlencoded parser//
var urlencodedParse = bodyParser.urlencoded({ extended: false});

//Parse out the different custom JSON types as JSON//
app.use(bodyParser.json({ type: "application/8+json" }));

//Parse a custom buffer//
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

app.use(bodyParser.text({ type: "text/html" }));

require("./friend_app/routing/html-routes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});