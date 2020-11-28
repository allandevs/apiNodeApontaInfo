const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
// const authService = require('../services/auth-service');


router.post('/', controller.post);
router.get('/', controller.get);
router.get('/usuarioInativo', controller.getUsuarioInativo);
router.get('/usuarioAtivo', controller.getUsuarioAtivo);
router.get('/:id', controller.getById);
router.post('/authenticate', controller.authenticate);
router.put('/status/:id', controller.putStatus);
router.put('/plano/:id', controller.putPlano);
router.delete('/:id', controller.delete);
// router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;
