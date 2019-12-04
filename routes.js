const SampleController = require('./src/controllers/SampleController');
const UserController = require('./src/controllers/UserController');
const express = require('express');
const routes = new express.Router();

routes.post('/sample',SampleController.insertSample);
routes.get('/sample',SampleController.getAll)
routes.get('/samplelast',SampleController.getLast)
routes.get('/sample/various',SampleController.getLasts)
routes.get('/user/mydevices/:id',UserController.myDevices);


routes.get('/user/mydevices/history/:id',UserController.myDevicesHistory)
routes.post('/user/login',UserController.LOGIN);
routes.post('/user/create',UserController.createUser);
routes.put('/user/add/device',UserController.ADDDEVICE);
routes.put('/user/remove/device/:id',UserController.REMOVEDEVICE)

module.exports = routes;