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

router.post('/template', isAuth, adminController.postTempSelection);

router.get('/edit-template/:templateId', isAuth, adminController.getEditDetails);

router.post('/edit-template', isAuth, adminController.postEditDetails)

router.get('/landing-page', (req, res, next) => {
    res.render('templateTwo');
})

router.get('/:backlink', adminController.getTemplate);

module.exports = router;