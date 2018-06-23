var serviceController = require('../controllers/service-controller.js');

module.exports = function(app) {
    // Get all the services available in the database
    app.get('/api/provider/services', serviceController.getAllServices);
    // Get all the service providers in the database
    app.get('/api/provider/all', serviceController.getAllProviders);
    // Get all the service providers for a given service name
    app.get('/api/provider/:servicename', serviceController.getAServiceProvider);
    // Create a service provider in the database
    app.post('/api/provider/create', serviceController.createProvider);
    // Update a service provider details in the database
    app.post('/api/provider/update', serviceController.updateProvider);
    // Create a service in the database
    app.post('/api/service/create', serviceController.createService);
}