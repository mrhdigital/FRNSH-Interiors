var db = require("../models");

module.exports = function (app) {
    
    app.post("/note/create", function(req, res) {

        // console.log(req.user);

        db.Note.create({
            body: req.body.body,
            UserId: req.user.firstname
        })
        .then(function (result) {
            // console.log(result);
            res.redirect("/package");
        });
    });

    app.put("/note/edit", function(req, res) {
        db.Note.update(req.body, 
            {
                where: {
                    UserId: req.user.id
                }
            }).then(function(results) {
                res.redirect("/package");
            });
    });
}