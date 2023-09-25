const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const ads = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.get('/ads/search/:searchPhrase', ads.getSearched);
router.post('/ads', authMiddleware, imageUpload.single('image'), ads.add);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), ads.edit);
router.delete('/ads/:id', authMiddleware, ads.delete);

module.exports = router;