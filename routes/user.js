const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.get('/template', (req, res, next) => {
    res.render('tempSelection');
})

router.get('/details', (req, res, next) => {
    res.render('details');
})

router.get('/', (req, res, next) => {
    res.render('landing');
})

module.exports = router;
