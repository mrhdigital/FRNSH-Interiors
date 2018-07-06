var express = require("express"),
    exphbs = require("express-handlebars"),
    bodyParser = require("body-parser"),
    app = express(),
    methodOverride = require("method-override"),
    handlebars = require('handlebars'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash-notification'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    PORT = process.env.PORT || 8080;

var db = require("./app/models");

app.set('views', './views');
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(methodOverride('_method'));

app.use(express.static("./app/public"));
app.use("/public", express.static("./app/public"));

 // For Passport
 app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); 
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(cookieParser());
 app.use(flash());

 var models = require("./app/models");

// require routes here
require("./app/routes/auth-routes.js")(app, passport);
require("./app/config/passport/passport.js")(passport, models.user);
require("./app/routes/api-routes.js")(app);
require("./app/routes/item-routes.js")(app);
// TO DO  -- make this route functional
// require("./app/routes/note-routes.js")(app);

//Sync models with the database and start the Express app
db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
 