const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/template', isAuth, (req, res, next) => {
    res.render('tempSelection');
})

router.get('/add-template', isAuth, adminController.getDetails);

router.post('/add-template', isAuth, adminController.postDetails);

router.get('/landing-page', isAuth, (req, res, next) => {
    res.render('templateOne');
})

router.get('/:backlink', isAuth, adminController.getTemplate);

module.exports = router;