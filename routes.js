const SampleController = require('./src/controllers/SampleController');
const UserController = require('./src/controllers/UserController');
const express = require('express');
const routes = new express.Router();

routes.post('/sample',SampleController.insertSample);
routes.get('/sample',SampleController.getAll)
routes.get('/samplelast',SampleController.getLast)
routes.get('/sample/various',SampleController.getLasts)

routes.post('/user/login',UserController.LOGIN);
routes.post('/user/create',UserController.createUser);
routes.put('/user/add/device',UserController.ADDDEVICE);

module.exports = routes;