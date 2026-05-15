const express = require('express');
const router = express.Router();
const { sendContact } = require('../controller/contact.controller');

router.post('/', sendContact);

module.exports = router;
