const express = require('express');
const router = express.Router();
const itemController = require('./itemController');

router.post('/upload', itemController.uploadItem);
router.get('/list/:searchTerm', itemController.searchItems);

module.exports = router;
