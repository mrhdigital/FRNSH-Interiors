var db = require("../models");
//package necessary for the ebay api call
var ebay = require("ebay-api");

module.exports = function (app) {

    // Run the request
    app.get("/vendors/:category", function(req, res) {

        var category = req.params.category;

        var params = {
            keywords: [category],
            // add additional fields
            outputSelector: ['PictureURLSuperSize'],
            paginationInput: {
              entriesPerPage: 50
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

                item.categoryId = items[i].itemId;
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

    app.get("/package", function(req, res) {
        db.Item.findAll({
            where: {
                UserId: req.user.id
            }, 
            include: [db.User]
        }).then(function(results) {
            var price = 0;
            var username;
            var userNote;
            for(var i = 0; i < results.length; i++) {
                if(results[i].price) {
                    price += parseInt(results[i].price);
                }
                if(results[i].User.firstname) {
                    username = results[0].User.firstname;
                }
            }
            //console.log(username);
            price = price.toFixed(2);

            var hbsObject = {
                items: results,
                price: price,
                username: username
            };
            res.render("package", hbsObject);
        });
    });

    app.delete("/package/delete/:id", function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.redirect("/package");
        });
    });

    app.get("/categories", function (req, res) {
      
        res.render("categories");
       
    });
};

