const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

 router.get('/', controller.get);
//  router.get('/:slug', controller.getBySlug);
 router.get('/admin/:id', controller.getById);
 router.get('/category/:categoria', controller.getByCategoria);
 router.get('/tags/:tag', controller.getByTag);
 router.post('/', controller.post);
//  router.post('/', authService.authorize, controller.post);
 router.put('/:id', controller.put);
 router.delete('/:id', controller.delete);
// router.post('/', authService.isAdmin, controller.post);
// router.put('/:id', authService.isAdmin, controller.put);
// router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;