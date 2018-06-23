var db = require("../models");
var emailutils = require('../util/email.js');
var exports = {}

exports.updateProvider = function(req, res) {
    db.service.find({
        where: {
            providerid: req.body.providerid
        }
    }).then(function(data) {
        db.service.updateAttributes({
            company: data.company,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            description: data.description,
            Address1: data.Address1,
            Address2: data.Address2,
            zipCode: data.zipCode,
            insured: data.insured,
            licensed: data.licensed
        }).then(function(data) {
            res.json({
                "statuscode": 0,
                "message": "Record Updated Successfully",
                "data": data
            });
        })
    });
}
exports.getAServiceProvider = function(req, res) {
    db.serviceType.findOne({
        where: {
            serviceName: req.params.servicename
        }
    }).then(function(data) {
        db.service.findAll({
            where: {
                serviceid: data.serviceid
            }
        }).then(function(data) {
            res.json({
                "statuscode": 0,
                "len": data.length,
                "data": data
            });
        }).catch(function(err) {
            res.json({
                "message": "No Data Found",
                "statuscode": -1,
                "len": 0
            });
        });
    }).catch(function(err) {
        res.json({
            "message": "No Data Found",
            "statuscode": -1,
            "len": 0
        });
    });
}

exports.getAllServices = function(req, res) {
    db.serviceType.findAll({}).then(function(data) {
        res.json({
            "statuscode": 0,
            "len": data.length,
            "data": data
        });
    }).catch(function(err) {
        res.json({
            "message": "No Data Found",
            "statuscode": -1,
            "len": 0
        });
    });
}

exports.getAllProviders = function(req, res) {
    db.service.findAll({}).then(function(data) {
        res.json({
            "statuscode": 0,
            "len": data.length,
            "data": data
        });
    }).catch(function(err) {
        res.json({
            "message": "No Data Found",
            "statuscode": -1,
            "len": 0
        });
    });
}

exports.createProvider = function(req, res) {
    db.service.create(req.body).then(function(data) {        
        res.json({
            "message": "Service Provider Added",
            "statuscode": 0,
            "data": data
        });
        emailutils.email(req.body.firstname, req.body.lastname, req.body.email);
    }).catch(function(err) {
        console.log(err);
        res.json({
            "message": "Service Provider Not Added",
            "statuscode": -1
        });      
    });
};

exports.createService = function(req, res) {
    db.serviceType.create(req.body).then(function(data) {
        res.json({
            "message": "Service Added",
            "statuscode": 0,
            "data": data
        });
    }).catch(function(err) {
        res.json({
            "message": "Service Not Added",
            "statuscode": -1
        });
    });
};
module.exports = exports;