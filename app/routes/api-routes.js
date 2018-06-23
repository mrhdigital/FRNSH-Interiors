var db = require("../models");

module.exports = function (app) {

    app.get("/vendors", function (req, res) {
        db.Providers.findAll({order: db.sequelize.col('price')})
            .then(function (results) {
                console.log(results);
                // res.json(results);
                var hbsObject = {
                    vendor: results
                };
                res.render("providershbs", hbsObject);
            });
    });

    app.get("/vendors/:budget", function (req, res) {
        db.Providers.findAll({
            where: {
                budget: req.params.budget
            }
        })
            .then(function (results) {
                // console.log(results);
                // res.json(results);
                var hbsObject = {
                    vendor: results
                };
                res.render("providershbs", hbsObject);
            });
    });

    app.get("/api/vendors/:type/:budget?", function (req, res) {
        if (req.params.type && req.params.budget === "undefined") {
            db.Providers.findAll({
                where: {
                    type: req.params.type
                }
            }).then(function (results) {
                var hbsObject = {
                    vendor: results
                };
                res.render("providershbs", hbsObject);
                // res.json(results);
            });

        } else {
            db.Providers.findAll({
                where: {
                    type: req.params.type,
                    budget: req.params.budget
                }
            }).then(function (results) {
                // res.json(results)
                var hbsObject = {
                    vendor: results
                };
                res.render("providershbs", hbsObject);
            });

        }
    });

    app.get("/profile", function (req, res) {
        // console.log('something');
        db.user.findAll({})
            .then(function (results) {
                var hbsObject = {
                    user: results
                };
                res.render("profile", hbsObject);
            });
    });
};

