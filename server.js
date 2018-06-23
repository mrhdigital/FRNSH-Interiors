var express = require("express"),
    exphbs = require("express-handlebars"),
    bodyParser = require("body-parser"),
    app = express(),
    methodOverride = require("method-override"),
    handlebars = require('handlebars'),
    passport = require('passport'),
    session = require('express-session'),
    PORT = process.env.PORT || 8080;

var db = require("./app/models");

// app.set('views', './app/views');
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(methodOverride('_method'));

app.use(express.static("./app/public"));

 // For Passport
 app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); 
 app.use(passport.initialize());
 app.use(passport.session());

 var models = require("./app/models");

// require routes here
require("./app/routes/auth-routes.js")(app, passport);
require("./app/config/passport/passport.js")(passport, models.user);
require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);
require("./app/routes/package-routes.js")(app);
require("./app/routes/service-routes.js")(app);


// app.use("/vendors", apiRoutes);

handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

handlebars.registerHelper('if_ls', function(a, b, opts) {
   if(a < b)
       return opts.fn(this);
   else
       return opts.inverse(this);
});

handlebars.registerHelper("capitalizeString", function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
})

//Sync models with the database and start the Express app
db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
 