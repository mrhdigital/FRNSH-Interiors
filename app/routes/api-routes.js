var db = require("../models");
//package necessary for the ebay api call
var ebay = require("ebay-api");

module.exports = function (app) {

    
    
    // Run the request
    app.get("/vendors", function(req, res) {

        var params = {
            keywords: ["entry doors"],
            // add additional fields
            outputSelector: ['PictureURLSuperSize'],
            paginationInput: {
              entriesPerPage: 20
            },
          };

        ebay.xmlRequest({
            serviceName: 'Finding',
            opType: 'findItemsByKeywords',
            appId: 'NikolasH-bootcamp-PRD-5c970d9ce-2c7dc5a8', // api key
            params: params,
            parser: ebay.parseResponseJson // (default)
          },
          // gets all the items together in a merged array
          function itemsCallback(error, itemsResponse) {
            if (error) throw error;
            //create variable for the response array
            var items = itemsResponse.searchResult.item;
            //create the empty array of objects to hold the api data
            console.log(items);
            // var item = {}
            var products = [];
            //loop through the api call results
            for (let i = 0; i < items.length; i++) {
                let item = {};

                item.id = items[i].itemId;
                item.name = items[i].title;
                item.image = items[i].pictureURLSuperSize;
                item.price = items[i].sellingStatus.currentPrice.amount.toFixed(2);
                //push results into objects array
                products.push(item);
                //clear the object for each loop
                // item = {};
            }  
            console.log(products);
            res.render("providershbs", {products: products});
          }
        );
    });

    // app.get("/vendors", function (req, res) {
    //     db.Providers.findAll({order: db.sequelize.col('price')})
    //         .then(function (results) {
    //             console.log(results);
    //             // res.json(results);
    //             var hbsObject = {
    //                 vendor: results
    //             };
    //             res.render("providershbs", hbsObject);
    //         });
    // });

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

    app.get("/categories", function (req, res) {
        // console.log('something');
        db.user.findAll({})
            .then(function (results) {
                var hbsObject = {
                    user: results
                };
                res.render("categories", hbsObject);
            });
    });
};

