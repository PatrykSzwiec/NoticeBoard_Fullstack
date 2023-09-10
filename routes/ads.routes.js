const express = require('express');
const router = express.Router();

const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.post('/ads', AdsController.postAll);
router.put('/ads/:id', AdsController.putById);
router.delete('/ads/:id', AdsController.deleteById);

module.exports = router;