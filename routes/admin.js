const path = require('path');
const express = require('express');

const isAuth = require('../middleware/is-auth');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/template', isAuth, (req, res, next) => {
    res.render('tempSelection');
})

router.get('/details', isAuth, (req, res, next) => {
    res.render('details');
})

router.get('/landing-page', isAuth, (req, res, next) => {
    res.render('templateOne');
})

module.exports = router;