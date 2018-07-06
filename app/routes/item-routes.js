var db = require("../models");

module.exports = function (app) {
    
    app.post("/item/create", function(req, res) {

        // console.log(req.user);

        db.Item.create({
            categoryId: req.body.categoryId,
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            UserId: req.user.id
        })
        .then(function (result) {
            // console.log(result);
            res.redirect("/categories");
        });
    });
}